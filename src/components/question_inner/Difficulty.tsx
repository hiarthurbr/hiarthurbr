import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Difficulty, type Question } from "./question";
import { ArrowDown } from "@components/svgs";

export function DifficultyOverview({
  difficulty,
  language,
}: {
  children?: never;
  difficulty: Question["difficulty"];
  language: string;
}) {
  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <Button
          variant="light"
          size="sm"
          color={
            (
              {
                [Difficulty.Easy]: "success",
                [Difficulty.Medium]: "warning",
                [Difficulty.Hard]: "danger",
              } as const
            )[Math.round(difficulty.rating)]
          }
        >
          <span className="font-semibold text-base">
            {
              {
                [Difficulty.Easy]: "Fácil",
                [Difficulty.Medium]: "Médio",
                [Difficulty.Hard]: "Difícil",
              }[Math.round(difficulty.rating)]
            }
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col max-w-xs pb-2">
          <p className="text-left mt-2 mb-0.5 font-bold">Dificuldade:</p>
          <div className="w-full px-12 h-6 flex">
            <div className="relative size-full px-4">
              <ArrowDown
                className="absolute bottom-0 -translate-x-1/2 fill-slate-700 dark:fill-slate-300"
                style={{
                  left: `${difficulty.rating * 50}%`,
                }}
              />
              <div className="absolute w-full bottom-0 left-0 h-0.5 bg-gradient-to-r from-success-500 via-warning-500 to-danger-500 saturate-200" />
            </div>
          </div>
          <p className="text-left mt-2 mb-0.5 font-bold">
            Conhecimentos necessários:
          </p>
          <div className="w-full">
            {difficulty.requirements.map((tag) => (
              <Chip
                key={tag.id}
                size="sm"
                radius="md"
                variant="faded"
                color="default"
                className="pb-0.5 w-max mx-1 mt-1.5"
              >
                {tag.i18n[language] ?? tag.id}
              </Chip>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
