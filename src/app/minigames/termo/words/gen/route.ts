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

  const now = new Date();
  const selected_words = {
    ...gen_words(),
    by: "cron",
    at: now.getTime(),
    date: now.toLocaleString(),
  };

  return new NextResponse(
    (await kv.set(WORD_KEY, selected_words)) as "OK" | null,
    {
      status: 201,
    },
  );
}
