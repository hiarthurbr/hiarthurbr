import {
  ArrowDown,
  Circle,
  Diamond,
  HelpPopup,
  Square,
  Triangle,
} from "@components/svgs";
import {
  Button,
  Chip,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useMemo, useRef, useState } from "react";

enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

const TAGS = Object.freeze({
  "source-enem": { id: "source-enem", name: "ENEM", color: "warning" },
  "year-2023": { id: "year-2023", name: "2023", color: "success" },
  "category-math": {
    id: "category-math",
    name: "Matemática",
    color: "secondary",
  },
  "subject-probability": {
    id: "subject-probability",
    name: "Probabilidade",
    color: "default",
  },
  "is-dynamic": {
    id: "is-dynamic",
    name: "Dinâmica",
    color: "danger",
  },
  "is-dynamic-plus": {
    id: "is-dynamic-plus",
    name: "Dinâmica+",
    color: "danger",
  },
} as const satisfies Record<
  string,
  {
    readonly id: string;
    readonly name: string;
    readonly color: Parameters<typeof Chip>[0]["color"];
  }
>);

type QuestionProps = {
  readonly from: string;
  readonly tags: ReadonlyArray<(typeof TAGS)[keyof typeof TAGS]>;
  readonly question: string;
  readonly difficulty: {
    readonly rating: number;
    readonly requirements: string[];
  };
  readonly help?: {
    readonly text: string;
    readonly source?: {
      readonly name: string;
      readonly link: string;
    };
    readonly author: string;
  };
  readonly options: ReadonlyArray<{
    readonly text: string;
    readonly correct: boolean;
    readonly explanation?: {
      readonly text: string;
      readonly source: string;
      readonly author: string;
    };
  }>;
};

const QUESTION: QuestionProps = {
  from: "ENEM 2023",
  tags: [
    TAGS["source-enem"],
    TAGS["year-2023"],
    TAGS["category-math"],
    TAGS["subject-probability"],
    TAGS["is-dynamic"],
  ],
  difficulty: {
    rating: 0.2,
    requirements: ["Probabilidade", "Fração", "Multiplicação"],
  },
  question:
    "No alojamento de uma universidade, há alguns quartos com o padrão superior ao dos demais. Um desses quartos ficou disponível, e muitos estudantes se candidataram para morar no local. Para escolher quem ficará com o quarto, um sorteio será realizado. Para esse sorteio, cartões individuais com os nomes de todos os estudantes inscritos serão depositados em uma urna, sendo que, para cada estudante de primeiro ano, será depositado um único cartão com seu nome; para cada estudante de segundo ano, dois cartões com seu nome; e, para cada estudante de terceiro ano, três cartões com seu nome. Foram inscritos 200 estudantes de primeiro ano, 150 de segundo ano e 100 de terceiro ano. Todos os cartões têm a mesma probabilidade de serem sorteados. Qual a probabilidade de o vencedor do sorteio ser um estudante de terceiro ano?",
  help: {
    author: "Gemini Advanced",
    source: {
      name: "Google AI",
      link: "https://gemini.google.com",
    },
    text: "Para resolver essa questão, você precisa considerar a proporção de cartões de cada ano em relação ao total de cartões. Lembre-se de que cada estudante tem um número diferente de cartões na urna, dependendo do seu ano. Ao calcular o número total de cartões e o número de cartões dos estudantes do terceiro ano, você poderá determinar a probabilidade de um estudante do terceiro ano ser sorteado.",
  },
  options: [
    { text: "1/2", correct: false },
    { text: "1/3", correct: false },
    { text: "1/8", correct: false },
    { text: "2/9", correct: false },
    {
      text: "3/8",
      correct: true,
      explanation: { text: "Explicação", source: "ENEM", author: "Inep" },
    },
  ],
};

export default function Test() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="min-h-[36rem] 2lg:w-7/12 w-11/12 pb-12">
        <Question question={QUESTION} />
      </div>
    </div>
  );
}

