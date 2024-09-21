"use client";
import { Circle, Diamond, Square, Triangle } from "@components/svgs";
import { Button, Chip, Link, ScrollShadow, Skeleton } from "@nextui-org/react";
import NextLink from "next/link";
import { useLayoutEffect, useMemo, useState } from "react";
import { Help } from "./Help";
import { TitleBadge } from "./TitleBadge";
import { TagColorMap, type Question, type Tag } from "./question";
import { DifficultyOverview } from "./Difficulty";
import { CopyButton } from "./Copy";
import { ReadQuestion } from "./ReadQuestion";
import { LANGUAGE } from "@lib/const";

export type { Question as QuestionProps, Tag };

function DynamicPlus(_: { children?: never }) {
  return (
    <TitleBadge
      label="DYNAMIC+"
      content={
        <p className="font-semibold max-w-xs py-2">
          Os números dessa questão podem ser aleatorizados, criando uma questão
          novinha para você toda vez que a vir
          <p className="text-tiny mt-4 text-default-400">
            Essa funcionalidade ainda está em desenvolvimento e pode apresentar
            falhas
          </p>
        </p>
      }
      colors={["#00f298", "#f4d400", "#ea0064", "#bc00fd", "#75e3ff"]}
    />
  );
}

function Dynamic(_: { children?: never }) {
  return (
    <TitleBadge
      label="DYNAMIC"
      content={
        <p className="font-semibold max-w-xs py-2">
          Essa questão apresenta mais de três alternativas incorretas ou mais de
          uma alternativa correta. Contudo, dentre as alternativas disponíveis,
          haverá apenas uma única alternativa correta
        </p>
      }
      colors={["#ea0064", "#bc00fd", "#75e3ff", "#00f298", "#f4d400"]}
    />
  );
}

