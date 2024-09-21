import type { Question, QuestionOverview } from "../../question";
import { readQuestion } from "./read_question";

export async function getOverview(
  id: string,
  question?: Question,
): Promise<QuestionOverview | null> {
  const q = question ?? (await readQuestion(id));

  if (!q) return null;

  return {
    id,
    from: q.from,
    tags: q.tags,
    difficulty: q.difficulty.rating,
    requirements: q.difficulty.requirements,
    text: q.question,
  };
}
