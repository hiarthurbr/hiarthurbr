"use client";
import four_letter_words from "@assets/4-letter-words.json";
import five_letter_words from "@assets/5-letter-words.json";
import six_letter_words from "@assets/6-letter-words.json";
import TermoLoading from "@components/TermoLoading";
import Termo from "@components/Termo";
import type { NonEmptyArray } from "@lib/types";
import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";

const layout_map = Object.freeze({
  4: {
    1: [[null]],
    2: [[null, null]],
    3: [[null, null], [null]],
    4: [
      [null, null],
      [null, null],
    ],
  },
  5: {
    1: [[null]],
    2: [[null, null]],
    3: [[null, null], [null]],
    4: [
      [null, null],
      [null, null],
    ],
  },
  6: {
    1: [[null]],
    2: [[null, null]],
    3: [[null, null], [null]],
    4: [
      [null, null],
      [null, null],
    ],
  },
} as const);

const max_tries_map = Object.freeze({
  4: {
    1: {
      easy: 8,
      normal: 6,
      hard: 4,
    },
    2: {
      easy: 10,
      normal: 7,
      hard: 5,
    },
    3: {
      easy: 11,
      normal: 8,
      hard: 6,
    },
    4: {
      easy: 13,
      normal: 9,
      hard: 6,
    },
  },
  5: {
    1: {
      easy: 8,
      normal: 6,
      hard: 4,
    },
    2: {
      easy: 10,
      normal: 7,
      hard: 5,
    },
    3: {
      easy: 11,
      normal: 8,
      hard: 6,
    },
    4: {
      easy: 13,
      normal: 9,
      hard: 6,
    },
  },
  6: {
    1: {
      easy: 8,
      normal: 6,
      hard: 4,
    },
    2: {
      easy: 10,
      normal: 7,
      hard: 5,
    },
    3: {
      easy: 11,
      normal: 8,
      hard: 6,
    },
    4: {
      easy: 13,
      normal: 9,
      hard: 6,
    },
  },
} as const);

const map = Object.freeze({
  word_length: {
    "4tro": 4,
    cinco: 5,
    sextou: 6,
  },
  grid_size: {
    uno: 1,
    duo: 2,
    trio: 3,
    quatro: 4,
  },
} as const);

const default_difficulty = "normal" as const;

type TermoMap = typeof map;

export default function TermoGridView({
  params,
}: {
  params: {
    word_length: keyof TermoMap["word_length"];
    grid_size: keyof TermoMap["grid_size"];
  };
}) {
  const [data, setData] = useState<null | Record<
    4 | 5 | 6,
    Record<1 | 2 | 3 | 4, [string, ...string[]]>
  >>(null);
  const word_length = map.word_length[params.word_length];
  const grid_size = map.grid_size[params.grid_size];
  if (word_length == null || grid_size == null) {
    return notFound();
  }
  const max_tries = max_tries_map[word_length][grid_size];
  const layout = layout_map[word_length][grid_size];

  const available_words = useMemo(() => {
    switch (word_length) {
      case 4:
        return four_letter_words;
      case 5:
        return five_letter_words;
      case 6:
        return six_letter_words;
    }
  }, [word_length]);

  useEffect(() => {
    const d = new Date();
    let revalidate =
      Math.floor(
        (new Date(d).setUTCHours(23, 59, 50, 0) - d.getTime()) / 1000,
      ) + 60;

    const wait_for_update =
      (d.getUTCHours() === 23 &&
        d.getUTCMinutes() === 59 &&
        d.getUTCSeconds() > 30) ||
      (d.getUTCHours() === 0 &&
        d.getUTCMinutes() === 0 &&
        d.getUTCSeconds() < 30);

    console.warn({ revalidate });
    if (wait_for_update) {
      revalidate = 60;
      console.warn(
        "Waiting for update, revalidating in 60 seconds and not caching.",
      );
    }

    fetch("/minigames/termo/words", {
      cache: wait_for_update ? "no-cache" : "force-cache",
      next: { revalidate },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (data == null) {
    return (
      <TermoLoading
        default_difficulty={default_difficulty}
        layout={
          layout as unknown as Readonly<NonEmptyArray<NonEmptyArray<null>>>
        }
        max_tries={structuredClone(max_tries)[default_difficulty]}
        word_length={word_length}
      />
    );
  }

  return (
    <Termo
      available_words={available_words}
      default_difficulty={default_difficulty}
      final_word={data[word_length][grid_size]}
      layout={layout as unknown as Readonly<NonEmptyArray<NonEmptyArray<null>>>}
      max_tries={max_tries}
    />
  );
}
