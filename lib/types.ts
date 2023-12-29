export const enum LetterStatus {
  UNTESTED,
  WRONG_LETTER,
  RIGHT_WORD,
  RIGHT_POSITION,
}

export type Letter = 'a' | 'b'
  | 'c' | 'd' | 'e' | 'f'
  | 'g' | 'h' | 'i' | 'j'
  | 'k' | 'l' | 'm' | 'n'
  | 'o' | 'p' | 'q' | 'r'
  | 's' | 't' | 'u' | 'v'
  | 'w' | 'x' | 'y' | 'z'

export interface Status {
  grid: [string, LetterStatus, ...LetterStatus[]][][];
  round_num: number;
  won: NonEmptyArray<[boolean, number]>;
  error: Error | null;
  available_letters: Array<Record<Letter, LetterStatus>>;
  readonly available_words: Readonly<Record<string, string>>;
  readonly final_word: Readonly<NonEmptyArray<string>>;
  readonly WORD_LENGTH: Readonly<number>;
  MAX_TRIES: number;
}

export type NonEmptyArray<T> = [T, ...T[]];

export interface TermoProps<T extends string> {
  readonly max_tries: Readonly<Record<T, number>>,
  readonly default_difficulty: Readonly<T>,
  readonly final_word: Readonly<NonEmptyArray<string>>,
  readonly available_words: Readonly<Record<string, string>>
  readonly layout: Readonly<NonEmptyArray<NonEmptyArray<null>>>
}

export const enum Error {
  INVALID_WORD_LENGTH,
  INVALID_WORD,
  INSTANCE,
}

export function isError(e: unknown): e is Error {
  return typeof e === typeof Error.INSTANCE && (e as Error) < Error.INSTANCE;
}