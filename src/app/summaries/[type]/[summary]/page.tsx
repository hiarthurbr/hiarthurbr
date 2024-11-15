import type { Summary, SummaryIndex, SummaryLink } from "@global";
import SummaryElement from "./resume";
import axios from "@lib/axios";
import { OPEN_GRAPH_EMAILS } from "@lib/const";
import type { Metadata } from "next";

export default async function RPC({
  params: _P,
}: {
  params: Promise<{ type: string; summary: string }>;
}) {
  const params = await _P;
  const summary = await axios
    .get(`/summaries/${params.type}/${params.summary}.json`)
    .then((req) => JSON.parse(req.data) as Summary);
  const warn = await axios
    .get("/summaries/summaries.json")
    .then((req) => JSON.parse(req.data)[params.type] as SummaryIndex)
    .then((req) => {
      const [, , , warn] = req;
      return warn;
    });

  return <SummaryElement summary={summary} warn={warn} />;
}

type GetStaticPaths = Array<{ type: string; summary: string }>;

export async function generateStaticParams(): Promise<GetStaticPaths> {
  try {
    const json = require("public/summaries/summaries.json") as SummaryLink;
    const summaryTypes = Object.keys(json);
    const summaries: GetStaticPaths[] = summaryTypes.map((index) => {
      const s: GetStaticPaths = [];
      json[index][1].forEach((i) => {
        if (i.name === "Local test") return;
        s.push({ type: index, summary: i.link });
      });
      return s;
    });

    return summaries.flat();
  } catch (e) {
    try {
      console.error("Error while parsing local files:", e);
      console.log("Trying to parse from latest deployed version.");
      const request = await axios.get("/summaries/summaries.json");
      const json = JSON.parse(request.data) as SummaryLink;
      const summaryTypes = Object.keys(json);
      const summaries: GetStaticPaths[] = summaryTypes.map((index) => {
        const s: GetStaticPaths = [];
        json[index][1].forEach((i) => {
          if (i.name === "Local test") return;
          s.push({ type: index, summary: i.link });
        });
        return s;
      });

      return summaries.flat();
    } catch (e) {
      console.error("Error while parsing summaries, returning empty paths:", e);
      return [];
    }
  }
}

export async function generateMetadata({
  params: _P,
}: {
  params: Promise<{ type: string; summary: string }>;
}): Promise<Metadata> {
  const params = await _P;
  const summary = await axios
    .get(`/summaries/${params.type}/${params.summary}.json`)
    .then((req) => JSON.parse(req.data) as Summary);
  const description = `Resumo de ${summary.title} em ${Object.keys(summary.chapters).length} capítulos.`;
  const title = `${summary.title} | Resumo - Arthur Bufalo`;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      emails: OPEN_GRAPH_EMAILS,
      description,
      title,
      locale: "pt_BR",
      countryName: "Brazil",
      url: `https://arthurbr.me/summaries/${params.type}/${params.summary}`,
      siteName: "Arthur Bufalo",
    },
  };
}
