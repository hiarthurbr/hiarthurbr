import { MutableQuestion } from "@components/question_inner/MutableQuestion";
import { readQuestion } from "@components/question_inner/utils/server/read_question";
import { notFound } from "next/navigation";

export default async function Test({
  params: { question_id },
}: {
  params: { question_id: string };
}) {
  const question = await readQuestion("ByYwyx5debI" ?? question_id);

  if (!question) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="min-h-[36rem] 2lg:w-7/12 w-11/12 pb-12">
        <MutableQuestion question={question} />
      </div>
    </div>
  );
}
