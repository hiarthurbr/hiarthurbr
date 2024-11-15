import { QuestionFileSchema } from "@components/question_inner/question";
import { NextResponse, type NextRequest } from "next/server";
import { writeFile } from "node:fs/promises";

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{ question_id: string }>;
  },
): Promise<NextResponse> {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse("Only available in development enviroments", {
      status: 403,
    });

  const body = await req.json();
  const question = QuestionFileSchema.safeParse(body);

  if (question.success) {
    try {
      await writeFile(
        `${process.cwd()}/public/study/question/questions/${(await context.params).question_id}.json`,
        JSON.stringify(question.data),
      );

      return new NextResponse(null, { status: 201 });

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (e: any) {
      return NextResponse.json(e, { status: 500 });
    }
  }

  return NextResponse.json(question, { status: 400 });
}
