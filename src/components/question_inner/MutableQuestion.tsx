"use client";
import { Close, SingleCheck } from "@components/svgs";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Slider,
  Switch,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Help } from "./Help";
import { Difficulty, TagColorMap, type Question } from "./question";
import { LANGUAGE } from "@lib/const";
import { QuestionElement } from "./Question";

function AddTag(_: { children?: never }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          color="primary"
          variant="ghost"
          className="group"
          startContent={
            <Close className="rotate-45 fill-primary-400 group-hover:fill-primary-100" />
          }
          isIconOnly
        />
      </PopoverTrigger>
      <PopoverContent>
        <Autocomplete variant="underlined">
          <div />
        </Autocomplete>
      </PopoverContent>
    </Popover>
  );
}

function AddOption() {
  const [correct, setCorrect] = useState(false);
  return (
    <Accordion variant="splitted">
      <AccordionItem
        title={<h3>Adicionar opção</h3>}
        textValue="Adicionar opção"
      >
        <div className="flex flex-col gap-4">
          <Input type="text" label="Texto" isRequired />
          <Accordion variant="shadow">
            <AccordionItem
              title={
                <h3 className="text-medium">Adicionar explicação (opcional)</h3>
              }
              textValue="Adicionar explicação (opcional)"
              classNames={{
                trigger: "py-2",
              }}
            >
              <div className="flex flex-col gap-4">
                <Textarea label="explicação" isRequired />
                <div className="flex flex-row gap-4">
                  <Input type="text" label="Fonte (nome)" isRequired />
                  <Input type="url" label="Fonte (url)" />
                </div>
              </div>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-row gap-4 items-center justify-end">
            <Switch
              size="lg"
              color="success"
              classNames={{ wrapper: "bg-danger-300", label: "text-medium" }}
              startContent={
                <span>
                  <Close className="pr-2 dark:text-success-200 text-success-600" />
                </span>
              }
              endContent={
                <span className="p-1">
                  <SingleCheck className="dark:text-danger-200 text-danger-600/75" />
                </span>
              }
              thumbIcon={
                <span>
                  <SingleCheck className="group-data-[selected=true]:block hidden" />
                  <Close
                    className="group-data-[selected=true]:hidden p-1"
                    stroke="#000"
                  />
                </span>
              }
              isSelected={correct}
              onValueChange={setCorrect}
            >
              {correct ? "Correta" : "Incorreta"}
            </Switch>
            <Button>Adicionar</Button>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}

export function QuestionEditor({
  question: { help, from, options, question, tags, difficulty, language },
}: {
  question: Question;
  mode: "creating" | "editing";
}) {
  return (
    <div className="p-6 rounded-2xl lg:rounded-lg bg-danger-50/40 cursor-default backdrop-blur-[3px] flex flex-col gap-4">
      <div className="flex flex-row w-full items-center gap-2">
        <Input label="Fonte" value={from.name} type="text" isRequired />
        <Input label="Link" value={from.link} type="url" />
      </div>
      <Textarea
        label="Questão"
        value={question}
        classNames={{
          input: "min-h-64",
        }}
        disableAutosize
        isRequired
      />
      <div className="grid grid-flow-col w-full gap-2 items-center justify-center grid-cols-5 md:grid-cols-12 grid-rows-1 max-lg:grid-rows-2">
        <div className="w-full bg-default-50/60 rounded-full col-span-full">
          <ScrollShadow orientation="horizontal" className="max-w-full">
            <div className="flex flex-row w-max overflow-x-visible p-2 gap-1.5 items-center">
              {tags.map((tag) => (
                <Chip
                  key={tag.id}
                  size="sm"
                  radius="md"
                  variant="dot"
                  color={TagColorMap[tag.type]}
                  onClose={() => {}}
                >
                  {tag.i18n[LANGUAGE] ?? tag.id}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
        </div>
        <div className="w-full flex flex-row max-lg:col-span-full col-span-2 gap-2 justify-end justify-self-stretch">
          <AddTag />
        </div>
      </div>
      <div className="grid grid-flow-col w-full gap-2 items-center justify-center grid-cols-5 md:grid-cols-12 grid-rows-1 max-lg:grid-rows-2">
        <div className="w-full bg-default-50/60 rounded-full col-span-full">
          <ScrollShadow orientation="horizontal" className="max-w-full">
            <div className="flex flex-row w-max overflow-x-visible p-2 gap-1.5 items-center">
              {difficulty.requirements.map((requirement) => (
                <Chip
                  key={requirement.id}
                  size="sm"
                  radius="md"
                  variant="dot"
                  color="default"
                  onClose={() => {}}
                >
                  {requirement.i18n[LANGUAGE] ?? requirement.id}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
        </div>
        <div className="w-full flex flex-row max-lg:col-span-full col-span-2 gap-2 justify-end justify-self-stretch items-center">
          <AddTag />
          <Slider
            label="Dificuldade"
            className="min-w-64"
            step={0.1}
            maxValue={2}
            minValue={0}
            value={difficulty.rating}
            marks={[
              {
                value: 0,
                label: "Fácil",
              },
              {
                value: 1,
                label: "Médio",
              },
              {
                value: 2,
                label: "Difícil",
              },
            ]}
            getValue={(value) =>
              ({
                [Difficulty.Easy]: "Fácil",
                [Difficulty.Medium]: "Médio",
                [Difficulty.Hard]: "Difícil",
              })[Math.round(value as number)] ?? "Desconhecido"
            }
            color={
              (
                {
                  [Difficulty.Easy]: "success",
                  [Difficulty.Medium]: "warning",
                  [Difficulty.Hard]: "danger",
                } as const
              )[Math.round(difficulty.rating)]
            }
          />
        </div>
      </div>
      <AddOption />
    </div>
  );
}

export function MutableQuestion({
  question: question_,
}: {
  children?: never;
  question: Question;
}) {
  const [mode, setMode] = useState("edit");
  const [question, setQuestion] = useState(question_);

  return (
    <div className="flex flex-col gap-8">
      <Tabs
        selectedKey={mode}
        // @ts-ignore
        onSelectionChange={setMode}
      >
        <Tab key="edit" title="Editar" />
        <Tab key="preview" title="Visualizar" />
      </Tabs>
      {mode === "edit" ? (
        <QuestionEditor question={question} mode="editing" />
      ) : (
        <QuestionElement question={question} />
      )}
    </div>
  );
}
