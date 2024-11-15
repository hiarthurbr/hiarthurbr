import { QuestionElement } from "@components/question_inner/Question";
import { readQuestion } from "@components/question_inner/utils/server/read_question";
import { notFound } from "next/navigation";

export default async function Test({
  params,
}: {
  params: Promise<{ question_id: string }>;
}) {
  const { question_id } = await params;
  const question = await readQuestion(question_id);

  if (!question) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="min-h-[36rem] 2lg:w-7/12 w-11/12 pb-12">
        <QuestionElement question={question} />
      </div>
    </div>
  );
}

import question_ids from "@public/study/question/questions.json";
export async function generateStaticParams() {
  return question_ids.map((question_id) => ({ question_id }));
}

export const revalidate = false;
