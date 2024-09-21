"use client";
import {
  Difficulty,
  TagColorMap,
  type Question,
  type QuestionOverview,
} from "@components/question_inner/question";
import type {
  FilterAndProps,
  FilterOrProps,
  ListQuestionProps,
  ListQuestionsResult,
} from "@components/question_inner/utils/server/list_questions";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Chip,
  Divider,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  Navbar,
  NavbarContent,
  NavbarItem,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ScrollShadow,
  Skeleton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import wretch from "wretch";
import { abortAddon } from "wretch/addons";
import type { SafeParseReturnType } from "zod";
import NextLink from "next/link";
import tags from "@public/study/question/tags.json";
import requirements from "@public/study/question/requirements.json";
import { Ban, Close, DoubleCheck, Edit, SingleCheck } from "@components/svgs";
import { readTag } from "@components/question_inner/utils/read_tag";
import { LANGUAGE } from "@lib/const";
import { readRequirement } from "@components/question_inner/utils/read_requirement";

const IS_DEV = process.env.NODE_ENV === "development";

function QuestionsList({
  items,
  language,
}: {
  children?: never;
  items: QuestionOverview[] | null;
  and?: FilterAndProps;
  or?: FilterOrProps;
  language: string;
}) {
  console.count("List re-render");
  // const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return items == null ? (
    <Spinner size="lg" />
  ) : (
    <Accordion variant="splitted" className="max-w-full">
      {items.map((item) => {
        const d = item.difficulty;
        const rd = Math.round(d);

        const color = {
          [Difficulty.Easy]: "text-success-300",
          [Difficulty.Medium]: "text-warning-400",
          [Difficulty.Hard]: "text-danger-400",
        }[rd];

        return (
          <AccordionItem
            key={item.id}
            textValue="Questão"
            title={
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row w-full items-center gap-2">
                  <h3 className="text-lg text-left font-bold dark:text-slate-200 text-slate-800 grow">
                    {item.from.name}
                  </h3>
                  <span className={`font-semibold text-base ${color}`}>
                    {
                      {
                        [Difficulty.Easy]: "Fácil",
                        [Difficulty.Medium]: "Médio",
                        [Difficulty.Hard]: "Difícil",
                      }[rd]
                    }
                  </span>
                  <Progress
                    classNames={{
                      base: "max-w-32",
                    }}
                    color={
                      (
                        {
                          [Difficulty.Easy]: "success",
                          [Difficulty.Medium]: "warning",
                          [Difficulty.Hard]: "danger",
                        } as const
                      )[rd]
                    }
                    size="sm"
                    aria-label="Dificuldade"
                    minValue={0}
                    maxValue={2}
                    value={d}
                  />
                </div>
                <ScrollShadow
                  orientation="horizontal"
                  className="max-w-[80vw] md:max-w-screen-sm 2xl:max-w-[56rem] w-11/12"
                >
                  <div className="flex flex-row overflow-x-visible gap-2 w-max bg-default-100 p-1.5 rounded-full">
                    {item.tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        color={TagColorMap[tag.type]}
                        size="sm"
                        variant="dot"
                      >
                        {tag.i18n[language] ?? tag.id}
                      </Chip>
                    ))}
                  </div>
                </ScrollShadow>
                <div className="flex flex-col gap-0.5 ml-2">
                  <h3 className="text-small text-default-400">
                    Requisitos para resolver essa questão:
                  </h3>
                  <ScrollShadow
                    orientation="horizontal"
                    className="max-w-[80vw] md:max-w-screen-sm 2xl:max-w-[56rem] w-11/12"
                  >
                    <div className="flex flex-row overflow-x-visible gap-2 w-max bg-default-100 p-1.5 rounded-full">
                      {item.requirements.map((requirement) => (
                        <Chip
                          key={requirement.id}
                          color="default"
                          size="sm"
                          variant="faded"
                        >
                          {requirement.i18n[language] ?? requirement.id}
                        </Chip>
                      ))}
                    </div>
                  </ScrollShadow>
                </div>
              </div>
            }
          >
            <div className="flex flex-col">
              <div className="flex gap-2 flex-row">
                <Button
                  as={NextLink}
                  className="grow"
                  href={`/study/question/${item.id}`}
                >
                  Visualizar questão em tela cheia
                </Button>
                {IS_DEV && (
                  <Tooltip content="Editar questão" placement="top">
                    <Button
                      as={NextLink}
                      color="primary"
                      className="p-2"
                      aria-label="Editar questão"
                      href={`/study/question/${item.id}/edit`}
                      startContent={<Edit />}
                      isIconOnly
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function filtersReducer(
  state: ListQuestionProps["filters"],
  action: ListQuestionProps["filters"],
): ListQuestionProps["filters"] {
  return {
    allow: {
      and: {
        requirements: [
          ...(state?.allow?.and?.requirements ?? []),
          ...(action?.allow?.and?.requirements ?? []),
        ],
        tags: [
          ...(state?.allow?.and?.tags ?? []),
          ...(action?.allow?.and?.tags ?? []),
        ],
      },
      or: {
        requirements: [
          ...(state?.allow?.or?.requirements ?? []),
          ...(action?.allow?.or?.requirements ?? []),
        ],
        tags: [
          ...(state?.allow?.or?.tags ?? []),
          ...(action?.allow?.or?.tags ?? []),
        ],
      },
    },
    deny: {
      and: {
        requirements: [
          ...(state?.deny?.and?.requirements ?? []),
          ...(action?.deny?.and?.requirements ?? []),
        ],
        tags: [
          ...(state?.deny?.and?.tags ?? []),
          ...(action?.deny?.and?.tags ?? []),
        ],
      },
      or: {
        requirements: [
          ...(state?.deny?.or?.requirements ?? []),
          ...(action?.deny?.or?.requirements ?? []),
        ],
        tags: [
          ...(state?.deny?.or?.tags ?? []),
          ...(action?.deny?.or?.tags ?? []),
        ],
      },
    },
  };
}

const List = ({
  sections,
  advancedSearch,
}: {
  children?: never;
  sections: Array<{
    id: string;
    i18n: Record<string, string>;
    options: Array<{
      id: string;
      i18n: Record<string, string>;
    }>;
  }>;
  advancedSearch: boolean;
  dispatch: React.Dispatch<ListQuestionProps["filters"]>;
  type: "tags" | "requirements";
}) => (
  <Listbox className="min-w-48 select-none" aria-label="Lista de filtros">
    {sections.map(({ i18n, options, id }) => (
      <ListboxSection
        key={id}
        classNames={{ heading: "pl-0" }}
        // @ts-expect-error
        title={
          <span className="flex flex-row items-center gap-2 overflow-x-hidden">
            {i18n[LANGUAGE] ?? id}
            <Divider />
          </span>
        }
      >
        {options.map((tag) => (
          <ListboxItem
            key={tag.id}
            value={tag.id}
            textValue={tag.i18n[LANGUAGE] ?? tag.id}
            classNames={{
              base: "data-[hover=true]:bg-default-100",
              title: `grid grid-flow-col ${advancedSearch ? "grid-cols-7" : "grid-cols-5"} gap-2 items-center`,
            }}
          >
            {advancedSearch && (
              <Button
                size="sm"
                startContent={<DoubleCheck />}
                aria-label="Selecionar (and)"
                variant="light"
                color="success"
                isIconOnly
              />
            )}
            <Button
              size="sm"
              startContent={<SingleCheck />}
              aria-label={advancedSearch ? "Selecionar (or)" : "Selecionar"}
              variant="light"
              color="success"
              isIconOnly
            />
            <span className="col-span-3 text-center">
              {tag.i18n[LANGUAGE] ?? tag.id}
            </span>
            <Button
              size="sm"
              startContent={<Ban />}
              aria-label={advancedSearch ? "Negar (or)" : "Negar"}
              variant="light"
              className="p-2"
              color="danger"
              isIconOnly
            />
            {advancedSearch && (
              <Button
                size="sm"
                startContent={<Close />}
                aria-label="Negar (and)"
                variant="light"
                className="p-1.5"
                color="danger"
                isIconOnly
              />
            )}
          </ListboxItem>
        ))}
      </ListboxSection>
    ))}
  </Listbox>
);

const Dropdown = ({
  children,
  name,
}: {
  children: JSX.Element;
  name: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <span>
      <Popover>
        <PopoverTrigger>
          <Button
            className="w-full max-sm:hidden"
            aria-label={name}
            variant="flat"
          >
            {name}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="pt-2.5">{children}</PopoverContent>
      </Popover>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        size="xl"
      >
        <ModalContent>{(_) => <ModalBody>{children}</ModalBody>}</ModalContent>
      </Modal>
      <Button
        className="w-full sm:hidden"
        aria-label={name}
        variant="flat"
        onPress={onOpen}
      >
        {name}
      </Button>
    </span>
  );
};

export function QuestionsListElement() {
  const [filters, dispatchFilters] = useReducer(filtersReducer, {
    allow: { and: { requirements: [], tags: [] } },
    deny: { and: { requirements: [], tags: [] } },
  });
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [[currPage, finalPage], setCurrPage] = useState<
    [number, number] | [null, null] | [number, null]
  >([null, null]);
  const [questions, setQuestions] = useState<QuestionOverview[] | null>(null);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const abort = useRef(new AbortController());
  const cancelReq = useRef(false);
  cancelReq.current = currPage !== null;

  const filters_grid = useMemo(() => {
    const grid = [
      {
        title: !advancedSearch ? "Allowed tags" : "Allowed (or) tags",
        id: "allow-or-tags",
        items: filters?.allow?.or?.tags ?? [],
        advanced: false,
      },
      {
        title: !advancedSearch
          ? "Allowed requirements"
          : "Allowed (or) requirements",
        id: "allow-or-requirements",
        items: filters?.allow?.or?.requirements ?? [],
        advanced: false,
      },
      {
        title: "Allowed (and) tags",
        id: "allow-and-tags",
        items: filters?.allow?.and?.tags ?? [],
        advanced: true,
      },
      {
        title: "Allowed (and) requirements",
        id: "allow-and-requirements",
        items: filters?.allow?.and?.requirements ?? [],
        advanced: true,
      },
      {
        title: !advancedSearch ? "Denied tags" : "Denied (or) tags",
        id: "deny-or-tags",
        items: filters?.deny?.or?.tags ?? [],
        advanced: false,
      },
      {
        title: !advancedSearch
          ? "Denied requirements"
          : "Denied (or) requirements",
        id: "deny-or-requirements",
        items: filters?.deny?.or?.requirements ?? [],
        advanced: false,
      },
      {
        title: "Denied (and) tags",
        id: "deny-and-tags",
        items: filters?.deny?.and?.tags ?? [],
        advanced: true,
      },
      {
        title: "Denied (and) requirements",
        id: "deny-and-requirements",
        items: filters?.deny?.and?.requirements ?? [],
        advanced: true,
      },
    ];

    return (
      <NavbarItem
        className={`py-2 w-full grid grid-flow-row ${advancedSearch ? "grid-rows-8 md:grid-rows-4 md:grid-cols-2" : "grid-rows-4 md:grid-rows-2 md:grid-cols-2"} grid-cols-1 md:grid-flow-col`}
      >
        {grid
          .filter(({ advanced }) => !advanced || advanced === advancedSearch)
          .map(({ id, items, title }) => {
            const bg = id.startsWith("allow")
              ? "bg-success-50"
              : "bg-danger-50";

            return (
              <div key={id} className="flex flex-col gap-0.5 pl-2 w-full">
                <h3 className="text-small text-default-400">{title}:</h3>
                <ScrollShadow
                  orientation="horizontal"
                  className="max-w-[80vw] md:max-w-screen-sm 2xl:max-w-[56rem] w-full"
                >
                  <div
                    className={`flex flex-row overflow-x-auto gap-2 w-full bg-opacity-60 p-1.5 rounded-full min-h-9 min-w-max !transition-all !duration-1000 ${bg}`}
                  >
                    {items.map((item) => {
                      const text =
                        "type" in item
                          ? readTag(item.type, item.id)
                          : readRequirement(item.category, item.id);

                      return (
                        <Chip
                          key={item.id}
                          color="default"
                          size="sm"
                          variant="faded"
                        >
                          {text?.i18n[LANGUAGE] ?? item.id}
                        </Chip>
                      );
                    })}
                  </div>
                </ScrollShadow>
              </div>
            );
          })}
      </NavbarItem>
    );
  }, [advancedSearch, filters]);

  useEffect(() => {
    if (cancelReq.current) abort.current.abort("New request started.");
    wretch("/study/questions/search")
      .addon(abortAddon())
      .signal(abort.current)
      .post({ page: selectedPage, count: pageCount, filters })
      .json(
        (json: SafeParseReturnType<ListQuestionProps, ListQuestionsResult>) => {
          if (json.success) {
            setCurrPage([1, json.data.final_page]);
            setQuestions(json.data.results);
            cancelReq.current = false;
          } else throw json.error;
        },
      )
      .catch(console.error);
  }, [pageCount, selectedPage, filters]);

  const currQuestions = useRef(questions);
  currQuestions.current = questions;
  const [placeholder, setPlaceholder] = useState("No alojamento de uma...");

  useLayoutEffect(() => {
    const i = setInterval(() => {
      if (!currQuestions.current)
        return setPlaceholder("No alojamento de uma...");
      const text = currQuestions.current[
        Math.round(performance.now() * Math.random()) %
          currQuestions.current.length
      ]?.text
        .split(" ", 5)
        .slice(0, 4)
        .join(" ");
      setPlaceholder(`${text}...`);
    }, 1000);
  }, []);

  return (
    <div className="relative h-full min-h-[90vh] flex flex-col items-center">
      <Navbar
        classNames={{
          base: "w-5/6 max-w-full md:max-w-[48rem] lg:max-w-[56rem] xl:max-w-[64rem] 2xl:max-w-[80rem] mx-auto bg-transparent backdrop-blur-sm fixed !translate-y-20 data-[hidden]:!translate-y-4 transition-transform select-none *:!transition-all *:!duration-1000 !transition-all !duration-1000",
          wrapper:
            "!bg-default-50 !bg-opacity-70 rounded-2xl max-w-full h-fit px-2 py-2 items-start",
        }}
        shouldHideOnScroll
      >
        <NavbarContent justify="start" className="grow w-full">
          <Accordion>
            <AccordionItem
              title={
                <h3 className="text-medium font-semibold">
                  Filtros
                  <Chip
                    size="sm"
                    variant="shadow"
                    classNames={{
                      base: "ml-3 bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30",
                      content:
                        "drop-shadow shadow-black text-white font-semibold",
                    }}
                  >
                    EM BREVE
                  </Chip>
                </h3>
              }
              textValue="Filtros"
              classNames={{
                trigger: "py-1",
              }}
              isDisabled
            >
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    size="sm"
                    label="Pesquisa"
                    labelPlacement="outside-left"
                    placeholder={placeholder}
                    className="grow max-md:hidden"
                    classNames={{
                      mainWrapper: "w-full",
                    }}
                    type="search"
                    isClearable
                    isDisabled
                  />
                  <Dropdown name="Tags">
                    <List
                      sections={Object.entries(tags).map(([id, options]) => ({
                        id,
                        ...options,
                      }))}
                      advancedSearch={advancedSearch}
                      dispatch={dispatchFilters}
                      type="tags"
                    />
                  </Dropdown>
                  <Dropdown name="Requisitos">
                    <List
                      sections={Object.entries(requirements)
                        .map(([id, options]) => {
                          const i18n = readTag("category", id)?.i18n;
                          return i18n ? { id, i18n, options } : null;
                        })
                        .filter((el) => el != null)}
                      advancedSearch={advancedSearch}
                      dispatch={dispatchFilters}
                      type="requirements"
                    />
                  </Dropdown>
                  <Checkbox
                    size="sm"
                    className="break-words whitespace-break-spaces"
                    aria-label="Pesquisa avançada"
                    isSelected={advancedSearch}
                    onValueChange={setAdvancedSearch}
                  >
                    Pesquisa Avançada
                  </Checkbox>
                </div>
                {filters_grid}
              </div>
            </AccordionItem>
          </Accordion>
        </NavbarContent>
      </Navbar>
      <ScrollShadow className="h-full min-h-96 pt-14 pb-24 w-full sm:max-w-[48rem] 2xl:max-w-[64rem] flex flex-col items-center transition-all">
        <QuestionsList
          items={questions}
          and={filters?.allow?.and}
          or={filters?.allow?.or}
          language={LANGUAGE}
        />
      </ScrollShadow>
      <Navbar
        classNames={{
          base: "mx-auto bg-transparent backdrop-blur-sm fixed select-none top-auto bottom-4 w-max h-max",
          wrapper:
            "!bg-default-100 !bg-opacity-70 dark:bg-opacity-70 rounded-2xl max-w-full",
        }}
      >
        <NavbarContent justify="center">
          <NavbarItem>
            <Skeleton isLoaded={currPage !== null && finalPage !== null}>
              <Pagination
                page={currPage ?? 1}
                total={finalPage ?? 10}
                onChange={(page) => {
                  setSelectedPage(page);
                  setQuestions(null);
                }}
                aria-label="Paginação"
                isDisabled={finalPage === null}
              />
            </Skeleton>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
