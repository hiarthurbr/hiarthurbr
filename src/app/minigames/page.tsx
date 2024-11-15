import { OPEN_GRAPH_EMAILS } from "@lib/const";
import { Chip } from "@nextui-org/react";
import type { Metadata } from "next";
import Link from "next/link";

export default function Minigames() {
  return (
    <div className="select-none">
      <h1 className="w-full flex flex-row items-center font-bold place-self-start text-5xl justify-center">
        Minigames
        <Chip
          variant="shadow"
          classNames={{
            base: "ml-3 mt-2 bg-gradient-to-br from-indigo-500 to-pink-500",
            content:
              "drop-shadow shadow-black dark:shadow-white text-white font-extrabold",
          }}
        >
          Pre-Alpha
        </Chip>
      </h1>
      <div className="h-screen mt-8 flex flex-row justify-center">
        <Link
          href="/minigames/termo"
          className="flex flex-row justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-800 bg-zinc-200 shadow-xl h-fit w-fit"
        >
          <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
            T
          </span>
          <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
            E
          </span>
          <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
            R
          </span>
          <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
            M
          </span>
          <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
            O
          </span>
        </Link>
      </div>
    </div>
  );
}

const title = "Arthur Bufalo | Minigames";
const description = "Jogos rápidos e divertidos para passar o tempo.";
export const metadata: Metadata = {
  title,
  description,
  creator: "Arthur Bufalo",
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://arthurbr.me/minigames",
    emails: OPEN_GRAPH_EMAILS,
    locale: "pt_BR",
    siteName: "Arthur Bufalo",
  },
};
