import { NextResponse, type NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { WORD_KEY } from "@lib/const";
import { gen_words } from "@lib/gen_words";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const now = new Date();
  const today = `${now.getUTCDate()}-${now.getUTCMonth()}-${now.getUTCFullYear()}`;

  let words = (await kv.get<
    ReturnType<typeof gen_words> & {
      date: string;
    }
  >(WORD_KEY))!;

  if (words.date !== today) {
    const selected_words = {
      ...gen_words(),
      date: today,
    };
    await kv.set(WORD_KEY, selected_words);

    words = selected_words;
  }

  const headers = {
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  return NextResponse.json(words, {
    status: 200,
    headers,
  });
}