function DynamicPlus(_: { children?: never }) {
  const colors = useMemo(
    () => ["#3a86ff", "#8338ec", "#ff006e", "#fb5607", "#ffbe0b"] as const,
    [],
  );
  const trigger = useRef(
    <span className="font-extrabold">
      [
      <span
        className="bg-clip-text text-transparent animate-gradient hover:animate-none font-black saturate-[85%]"
        style={{
          backgroundImage: `linear-gradient(-45deg, ${[
            ...colors,
            ...colors,
          ].join(", ")})`,
          backgroundSize: "300% 300%",
          backgroundPosition: "0% 50%",
        }}
      >
        DYNAMIC+
      </span>
      ]
    </span>,
  );

  const content = useRef(
    <p className="font-semibold max-w-xs py-2">
      Os números dessa questão podem ser aleatorizados, criando uma questão
      novinha para você toda vez que a vir
      <p className="text-tiny mt-4 text-default-400">
        Essa funcionalidade ainda está em desenvolvimento e pode apresentar
        falhas
      </p>
    </p>,
  );

  return (
    <span>
      <Tooltip content={content.current} placement="bottom-start" showArrow>
        <span className="ml-2 hidden lg:inline">{trigger.current}</span>
      </Tooltip>
      <Popover placement="bottom-start" showArrow>
        <PopoverTrigger className="max-lg:ml-2 lg:hidden">
          <Button
            variant="light"
            size="lg"
            radius="none"
            className="p-0 m-0 border-0 h-min inline-block data-[hover=true]:bg-transparent"
          >
            {trigger.current}
          </Button>
        </PopoverTrigger>
        <PopoverContent>{content.current}</PopoverContent>
      </Popover>
    </span>
  );
}

function Dynamic(_: { children?: never }) {
  const colors = useMemo(
    () => ["#3a86ff", "#8338ec", "#ff006e", "#fb5607", "#ffbe0b"] as const,
    [],
  );
  const trigger = useRef(
    <span className="font-extrabold">
      [
      <span
        className="bg-clip-text text-transparent animate-gradient hover:animate-none font-black saturate-[85%]"
        style={{
          backgroundImage: `linear-gradient(-45deg, ${[
            ...colors,
            ...colors,
          ].join(", ")})`,
          backgroundSize: "300% 300%",
          backgroundPosition: "0% 50%",
        }}
      >
        DYNAMIC
      </span>
      ]
    </span>,
  );

  const content = useRef(
    <p className="font-semibold max-w-xs py-2">
      Essa questão apresenta mais de três alternativas incorretas ou mais de uma
      alternativa correta. Contudo, dentre as alternativas disponíveis, haverá
      apenas uma única alternativa correta
    </p>,
  );

  return (
    <span>
      <Tooltip content={content.current} placement="bottom-start" showArrow>
        <span className="ml-2 hidden lg:inline">{trigger.current}</span>
      </Tooltip>
      <Popover placement="bottom-start" showArrow>
        <PopoverTrigger className="max-lg:ml-2 lg:hidden">
          <Button
            variant="light"
            size="lg"
            radius="none"
            className="p-0 m-0 border-0 h-min inline-block data-[hover=true]:bg-transparent"
          >
            {trigger.current}
          </Button>
        </PopoverTrigger>
        <PopoverContent>{content.current}</PopoverContent>
      </Popover>
    </span>
  );
}

