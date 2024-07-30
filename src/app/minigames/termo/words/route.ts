import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { WORD_KEY } from "@lib/const";
import type { gen_words } from "@lib/gen_words";

export const runtime = "edge";

export async function GET(request: Request) {
  const now = new Date();
  const midnight = new Date(now).setUTCHours(23, 59, 30, 0);

  const words = (await kv.get<
    ReturnType<typeof gen_words> & {
      by: "edge" | "cron";
      at: number;
      date: string;
    }
  >(WORD_KEY))!;

  const headers = {
    "Cache-Control": `public, max-age=${Math.floor((midnight - words.at) / 1000)}, must-revalidate, immutable`,
    Expires: new Date(
      new Date(words.at).setUTCHours(23, 59, 30, 0),
    ).toUTCString(),
    Date: new Date(words.at).toUTCString(),
  };

  return NextResponse.json(words, {
    status: 200,
    headers,
  });
}
