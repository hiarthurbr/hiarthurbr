"use client"
import { type Status, type Letter as Letters, LetterStatus } from "@lib/types";
import { useRef } from "react";
import { nullptr } from "@lib/null";

export default function Letter({ keyValue: key, available_letters }: { keyValue: Letters, available_letters: Status['available_letters'] }) {
  const letterStatus = "text-zinc-700 dark:text-zinc-200".split(" ");
  const span = useRef<HTMLSpanElement>(nullptr())

  return (<div className="w-12 h-12 relative">
    <div className="absolute top-0 left-0 w-full h-full z-20">
      <span className={`w-full h-full text-2xl font-bold flex items-center justify-center uppercase rounded-lg ${letterStatus.join(" ")}`} ref={span}>{key}</span>
    </div>
    <div className={"absolute top-0 left-0 grid w-full h-full rounded-lg z-10"}>
      {
        available_letters.map((grid, i) => {
          let status: string;
          if (grid[key] !== LetterStatus.UNTESTED) {
            letterStatus.forEach(c => span.current.classList.remove(c));
            "text-zinc-100 dark:text-zinc-200".split(" ")
              .forEach(c => span.current.classList.add(c));
          }
          console.log(key, grid[key])
          switch (grid[key]) {
            case LetterStatus.UNTESTED: {
              status = "dark:bg-zinc-700 bg-zinc-100";
              break;
            }
            case LetterStatus.WRONG_LETTER: {
              status = "dark:bg-zinc-800 bg-zinc-200";
              break;
            }
            case LetterStatus.RIGHT_WORD: {
              status = "dark:bg-yellow-500 bg-yellow-400";
              break;
            }
            case LetterStatus.RIGHT_POSITION: {
              status = "dark:bg-lime-600 bg-lime-500";
              break;
            }
          }
          return <div key={i} className={`h-full w-full ${status}`} />
        })
      }
    </div>
  </div>)
}