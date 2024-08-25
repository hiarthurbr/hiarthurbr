import axios from "@lib/axios";
import Link from "next/link";
import type { SummaryLink } from "@global";
import { OPEN_GRAPH_EMAILS } from "@lib/const";

export default async function RPC() {
  const resumes = await axios
    .get("/summaries/summaries.json")
    .then((response) => JSON.parse(response.data) as SummaryLink);

  return (
    <>
      <article className="prose dark:prose-invert select-none mx-auto py-8">
        <h1 className="text-7xl">Resumos</h1>
        {Object.keys(resumes).map((key) => (
          <div key={key}>
            <h2>{resumes[key][0]}</h2>
            <ul>
              {resumes[key][1].map((resume) => (
                <li key={resume.link} className="m-5">
                  <Link
                    className="font-bold text-xl ease-in-out duration-200"
                    href={`/summaries/${key}/${resume.link}`}
                  >
                    {resume.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </article>
    </>
  );
}

const title = "Arthur Bufalo | Resumos";
const description =
  "Livros compilados em resumos para facilitar a compreensão e o aprendizado.";

export const metadata = {
  title,
  description,
  creator: "Arthur Bufalo",
  openGraph: {
    type: "website",
    url: "https://arthurbr.me/summaries",
    emails: OPEN_GRAPH_EMAILS,
    countryName: "Brazil",
    locale: "pt-BR",
    title,
    description,
    siteName: "Arthur Bufalo",
  },
};
