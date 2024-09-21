import {
  listQuestions,
  ListQuestionSchema,
} from "@components/question_inner/utils/server/list_questions";
import { unstable_cache } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const searchCache = unstable_cache(listQuestions);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const filter = ListQuestionSchema.safeParse(body);

    if (filter.success) {
      return NextResponse.json({
        success: true,
        data: await (process.env.NODE_ENV === "development"
          ? listQuestions(filter.data)
          : searchCache(filter.data)),
      });
    }

    return NextResponse.json(filter, { status: 400 });
  } catch {
    return new NextResponse("invalid JSON", { status: 400 });
  }
}
