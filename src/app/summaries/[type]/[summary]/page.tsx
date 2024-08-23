import type { Summary, SummaryIndex, SummaryLink } from "@global";
import SummaryElement from "./resume";
import axios from "@lib/axios";

export default async function RPC({
  params,
}: {
  params: { type: string; summary: string };
}) {
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