function Help({ help }: { help: QuestionProps["help"] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip
        placement="top-end"
        className="py-2"
        content={
          <p className="max-w-40">
            Mostra uma dica com explicações sobre como resolver a questão.
          </p>
        }
      >
        <Button
          color="primary"
          variant={isOpen ? "shadow" : "ghost"}
          className="group"
          startContent={
            <HelpPopup className="fill-primary-400 group-hover:fill-primary-100" />
          }
          onPress={onOpen}
          isDisabled={typeof help === "undefined"}
          isIconOnly
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Como resolver essa questão?</ModalHeader>
              <ModalBody>
                <p>{help?.text}</p>
              </ModalBody>
              <ModalFooter className="flex flex-row items-end">
                <span className="text-tiny text-default-600">
                  Dica fornecida por{" "}
                  <strong>{help?.author ?? "usuário desconhecido"}</strong>
                  {typeof help?.source !== "undefined" && (
                    <span>
                      {" "}
                      (
                      <Link
                        size="sm"
                        href={help.source.link}
                        showAnchorIcon
                        isExternal
                      >
                        {help.source.name}
                      </Link>
                      )
                    </span>
                  )}
                </span>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function Question({
  question: { help, from, options, question, tags, difficulty },
}: {
  question: QuestionProps;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const answers = useMemo(() => {
    const incorrect = options.filter((option) => !option.correct);
    const correct = options.filter((option) => option.correct);

    const answers = [];

    for (let i = 0; i < 3; i++) {
      const index =
        Math.floor(Math.random() * performance.now()) % incorrect.length;
      answers.push(incorrect.splice(index, 1)[0]);
    }

    answers.push(
      correct[Math.floor(Math.random() * performance.now()) % correct.length],
    );

    let i = 4;

    while (i > 0) {
      const random = Math.floor(Math.random() * performance.now()) % i--;
      [answers[i], answers[random]] = [answers[random], answers[i]];
    }

    return Object.freeze(answers);
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
    if (selected == null) return "fill-slate-700 dark:fill-slate-200";
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
    <Circle className={`size-16 ${getClassName(0)} scale-95`} />,
    <Square className={`size-16 ${getClassName(1)} scale-95`} />,
    <Triangle className={`size-16 ${getClassName(2)} scale-95`} />,
    <Diamond className={`size-16 ${getClassName(3)} scale-125`} />,
  ];

  return (
    <div className="p-6 rounded-2xl lg:rounded-lg dark:bg-indigo-950 bg-indigo-200 !bg-opacity-40 cursor-default">
      <div className="flex flex-row w-full items-center pb-6">
        <h3 className="text-lg text-left font-bold grow dark:text-slate-200 text-slate-800">
          {from} <Dynamic />
        </h3>
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
            <div className="flex flex-col max-w-xs py-2">
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
                {difficulty.requirements.map((text) => (
                  <Chip
                    key={text}
                    size="sm"
                    radius="md"
                    variant="flat"
                    color="primary"
                    className="pb-0.5 w-max mx-1 mt-1.5"
                  >
                    {text}
                  </Chip>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <p className="leading-5 text-left max-w-4xl dark:text-slate-300 text-slate-700 *:transition-all *:duration-75">
        {text_by_ponctuation
          .map((str) =>
            str.map((str, i) => (
              <span
                key={`${str}/${i}`}
                className="hover:bg-red-500 hover:bg-opacity-50"
              >
                {str}
              </span>
            )),
          )
          .map((str) => (
            <span
              key={str.join("")}
              className="hover:bg-red-500 hover:bg-opacity-25"
            >
              {str}
            </span>
          ))}
      </p>
      <div className="flex flex-row w-full max-lg:pl-4 max-lg:pr-8 py-4 items-center justify-center">
        <div className="w-full max-lg:ml-3 mr-2 grow dark:bg-zinc-950 bg-zinc-50 dark:bg-opacity-50 rounded-full">
          <ScrollShadow orientation="horizontal" className="max-w-full">
            <div className="flex flex-row w-max overflow-x-visible p-2 gap-1.5 items-center">
              {tags.map((tag) => (
                <Chip
                  key={tag.id}
                  as={NextLink}
                  size="sm"
                  radius="md"
                  variant="dot"
                  color={tag.color}
                  className="hover:text-black hover:dark:text-white"
                  href={`/tags/${tag.id}`}
                >
                  {tag.name}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
        </div>
        <Help help={help} />
      </div>
      <div className="grid grid-flow-col grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-4 min-h-48 mt-8">
        {answers.map((option, i) => (
          <Button
            key={option.text}
            variant={
              selected === null ? "faded" : selected === i ? "shadow" : "flat"
            }
            color={
              selected === null
                ? "default"
                : option.correct
                  ? "success"
                  : "danger"
            }
            className="h-full lg:mx-8"
            startContent={icon[i]}
            onPress={() => {
              if (selected == null) setSelected(i);
            }}
          >
            <p className="w-11/12">{option.text}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
