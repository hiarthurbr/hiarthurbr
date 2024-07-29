import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { WORD_KEY } from "@lib/const";
import { gen_words } from "@lib/gen_words";

export const runtime = "edge";

export async function GET(request: Request) {
  const words =
    await kv.get<Record<4 | 5 | 6, Record<1 | 2 | 3 | 4, string>>>(WORD_KEY);
  return NextResponse.json(
    words || { ...gen_words(), at: "edge" },
    words == null ? { status: 201 } : { status: 200 },
  );
}
