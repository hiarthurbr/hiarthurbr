import type { QuestionOverview } from "../../question";
import question_ids from "@public/study/question/questions.json";
import { z } from "zod";
import { getOverview } from "./get_overview";
import { readTag } from "../read_tag";
import { readQuestion } from "./read_question";

const FilterSchema = z.object({
  tags: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
      }),
    )
    .optional(),
  requirements: z
    .array(
      z.object({
        id: z.string(),
        category: z.string(),
      }),
    )
    .optional(),
  difficulty: z.array(z.number().int().min(0).max(2)).optional(),
});

const FilterOrSchema = FilterSchema;
const FilterAndSchema = FilterSchema.omit({ difficulty: true });

export type FilterAndProps = z.infer<typeof FilterAndSchema>;
export type FilterOrProps = z.infer<typeof FilterOrSchema>;

const FilterAndOrSchema = z.object({
  or: FilterOrSchema.optional().readonly(),
  and: FilterAndSchema.optional().readonly(),
});

export const ListQuestionSchema = z.object({
  page: z.number().int().min(1),
  count: z.number().int().multipleOf(10).min(10).max(100),
  filters: z
    .object({
      allow: FilterAndOrSchema.optional(),
      deny: FilterAndOrSchema.optional(),
    })
    .optional()
    .readonly(),
});

function filter_and(
  question: QuestionOverview,
  f: z.infer<typeof FilterAndSchema>,
): boolean | null {
  const tags = f.tags;
  const requirements = f.requirements;

  if (tags) {
    return tags.every(({ id, type }) => {
      return question.tags.some((t) => t.type === type && t.id === id);
    });
  }
  if (requirements) {
    return requirements.every(({ category, id }) => {
      return question.requirements.some(
        (r) => r.category === category && r.id === id,
      );
    });
  }

  return null;
}

function filter_or(
  question: QuestionOverview,
  f: z.infer<typeof FilterOrSchema>,
): boolean | null {
  const tags = f.tags;
  if (tags) {
    return tags.some(({ id, type }) => {
      return question.tags.some((t) => t.type === type && t.id === id);
    });
  }

  const requirements = f.requirements;
  if (requirements) {
    return requirements.some(({ category, id }) => {
      return question.requirements.some(
        (r) => r.category === category && r.id === id,
      );
    });
  }

  const difficulty = f.difficulty;
  const question_difficulty = Math.round(question.difficulty);
  if (difficulty) {
    return difficulty.some((d) => d === question_difficulty);
  }

  return null;
}

export type ListQuestionProps = z.infer<typeof ListQuestionSchema>;

export async function listQuestions({
  page,
  count = 10,
  filters,
}: ListQuestionProps) {
  const start = (page - 1) * count;
  const end = page * count;

  const questions = (
    await Promise.all(question_ids.map((id) => getOverview(id)!))
  ).filter((el) => el != null);

  if (
    !filters?.allow?.and?.requirements?.length &&
    !filters?.allow?.and?.tags?.length &&
    !filters?.allow?.or?.difficulty?.length &&
    !filters?.allow?.or?.requirements?.length &&
    !filters?.allow?.or?.tags?.length &&
    !filters?.deny?.and?.requirements?.length &&
    !filters?.deny?.and?.tags?.length &&
    !filters?.deny?.or?.difficulty?.length &&
    !filters?.deny?.or?.requirements?.length &&
    !filters?.deny?.or?.tags?.length
    // this is awful but I love it
  )
    return {
      results: questions.slice(start, end),
      final_page: Math.ceil(questions.length / count),
    };

  const filtered = questions.filter((question) => {
    const deny = filters.deny;
    if (deny) {
      if (deny.and) {
        const result = filter_and(question, deny.and);
        if (result) return !result;
      }
      if (deny.or) {
        const result = filter_or(question, deny.or);
        if (result) return !result;
      }
    }

    const allow = filters.allow;
    if (allow) {
      if (allow.and) {
        const result = filter_and(question, allow.and);
        if (!result) return result;
      }
      if (allow.or) {
        const result = filter_or(question, allow.or);
        if (!result) return result;
      }
    }

    return true;
  });

  return {
    results: filtered.slice(start, end),
    final_page: Math.ceil(filtered.length / count),
  };
}

export type ListQuestionsResult = Awaited<ReturnType<typeof listQuestions>>;
