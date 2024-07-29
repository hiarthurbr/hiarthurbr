import four_letter_words from "@assets/4-letter-words.json";
import five_letter_words from "@assets/5-letter-words.json";
import six_letter_words from "@assets/6-letter-words.json";
import { shuffle_array } from "@lib/shuffle";

export function gen_words() {
  const words = {
    4: shuffle_array(Object.keys(four_letter_words)),
    5: shuffle_array(Object.keys(five_letter_words)),
    6: shuffle_array(Object.keys(six_letter_words)),
  };
  const selected_words = {
    4: {
      1: [words[4].pop()!],
      2: [words[4].pop()!, words[4].pop()!],
      3: [words[4].pop()!, words[4].pop()!, words[4].pop()!],
      4: [words[4].pop()!, words[4].pop()!, words[4].pop()!, words[4].pop()!],
    },
    5: {
      1: [words[5].pop()!],
      2: [words[5].pop()!, words[5].pop()!],
      3: [words[5].pop()!, words[5].pop()!, words[5].pop()!],
      4: [words[5].pop()!, words[5].pop()!, words[5].pop()!, words[5].pop()!],
    },
    6: {
      1: [words[6].pop()!],
      2: [words[6].pop()!, words[6].pop()!],
      3: [words[6].pop()!, words[6].pop()!, words[6].pop()!],
      4: [words[6].pop()!, words[6].pop()!, words[6].pop()!, words[6].pop()!],
    },
  } as const;

  return selected_words;
}
