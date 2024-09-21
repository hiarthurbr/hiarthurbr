import type { Chip } from "@nextui-org/react";
import type TagsFile from "@public/study/question/tags.json";
import { z } from "zod";

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
type LastOf<U> =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  UnionToIntersection<U extends any ? (x: U) => void : never> extends (
    x: infer L,
  ) => void
    ? L
    : never;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Push<U extends any[], T> = [...U, T];
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type UnionToTuple<U, T extends any[] = []> = [U] extends [never]
  ? T
  : UnionToTuple<Exclude<U, LastOf<U>>, Push<T, LastOf<U>>>;

export const TagColorMap = {
  year: "success",
  subject: "default",
  source: "warning",
  internal: "danger",
  category: "secondary",
} as const satisfies Record<
  keyof typeof TagsFile,
  Parameters<typeof Chip>[0]["color"]
>;
const TAG_COLOR_MAP_KEYS = Object.keys(TagColorMap) as UnionToTuple<
  keyof typeof TagsFile
>;

export const TagTypeEnum = z.enum(TAG_COLOR_MAP_KEYS);

export const i18nSchema = z.record(z.string(), z.string()).readonly();

export const TagFileSchema = z.object({
  id: z.string(),
  i18n: i18nSchema,
});

export const TagsFileSchema = z.record(
  TagTypeEnum.readonly(),
  z.object({
    i18n: i18nSchema,
    options: z.array(TagFileSchema).readonly(),
  }),
);

export const RequirementFileSchema = z.object({
  id: z.string(),
  i18n: i18nSchema,
});

export const RequirementsFileSchema = z.record(
  TagTypeEnum.readonly(),
  z.array(TagFileSchema.readonly()).readonly(),
);

export const TagSchema = z.object({
  id: z.string(),
  i18n: i18nSchema,
  type: TagTypeEnum,
});

export type Tag = Readonly<z.infer<typeof TagSchema>>;

export const RequirementSchema = z.object({
  id: z.string(),
  i18n: i18nSchema,
  category: z.string(),
});

export type Requirement = Readonly<z.infer<typeof RequirementSchema>>;

const SourceOptionalSchema = z.object({
  name: z.string(),
  link: z.string().url().optional(),
});

const SourceSchema = z.object({
  name: z.string(),
  link: z.string().url(),
});

const Help = z.object({
  text: z.string(),
  source: SourceSchema.optional().readonly(),
  author: z.string(),
});

const Options = z.array(
  z
    .object({
      text: z.string(),
      correct: z.boolean(),
      explanation: Help.optional().readonly(),
    })
    .readonly(),
);

export const QuestionFileSchema = z
  .object({
    from: SourceOptionalSchema.readonly(),
    tags: z.array(TagSchema.omit({ i18n: true }).readonly()).readonly(),
    question: z.string(),
    language: z.string(),
    difficulty: z
      .object({
        rating: z.number().min(0).max(2),
        requirements: z.array(
          RequirementSchema.omit({ i18n: true }).readonly(),
        ),
      })
      .readonly(),
    help: Help.optional().readonly(),
    options: Options.readonly(),
  })
  .readonly();

export type QuestionFile = z.infer<typeof QuestionFileSchema>;

export const QuestionSchema = z.object({
  id: z.string(),
  from: SourceOptionalSchema.readonly(),
  tags: z.array(TagSchema.readonly()).readonly(),
  question: z.string(),
  language: z.string(),
  difficulty: z
    .object({
      rating: z.number().min(0).max(2),
      requirements: z.array(RequirementSchema.readonly()).readonly(),
    })
    .readonly(),
  help: Help.optional().readonly(),
  options: Options.readonly(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionOverviewSchema = z
  .object({
    id: z.string(),
    from: SourceOptionalSchema.readonly(),
    tags: z.array(TagSchema.readonly()).readonly(),
    requirements: z.array(RequirementSchema.readonly()).readonly(),
    difficulty: z.number().min(0).max(2),
    text: z.string(),
  })
  .readonly();

export type QuestionOverview = z.infer<typeof QuestionOverviewSchema>;
