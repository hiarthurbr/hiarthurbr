import type { Tag, TagsFileSchema } from "../question";
import tags from "@public/study/question/tags.json";

type Tags = typeof tags;

export function readTag(
  type: keyof Tags | (string & {}),
  id: string,
): Tag | null {
  const i18n = tags[type as keyof Tags]?.options.find(
    (item) => item.id === id,
  )?.i18n;

  return i18n ? ({ id, i18n, type } as Tag) : null;
}
