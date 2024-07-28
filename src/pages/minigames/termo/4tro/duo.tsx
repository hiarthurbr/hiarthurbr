import available_words from "@assets/4-letter-words.json";
import Termo from "@components/Termo";
import { shuffle_array } from "@lib/shuffle";

export default function TermoDuo(
  props: ReturnType<typeof getStaticProps>["props"],
) {
  return (
    <Termo
      available_words={available_words}
      default_difficulty="normal"
      final_word={props.final_word}
      layout={[[null, null]]}
      max_tries={{
        easy: 10,
        normal: 7,
        hard: 5,
      }}
    />
  );
}

export function getStaticProps() {
  const final_word = shuffle_array(Object.keys(available_words));
  return {
    props: {
      final_word: [final_word.pop()!, final_word.pop()!] satisfies [
        string,
        ...string[],
      ],
    },
    revalidate: 43200,
  };
}
