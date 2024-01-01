import Termo from "@components/Termo"
import available_words from "@assets/4-letter-words.json"

function shuffle_array(array: string[]) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default function TermoDuo(props: ReturnType<typeof getStaticProps>["props"]) {
  return <Termo
    available_words={available_words}
    default_difficulty="normal"
    final_word={props.final_word}
    layout={[
      [null, null],
    ]}
    max_tries={{
      easy: 10,
      normal: 7,
      hard: 5,
    }}
  />
}

export function getStaticProps() {
  const final_word = shuffle_array(Object.keys(available_words))
  return {
    props: {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      final_word: [final_word.pop()!, final_word.pop()!] satisfies [string, ...string[]],
    },
    revalidate: 43200,
  }
}