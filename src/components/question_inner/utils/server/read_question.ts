import type { QuestionFile, Question } from "../../question";
import type question_ids from "@public/study/question/questions.json";
import { readTag } from "../read_tag";
import { readRequirement } from "../read_requirement";

type QuestionIds = typeof question_ids;

export async function readQuestion(
  id: QuestionIds[number] | (string & {}),
): Promise<Question | null> {
  try {
    const q: QuestionFile = await import(
      `@public/study/question/questions/${id}.json`
    );

    return {
      ...q,
      tags: q.tags
        .map((tag) => readTag(tag.type, tag.id))
        .filter((tag) => tag !== null),
      difficulty: {
        ...q.difficulty,
        requirements: q.difficulty.requirements
          .map((requirement) =>
            readRequirement(requirement.category, requirement.id),
          )
          .filter((requirement) => requirement !== null),
      },
      id,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
