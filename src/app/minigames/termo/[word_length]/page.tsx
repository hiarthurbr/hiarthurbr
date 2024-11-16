import { DuckEmoji } from "@components/svgs";
import { OPEN_GRAPH_EMAILS } from "@lib/const";
import type { TermoMap } from "@lib/types";
import { Chip } from "@nextui-org/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const title_map = {
  "4tro": (
    <span className="flex flex-row items-center text-5xl">
      <DuckEmoji className="w-12 h-12" />
      tro
    </span>
  ),
  cinco: <span className="flex flex-row items-center text-5xl">Cinco</span>,
  sextou: <span className="flex flex-row items-center text-5xl">Sextou</span>,
} satisfies Record<keyof TermoMap["word_length"], React.ReactNode>;

export default async function Termo({
  params,
}: {
  params: Promise<{
    word_length: keyof TermoMap["word_length"];
  }>;
}) {
  const { word_length } = await params;
  const title = title_map[word_length];

  if (title == null) return notFound();

  return (
    <div className="select-none flex flex-col justify-center items-center w-full">
      <h1 className="flex flex-row items-center font-bold">
        {title}
        <Chip
          variant="shadow"
          classNames={{
            base: "ml-3 mt-2 bg-gradient-to-br from-indigo-500 to-pink-500",
            content:
              "drop-shadow shadow-black dark:shadow-white text-white font-extrabold",
          }}
        >
          Alpha
        </Chip>
      </h1>
      <div className="flex flex-col items-center pb-8">
        <h2 className="text-2xl font-bold my-6">Selecione o modo de jogo:</h2>
        <p className="px-5 py-3 bg-red-600 bg-opacity-20 border-red-600 border-3 border-opacity-70 rounded-xl font-semibold">
          <span className="font-extrabold">Aviso: </span>Termo atualmente não é
          compatível com dispositivos móveis.
        </p>
      </div>
      <div className="min-h-full flex flex-row items-center justify-center gap-16">
        <Link
          href={`/minigames/termo/${word_length}/uno`}
          className="flex flex-row justify-center items-center gap-4 px-3 py-2.5 rounded-xl dark:bg-zinc-800 bg-zinc-200 shadow-xl h-fit w-fit"
        >
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit *:w-14 *:py-2 *:aspect-1 *:uppercase *:rounded-lg *:text-white *:font-bold *:text-3xl *:text-center">
            <span className="dark:bg-zinc-700 bg-zinc-400">U</span>
            <span className="dark:bg-lime-600 bg-lime-500">N</span>
            <span className="dark:bg-yellow-500 bg-yellow-400">O</span>
            <span className="dark:bg-zinc-800 bg-zinc-200" />
            <span className="dark:bg-zinc-800 bg-zinc-200" />
            <span className="dark:bg-zinc-800 bg-zinc-200" />
          </div>
        </Link>

        <Link
          href={`/minigames/termo/${word_length}/duo`}
          className="flex flex-row justify-center items-center gap-4 px-3 py-2.5 rounded-xl dark:bg-zinc-800 bg-zinc-200 shadow-xl h-fit w-fit"
        >
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit">
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              D
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              U
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              O
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-800 bg-zinc-200 text-white font-bold text-3xl text-center uppercase rounded-lg" />
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-800 bg-zinc-200 text-white font-bold text-3xl text-center uppercase rounded-lg" />
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-800 bg-zinc-200 text-white font-bold text-3xl text-center uppercase rounded-lg" />
          </div>
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit">
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              D
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              U
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              O
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-800 bg-zinc-200 text-white font-bold text-3xl text-center uppercase rounded-lg" />
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-800 bg-zinc-200 text-white font-bold text-3xl text-center uppercase rounded-lg" />
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-800 bg-zinc-200 text-white font-bold text-3xl text-center uppercase rounded-lg" />
          </div>
        </Link>

        <Link
          href={`/minigames/termo/${word_length}/trio`}
          className="flex flex-row justify-center items-center gap-4 px-3 py-2.5 rounded-xl dark:bg-zinc-800 bg-zinc-200 shadow-xl h-fit w-fit"
        >
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit *:w-14 *:py-2 *:aspect-1 *:uppercase *:rounded-lg *:text-white *:font-bold *:text-3xl *:text-center">
            <span className="dark:bg-lime-600 bg-lime-500">T</span>
            <span className="dark:bg-yellow-500 bg-yellow-400">R</span>
            <span className="dark:bg-yellow-500 bg-yellow-400">I</span>
            <span className="dark:bg-zinc-700 bg-zinc-400">O</span>
            <span className="dark:bg-zinc-800 bg-zinc-200" />
            <span className="dark:bg-zinc-800 bg-zinc-200" />
          </div>
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit *:w-14 *:py-2 *:aspect-1 *:uppercase *:rounded-lg *:text-white *:font-bold *:text-3xl *:text-center">
            <span className="dark:bg-lime-600 bg-lime-500">T</span>
            <span className="dark:bg-zinc-700 bg-zinc-400">R</span>
            <span className="dark:bg-yellow-500 bg-yellow-400">I</span>
            <span className="dark:bg-zinc-700 bg-zinc-400">O</span>
            <span className="dark:bg-zinc-800 bg-zinc-200" />
            <span className="dark:bg-zinc-800 bg-zinc-200" />
          </div>
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit *:w-14 *:py-2 *:aspect-1 *:uppercase *:rounded-lg *:text-white *:font-bold *:text-3xl *:text-center">
            <span className="dark:bg-yellow-500 bg-yellow-400">T</span>
            <span className="dark:bg-lime-600 bg-lime-500">R</span>
            <span className="dark:bg-zinc-700 bg-zinc-400">I</span>
            <span className="dark:bg-lime-600 bg-lime-500">O</span>
            <span className="dark:bg-zinc-800 bg-zinc-200" />
            <span className="dark:bg-zinc-800 bg-zinc-200" />
          </div>
        </Link>

        <Link
          href={`/minigames/termo/${word_length}/quatro`}
          className="flex flex-row justify-center items-center gap-4 px-3 py-2.5 rounded-xl dark:bg-zinc-800 bg-zinc-200 shadow-xl h-fit w-fit"
        >
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit">
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              Q
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              U
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              A
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              T
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              R
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              O
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit">
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              Q
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              U
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              A
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              T
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              R
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              O
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit">
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              Q
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              U
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              A
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              T
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              R
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              O
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 px-3 py-2.5 rounded-xl dark:bg-zinc-900 bg-zinc-100 shadow-xl h-fit w-fit">
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              Q
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              U
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              A
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-lime-600 bg-lime-500 text-white font-bold text-3xl text-center uppercase rounded-lg">
              T
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-zinc-700 bg-zinc-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              R
            </span>
            <span className="w-14 py-2 aspect-1 dark:bg-yellow-500 bg-yellow-400 text-white font-bold text-3xl text-center uppercase rounded-lg">
              O
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

const title = "Arthur Bufalo | Minigames - Termo";
const description =
  "Descubra a palavra secreta antes que suas tentativas acabem!";

export const metadata: Metadata = {
  title,
  description,
  creator: "Arthur Bufalo",
  openGraph: {
    type: "website",
    url: "https://arthurbr.me/minigames/termo",
    emails: OPEN_GRAPH_EMAILS,
    countryName: "Brazil",
    locale: "pt-BR",
    title,
    description,
    siteName: "Arthur Bufalo",
  },
};
