import { type NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { WORD_KEY } from "@lib/const";
import { gen_words } from "@lib/gen_words";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  if (
    request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}` &&
    process.env.NODE_ENV !== "development"
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const selected_words = { ...gen_words(), at: "cron" };

  return NextResponse.json(await kv.set(WORD_KEY, selected_words));
}
