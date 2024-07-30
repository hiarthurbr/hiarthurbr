import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { WORD_KEY } from "@lib/const";
import { gen_words } from "@lib/gen_words";

export const runtime = "edge";

export async function GET(request: Request) {
  const now = new Date();
  const midnight = new Date(now).setUTCHours(23, 59, 30, 0);

  let words = await kv.get<
    ReturnType<typeof gen_words> & {
      by: "edge" | "cron";
      at?: number;
      date?: string;
    }
  >(WORD_KEY);

  const headers = {
    "Cache-Control": `public, max-age=${Math.floor((midnight - now.getTime()) / 1000)}, must-revalidate, immutable`,
    Expires: new Date(midnight).toUTCString(),
    Date: now.toUTCString(),
  };

  if (
    words == null ||
    words.at == null ||
    typeof words.at !== "number" ||
    now.getTime() - words.at >= 1000 * 60 * 60 * 24 - 1000 * 60
    //                          ^^^^^^^^^^^^^^^^^^^   ^^^^^^^^^
    //                          |> 24 hours           |> 1 minute
  ) {
    words = {
      ...gen_words(),
      by: "edge",
      at: now.getTime(),
      date: now.toISOString(),
    };
    await kv.set(WORD_KEY, words);

    return NextResponse.json(words, {
      status: 201,
      headers,
    });
  }

  headers["Cache-Control"] =
    `public, max-age=${Math.floor((midnight - words.at) / 1000)}, must-revalidate, immutable`;
  headers.Expires = new Date(
    new Date(words.at).setUTCHours(23, 59, 30, 0),
  ).toUTCString();
  headers.Date = new Date(words.at).toUTCString();

  return NextResponse.json(words, {
    status: 200,
    headers,
  });
}
