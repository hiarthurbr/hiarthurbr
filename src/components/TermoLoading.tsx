"use client";
import type { NonEmptyArray } from "@lib/types";
import { Skeleton, Spacer } from "@nextui-org/react";

type Difficulties = "easy" | "normal" | "hard";

export default function Termo({
  max_tries,
  layout,
  default_difficulty,
  word_length,
}: {
  max_tries: number;
  layout: Readonly<NonEmptyArray<NonEmptyArray<null>>>;
  default_difficulty: Difficulties;
  word_length: number;
}) {
  const row = Array(word_length)
    .fill(null)
    .map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <Skeleton key={i}>
        <Spacer x={14} y={14} />
      </Skeleton>
    ));

  const Grid = () => (
    <div
      className="grid grid-flow-row gap-1 *:rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${word_length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${max_tries}, minmax(0, 1fr))`,
      }}
    >
      {Array(max_tries)
        .fill(null)
        .map(() => row)}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-row items-center justify-center mb-8">
        <div className="flex flex-row gap-2 items-center bg-default-100 rounded-large p-1 select-none">
          <Skeleton className="rounded-lg">
            <p className="px-3 py-1 h-9 rounded-medium">Fácil</p>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <p className="px-3 py-1 h-9 rounded-medium">Normal</p>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <p className="px-3 py-1 h-9 rounded-medium">Dificil</p>
          </Skeleton>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {layout.map((row, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className="grid grid-flow-col grid-rows-1 w-full justify-center items-center gap-8"
            style={{
              gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
            }}
          >
            {Array(row.length)
              .fill(null)
              .map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Grid key={i} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
