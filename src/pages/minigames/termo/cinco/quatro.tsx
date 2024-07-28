import available_words from "@assets/5-letter-words.json";
import Termo from "@components/Termo";
import { shuffle_array } from "@lib/shuffle";

export default function TermoQuatro(
  props: ReturnType<typeof getStaticProps>["props"],
) {
  return (
    <Termo
      available_words={available_words}
      default_difficulty="normal"
      final_word={props.final_word}
      layout={[
        [null, null],
        [null, null],
      ]}
      max_tries={{
        easy: 13,
        normal: 9,
        hard: 6,
      }}
    />
  );
}

export function getStaticProps() {
  const final_word = shuffle_array(Object.keys(available_words));
  return {
    props: {
      final_word: [
        final_word.pop()!,
        final_word.pop()!,
        final_word.pop()!,
        final_word.pop()!,
      ] satisfies [string, ...string[]],
    },
    revalidate: 43200,
  };
}
