import Termo from "@components/Termo"
import available_words from "@assets/5-letter-words.json"

function shuffle_array(array: string[]) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default function TermoUno() {
  const final_word = shuffle_array(Object.keys(available_words))
  return <Termo
    available_words={available_words}
    default_difficulty="normal"
    final_word={[final_word.pop()!, final_word.pop()!, final_word.pop()!]}
    layout={[
      [null, null, null],
    ]}
    max_tries={{
      easy: 9,
      normal: 6,
      hard: 4,
    }}
  />
}