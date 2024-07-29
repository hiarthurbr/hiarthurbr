import { map } from "./const";

export enum LetterStatus {
  UNTESTED = 0,
  WRONG_LETTER = 1,
  RIGHT_WORD = 2,
  RIGHT_POSITION = 3,
}

export type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export interface Status {
  grid: [string, LetterStatus, ...LetterStatus[]][][];
  round_num: number;
  won: NonEmptyArray<[boolean, number]>;
  error: WordError | null;
  available_letters: Array<Record<Letter, LetterStatus>>;
  readonly available_words: Readonly<Record<string, string>>;
  readonly final_word: Readonly<NonEmptyArray<string>>;
  readonly WORD_LENGTH: Readonly<number>;
  MAX_TRIES: number;
}

export type NonEmptyArray<T> = [T, ...T[]];

export interface TermoProps<T extends string> {
  readonly max_tries: Readonly<Record<T, number>>;
  readonly default_difficulty: Readonly<T>;
  readonly final_word: Readonly<NonEmptyArray<string>>;
  readonly available_words: Readonly<Record<string, string>>;
  readonly layout: Readonly<NonEmptyArray<NonEmptyArray<null>>>;
}

export enum WordError {
  INVALID_WORD_LENGTH = 0,
  INVALID_WORD = 1,
  INSTANCE = 2,
}

export function isError(e: unknown): e is WordError {
  return (
    typeof e === typeof WordError.INSTANCE &&
    (e as WordError) < WordError.INSTANCE
  );
}

export type TermoMap = typeof map;
