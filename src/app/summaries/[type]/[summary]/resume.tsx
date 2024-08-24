"use client";
import { Clipboard, Close, Exclamation, PaperClip } from "@components/svgs";
import type { Summary, SummaryIndex, SummaryLink } from "@global";
import axios from "@lib/axios";
import { WARN_DIALOG_KEY } from "@lib/const";
import copyToClipboard from "@lib/copyToClipboard";
import {
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type SummaryProps = {
  summary: Summary;
  children?: never;
  warn?: string;
};

export default function SummaryElement({
  summary: { chapters, origin, title },
  warn,
}: SummaryProps) {
  const [visible, setVisible] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedSuccessful, setCopiedSuccess] = useState<boolean | null>(null);
  const [isDialogOpen, setDialog] = useState<boolean>(false);
  const hasPadding = isDialogOpen;

  // biome-ignore lint/correctness/useExhaustiveDependencies: should update when resume changes
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace("#", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chapters]);

  useEffect(() => {
    if (sessionStorage.getItem(WARN_DIALOG_KEY) == null) {
      sessionStorage.setItem(WARN_DIALOG_KEY, warn == null ? "closed" : "open");
    }
    setDialog(
      warn != null && sessionStorage.getItem(WARN_DIALOG_KEY) === "open",
    );
  }, [warn]);

  useEffect(() => {
    if (copied) {
      const url = new URL(
        `${window.location.origin}${window.location.pathname}#${copied}`,
      );
      copyToClipboard(url.href).then(setCopiedSuccess);
      history.replaceState(null, "", url.href);
      setTimeout(() => {
        setCopied(null);
        setCopiedSuccess(null);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className="relative h-full">
      {isDialogOpen && warn != null && (
        <Navbar
          classNames={{
            base: "w-2/3 mx-auto max-w-[64rem] bg-transparent backdrop-blur-sm fixed !translate-y-20 data-[hidden]:!translate-y-4 transition-transform select-none",
            wrapper:
              "!bg-danger-300 bg-zinc-200 !bg-opacity-70 dark:bg-opacity-70 rounded-2xl max-w-full",
          }}
          shouldHideOnScroll
        >
          <NavbarBrand className="text-xl font-black flex-grow-0 text-danger-foreground">
            Atenção
          </NavbarBrand>
          <NavbarContent justify="start" className="grow w-full">
            <NavbarItem className="h-full py-2">
              <Divider orientation="vertical" />
            </NavbarItem>
            <NavbarItem className="font-semibold break-words whitespace-break-spaces w-full text-danger-foreground">
              {warn}
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end" className="!flex-grow-0">
            <NavbarItem>
              <Button
                color="danger"
                size="sm"
                startContent={<Close />}
                onClick={() => {
                  sessionStorage.setItem(WARN_DIALOG_KEY, "closed");
                  setDialog(false);
                }}
                isIconOnly
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )}
      <article className="prose dark:prose-invert select-none mx-auto py-8">
        <h1 className={"text-7xl text-center"}>{title}</h1>
        {chapters &&
          Object.entries(chapters).map(([chapter, paragraphs]) => {
            let id = chapter
              .toLowerCase()
              .replaceAll(" ", "-")
              .normalize("NFD")
              // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
              .replace(/[\u0300-\u036f]/g, "");
            while (id.includes("--")) id = id.replaceAll("--", "-");
            return (
              <div key={chapter}>
                {paragraphs === null ? (
                  <div
                    id={id}
                    className="pt-12 md:pb-8 flex justify-center max-md:flex-col max-md:items-center"
                  >
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <div
                      className="p-1 md:ml-12 px-4 border-4 rounded-xl border-transparent hover:border-black dark:hover:border-white"
                      onMouseEnter={() => setVisible(id)}
                      onMouseLeave={() => setVisible(null)}
                      onClick={() => setCopied(id)}
                    >
                      <span className="inline-block">
                        <h2 className="text-5xl max-h-fit m-0 p-0">
                          {chapter}
                        </h2>
                      </span>
                    </div>
                    <span
                      className={`pl-4 inline-block translate-y-3 ${
                        visible === id
                          ? "stroke-black dark:stroke-white"
                          : "stroke-transparent"
                      }`}
                    >
                      {copied === id && copiedSuccessful !== null ? (
                        copiedSuccessful ? (
                          <Clipboard className="h-10 stroke-lime-500" />
                        ) : (
                          <Exclamation className="h-10 stroke-red-600" />
                        )
                      ) : (
                        <PaperClip className="h-10" />
                      )}
                    </span>
                  </div>
                ) : (
                  <section>
                    <div
                      id={id}
                      className="max-md:pt-6 md:pt-12 md:pb-2 flex justify-center max-md:flex-col max-md:items-center"
                    >
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className="p-1 md:ml-12 px-4 border-2 rounded-xl border-transparent hover:border-black dark:hover:border-white"
                        onMouseEnter={() => setVisible(id)}
                        onMouseLeave={() => setVisible(null)}
                        onClick={() => setCopied(id)}
                      >
                        <span className="inline-block">
                          <h3 className="text-3xl max-h-fit m-0 p-0">
                            {chapter}
                          </h3>
                        </span>
                      </div>
                      <span
                        className={`pl-4 inline-block translate-y-2 ${
                          visible === id
                            ? "stroke-black dark:stroke-white"
                            : "stroke-transparent"
                        }`}
                      >
                        {copied === id && copiedSuccessful !== null ? (
                          copiedSuccessful ? (
                            <Clipboard className="h-8 stroke-lime-500" />
                          ) : (
                            <Exclamation className="h-8 stroke-red-600" />
                          )
                        ) : (
                          <PaperClip className="h-8" />
                        )}
                      </span>
                    </div>
                    {paragraphs.map((paragraph) => (
                      <p className="text-xl font-semibold" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </section>
                )}
              </div>
            );
          })}
      </article>
    </div>
  );
}
