import type { z } from "zod";
import type { Requirement, RequirementsFileSchema } from "../question";
import requirements from "@public/study/question/requirements.json";

type Requirements = typeof requirements;

export function readRequirement(
  category: keyof Requirements | (string & {}),
  id: string,
  lang = "pt-BR",
): Requirement | null {
  const i18n = requirements[category as keyof Requirements]?.find(
    (item) => item.id === id,
  )?.i18n;

  return i18n ? ({ id, i18n, category } as Requirement) : null;
}