export function QuestionElement({
  question: { help, from, options, question, tags, difficulty, language },
}: {
  question: Question;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Question["options"] | null>(null);
  const dynamic = useMemo(() => {
    if (
      options.filter((option) => !option.correct).length > 3 ||
      options.filter((option) => option.correct).length > 1
    )
      return 1;

    // Check for dynamic plus
    // if (...) return 2

    return 0;
  }, [options]);

  useLayoutEffect(() => {
    const incorrect = options.filter((option) => !option.correct);
    const correct = options.filter((option) => option.correct);

    const answers = [
      correct[Math.floor(Math.random() * performance.now()) % correct.length],
    ];

    for (let i = 0; i < 3; i++) {
      const index =
        Math.floor(Math.random() * performance.now()) % incorrect.length;
      answers.push(incorrect.splice(index, 1)[0]);
    }

    let i = 4;

    while (i > 0) {
      const random = Math.floor(Math.random() * performance.now()) % i--;
      [answers[i], answers[random]] = [answers[random], answers[i]];
    }

    setAnswers(answers);
  }, [options]);

  const text_by_ponctuation = useMemo(() => {
    let index = 0;
    return question.split(/(?<!\d)[\.\?\;\!]/).map((str) =>
      str
        .split(/(?<!\d)(, ?)/)
        .filter((str, i) => i % 2 === 0 && str.length > 0)
        .map((str, i, arr) => {
          let text = i === 0 ? str : `, ${str}`;
          const len = text.length;

          index += len;
          if (i + 1 === arr.length) {
            text = `${text}${question[index]}`;
            index++;
          }

          return text;
        }),
    );
  }, [question]);

  function getClassName(answer: number): string {
    if (selected == null || answers == null)
      return "fill-slate-700 dark:fill-slate-200";
    if (selected === answer) {
      if (answers[answer].correct) {
        return "fill-success-800 dark:fill-success-100";
      }
      return "fill-danger-800 dark:fill-danger-100";
    }

    if (answers[answer].correct) {
      return "fill-success-300";
    }
    return "fill-danger-300";
  }

  const icon = [
    <Circle key={1} className={`size-16 ${getClassName(0)} scale-95`} />,
    <Square key={2} className={`size-16 ${getClassName(1)} scale-95`} />,
    <Triangle key={3} className={`size-16 ${getClassName(2)} scale-95`} />,
    <Diamond key={4} className={`size-16 ${getClassName(3)} scale-125`} />,
  ];

  return (
    <div className="p-6 rounded-2xl lg:rounded-lg bg-primary-100/40 cursor-default backdrop-blur-[3px]">
      <div className="flex flex-row w-full items-center pb-6">
        <h3 className="text-lg text-left font-bold dark:text-slate-200 text-slate-800 grow">
          <Link
            className="mr-2 text-lg text-left font-bold dark:text-slate-200 text-slate-800"
            href={from.link}
            showAnchorIcon={typeof from.link !== "undefined"}
            isExternal
          >
            {from.name}
          </Link>
          {
            [
              null,
              <Dynamic key={"dynamic"} />,
              <DynamicPlus key={"dynamic-plus"} />,
            ][dynamic]
          }
        </h3>
        <DifficultyOverview difficulty={difficulty} language={LANGUAGE} />
      </div>
      <p className="leading-5 text-left max-w-4xl dark:text-slate-300 text-slate-700">
        {text_by_ponctuation.map((str, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className="hover:bg-danger-200/35"
          >
            {str.map((str, j) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation
                key={`${str}/${j}/${i}`}
                className="hover:bg-danger-200/75"
              >
                {str}
              </span>
            ))}
          </span>
        ))}
      </p>
      <div className="grid grid-flow-col w-full lg:px-8 py-4 gap-2 items-center justify-center grid-cols-5 md:grid-cols-12 grid-rows-1 max-lg:grid-rows-2">
        <div className="w-full bg-default-50/60 rounded-full col-span-full">
          <ScrollShadow orientation="horizontal" className="max-w-full">
            <div className="flex flex-row w-max overflow-x-visible p-2 gap-1.5 items-center">
              {tags.map((tag) => (
                <Chip
                  key={tag.id}
                  as={NextLink}
                  size="sm"
                  radius="md"
                  variant="dot"
                  color={TagColorMap[tag.type]}
                  className="hover:text-black hover:dark:text-white"
                  href={`/tags/${tag.type === "internal" ? "" : `${tag.type}-`}${tag.id}`}
                >
                  {tag.i18n[LANGUAGE] ?? tag.id}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
        </div>
        <div className="w-full flex flex-row max-lg:col-span-full col-span-2 gap-2 justify-end justify-self-stretch">
          <CopyButton text={question} />
          <ReadQuestion
            text={question}
            language={language}
            answers={{
              circle: answers?.[0]?.text ?? "Unknown answer",
              square: answers?.[1]?.text ?? "Unknown answer",
              triangle: answers?.[2]?.text ?? "Unknown answer",
              diamond: answers?.[3]?.text ?? "Unknown answer",
            }}
          />
          <Help help={help} />
        </div>
      </div>
      <div className="grid grid-flow-col grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-4 min-h-48 mt-8">
        {(answers ?? [null, null, null, null]).map((option, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: this is the only way to do it, since we dont have any unique key until the data is loaded
            key={i}
            className="relative h-full lg:mx-8"
          >
            {option == null && (
              <div className="absolute scale-50 z-10 left-1.5 top-1/2 -translate-y-1/2">
                {icon[i]}
              </div>
            )}
            <Skeleton
              classNames={{
                base: "w-full h-full rounded-medium",
                content: "w-full h-full",
              }}
              isLoaded={option != null}
            >
              <Button
                variant={
                  selected === null || selected !== i ? "flat" : "shadow"
                }
                color={
                  selected === null || option == null
                    ? "default"
                    : option.correct
                      ? "success"
                      : "danger"
                }
                className="h-full w-full !m-0 pointer-events-auto z-10"
                startContent={icon[i]}
                onPress={() => {
                  if (selected == null) setSelected(i);
                }}
              >
                <p className="w-11/12">{option?.text}</p>
              </Button>
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
