"use client"
import { useLayoutEffect, useReducer, useRef, useState } from "react";
import { Tabs, Tab, Link } from "@nextui-org/react";
import confetti, { create } from "canvas-confetti"
import styles from "@styles/termo.module.css";
import {
  type Status, type Letter, type TermoProps, type NonEmptyArray,
  LetterStatus, Error as IError, isError
} from "@lib/types"
import LetterKey from "@components/letter"
import { nullptr } from "@lib/null";
import { Info as InfoIcon } from "./svgs";

type Payload = {
  attempt: string,
  gridIndex: number,
} | { changeDifficultyTo: Difficulties }

type Difficulties = "easy" | "normal" | "hard"

function genGrid(max_tries: number, word_length: number, grids_count: number): Status['grid'] {
  return Array(max_tries)
    .fill(Array(word_length)
      .fill([
        '',
        ...Array<LetterStatus>(grids_count)
          .fill(LetterStatus.UNTESTED) as NonEmptyArray<LetterStatus>
      ])
    )
}

export default function Termo({
  max_tries, available_words,
  final_word, layout,
  default_difficulty: difficulty_selected,
}: TermoProps<Difficulties>) {
  const [difficulty, setDifficulty] = useState<Difficulties>(difficulty_selected)

  function GridReducer(s: string, payload: Payload | null) {
    let status: Status = JSON.parse(s)
    if (status.round_num < status.grid.length) {
      const attempt = executeTry(
        status,
        payload,
      );
      if (isError(attempt)) {
        status.error = attempt;
      }
      else status = attempt;
    }

    return JSON.stringify(status)
  }

  function executeTry(_status: Status, payload: Payload | null): Status | IError {
    if (!payload) {
      _status.error = null;
      return _status;
    }
    if ("changeDifficultyTo" in payload) {
      _status.MAX_TRIES = max_tries[payload.changeDifficultyTo];
      _status.grid = genGrid(
        max_tries[payload.changeDifficultyTo],
        final_word[0].length,
        final_word.length
      );
      return _status;
    }
    const w_try = payload.attempt.toUpperCase().split('')
    if (w_try.length !== _status.final_word[0].length) {
      return IError.INVALID_WORD_LENGTH;
    }
    const _word_with_accent: string | undefined = _status.available_words[payload.attempt];
    if (typeof _word_with_accent === "undefined") {
      return IError.INVALID_WORD;
    }
    const word_with_accent = _word_with_accent.split('');
    const statuses: [string, LetterStatus, ...LetterStatus[]][] = []
    const gridLength = _status.final_word.length

    for (const res of w_try) 
      statuses.push([
        res,
        ...Array<LetterStatus>(gridLength)
          .fill(LetterStatus.UNTESTED) as NonEmptyArray<LetterStatus>
      ])

    for (const [gridIndex, res] of _status.final_word.entries()) {
      const w_res = res.toUpperCase().split('');
      const letters = new Map<string, number>()
      for (let i = 0; i < _status.WORD_LENGTH; i++) {
        const letter = w_res[i];
        const n = letters.get(letter);
        if (typeof n === "undefined")
          letters.set(letter, 1);
        else letters.set(letter, n + 1);
      }

      for (let i = 0; i < _status.WORD_LENGTH; i++) {
        const letter = w_try[i];
        let status = LetterStatus.UNTESTED;
        const n = letters.get(letter);

        if (typeof n !== "undefined" && w_try[i] === w_res[i]) {
          status = LetterStatus.RIGHT_POSITION;
          letters.set(letter, n - 1);
        }

        const l = letter.toLowerCase() as Letter;
        const lv = _status.available_letters[gridIndex][l]
        _status.available_letters[gridIndex][l] = lv < status ? status : lv;
        statuses[i][gridIndex + 1] = status
      }

      for (const [i, v] of statuses.entries()) {
        if (v[gridIndex + 1] !== LetterStatus.UNTESTED) continue;
        const n = letters.get(v[0]);
        let status = LetterStatus.WRONG_LETTER;
        if (typeof n !== "undefined" && n > 0) {
          status = LetterStatus.RIGHT_WORD;
          letters.set(v[0], n - 1);
        }
        statuses[i][gridIndex + 1] = status;
      }
    }

    for (const [i, l] of word_with_accent.entries())
      statuses[i][0] = l;

    _status.grid[_status.round_num] = statuses;

    for (let i = 1; i <= _status.final_word.length; i++) {
      let won = true;
      for (let j = 0; j < _status.final_word[0].length; j++) {
        if (statuses[j][i] !== LetterStatus.RIGHT_POSITION) {
          won = false;
          break;
        }
      }
      if (won)
        _status.won[i - 1] = [true, _status.round_num];
    }

    _status.round_num++;
    return _status;
  }

  const [data, gridDispatch] = useReducer(GridReducer, JSON.stringify({
    grid: genGrid(max_tries[difficulty], final_word[0].length, final_word.length),
    WORD_LENGTH: final_word[0].length,
    MAX_TRIES: max_tries[difficulty_selected],
    final_word,
    available_words,
    round_num: 0,
    won: Array<[boolean, number]>(final_word.length)
      .fill([false, -1]) as NonEmptyArray<[boolean, number]>,
    available_letters: Array<Record<Letter, LetterStatus>>(final_word.length).fill({
      a: LetterStatus.UNTESTED, b: LetterStatus.UNTESTED, c: LetterStatus.UNTESTED,
      d: LetterStatus.UNTESTED, e: LetterStatus.UNTESTED, f: LetterStatus.UNTESTED,
      g: LetterStatus.UNTESTED, h: LetterStatus.UNTESTED, i: LetterStatus.UNTESTED,
      j: LetterStatus.UNTESTED, k: LetterStatus.UNTESTED, l: LetterStatus.UNTESTED,
      m: LetterStatus.UNTESTED, n: LetterStatus.UNTESTED, o: LetterStatus.UNTESTED,
      p: LetterStatus.UNTESTED, q: LetterStatus.UNTESTED, r: LetterStatus.UNTESTED,
      s: LetterStatus.UNTESTED, t: LetterStatus.UNTESTED, u: LetterStatus.UNTESTED,
      v: LetterStatus.UNTESTED, w: LetterStatus.UNTESTED, x: LetterStatus.UNTESTED,
      y: LetterStatus.UNTESTED, z: LetterStatus.UNTESTED,
    }),
    error: null
  } satisfies Status) as string)

  const globalStatus: Status = JSON.parse(data)
  const canvasRefs: React.MutableRefObject<HTMLCanvasElement & { confetti?: ReturnType<typeof create> }>[] = (() => {
    const a = []
    for (let i = 0; i < final_word.length; i++) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      a.push(useRef<HTMLCanvasElement>(nullptr()))
    }
    return a;
  })();

  const gridLayout = (() => {
    let lastLength = 0;
    return layout.map(i => {
      const length = i.length;
      const _lastLength = lastLength;
      lastLength += length
      return final_word.slice(_lastLength, lastLength)
    })
  })();

  const gotAllRight = globalStatus.won.filter(g => g[0] === false).length === 0;
  const gameFinished = globalStatus.round_num >= globalStatus.MAX_TRIES || gotAllRight;
  const gameFinishedWithSuccess = gameFinished && gotAllRight;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    const base_timer = 300;
    if (globalStatus.error !== null) {
      switch (globalStatus.error) {
        case IError.INVALID_WORD: {
          alert("Palavra inválida")
          break;
        }
        case IError.INVALID_WORD_LENGTH: {
          alert("Palavra incompleta")
          break;
        }
      }
      gridDispatch(null)
    }
    else {
      console.log(globalStatus)
      document.querySelector<HTMLInputElement>(`[item-input=INPUT-${globalStatus.round_num}-0]`)?.focus()
      if (globalStatus.round_num > 0) {
        for (let i = 0; i < globalStatus.WORD_LENGTH; i++)
          setTimeout(() => {
            for (const el of document.querySelectorAll(`[item-card=CARD-${globalStatus.round_num - 1}-${i}]`))
              el.classList.add(styles.flip);
          }, base_timer * (i + 1))
      }
    }

    for (const [i, c] of canvasRefs.entries()) {
      (c.current).confetti = c.current.confetti || create(c.current, { resize: false })
      if (globalStatus.won[i][0] && globalStatus.won[i][1] === globalStatus.round_num - 1) {
        setTimeout(() => {
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          c.current.confetti!({
            spread: 100,
            origin: { y: 1 },
            gravity: 0.5,
            particleCount: 200,
            startVelocity: 25,
            ticks: 1000,
          });
        }, (globalStatus.WORD_LENGTH + 1) * base_timer)
      }
    }

    if (gameFinishedWithSuccess) {
      for (let i = 1; i < 5; i++) {
        setTimeout(() => {
          confetti({
            startVelocity: 10,
            spread: 360,
            particleCount: 1000,
            ticks: 1000,
            gravity: 2,
            angle: 180,
            decay: 0.999999,
            scalar: 1.2,
          })
        }, i * base_timer * 5)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalStatus])

  function changeDifficulty(to: Difficulties): void {
    if (to !== difficulty && globalStatus.round_num === 0) {
      setDifficulty(to)
      gridDispatch({ changeDifficultyTo: to })
    }
  }

  return <div className="flex flex-col items-center">
    <div className="w-screen grid grid-flow-row grid-cols-3 justify-items-center">
      <div />
      <Tabs
        isDisabled={globalStatus.round_num > 0}
        size="lg"
        selectedKey={difficulty}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onSelectionChange={changeDifficulty as any}
      >
        <Tab key="easy" title="Fácil" />
        <Tab key="normal" title="Normal" />
        <Tab key="hard" title="Difícil" />
      </Tabs>
      <div className="justify-self-end mr-8">
        <Info />
      </div>
    </div>
    <div>
      {
        gridLayout.map(row => {
          const rowLength = row.length;
          return <div
            key={row.toString()}
            className={"grid gap-12 my-12"}
            style={{
              gridTemplateColumns: `repeat(${rowLength}, 1fr)`
            }}
          >
            {
              row.map(word => {
                const gridIndex = globalStatus.final_word.indexOf(word)
                return (<div
                  key={word}
                  className="grid grid-cols-1 gap-1 select-none max-w-fit relative"
                >
                  {globalStatus.grid
                    .map((row, i) => {
                      const disabled = i !== globalStatus.round_num;
                      // console.log(globalStatus.won[gridIndex], globalStatus.round_num, i)

                      return <form
                        key={i.toString()}
                        className={"grid gap-1"}
                        style={{
                          gridTemplateColumns: `repeat(${globalStatus.WORD_LENGTH}, 1fr)`
                        }}
                      >
                        {
                          row.map((el, l) => {
                            let status = "dark:bg-zinc-800 bg-zinc-200";
                            const untested = "dark:bg-zinc-800 bg-zinc-200"
                            const right_position = "dark:bg-lime-600 bg-lime-500 text-white"
                            const right_word = "dark:bg-yellow-500 bg-yellow-400 text-white"
                            const wrong_letter = "dark:bg-zinc-700 bg-zinc-400 text-white"
                            const enabled = "dark:border-cyan-800 border-cyan-200 focus-within:border-cyan-500 border-2"
                            switch (el[gridIndex + 1]) {
                              case LetterStatus.UNTESTED: {
                                status = untested;
                                if (!disabled)
                                  status += ` ${enabled}`;
                                break
                              }
                              case LetterStatus.RIGHT_POSITION: {
                                status = right_position;
                                break
                              }
                              case LetterStatus.RIGHT_WORD: {
                                status = right_word;
                                break
                              }
                              case LetterStatus.WRONG_LETTER: {
                                status = wrong_letter;
                                break
                              }
                            }

                            function next<P extends Element>(loopOver = true) {
                              if (l === globalStatus.WORD_LENGTH - 1 && loopOver)
                                return document.querySelector<P>(`[item-input=INPUT-${i}-0][item-grid-index=GRID-${gridIndex}]`)
                              return document.querySelector<P>(`[item-input=INPUT-${i}-${l + 1}][item-grid-index=GRID-${gridIndex}]`)
                            }

                            function previous<P extends Element>(loopOver = true) {
                              if (l === 0 && loopOver)
                                return document.querySelector<P>(`[item-input=INPUT-${globalStatus.WORD_LENGTH - 1}][item-grid-index=GRID-${gridIndex}]`)
                              return document.querySelector<P>(`[item-input=INPUT-${i}-${l - 1}][item-grid-index=GRID-${gridIndex}]`)
                            }

                            const getWord = () => {
                              let word = "";
                              for (let j = 0; j < globalStatus.WORD_LENGTH; j++)
                                word += (document.querySelector<HTMLInputElement>(`[item-input=INPUT-${i}-${j}]`))
                                  ?.value.trim()
                              return word
                            }

                            let wasEmpty = true;

                            return <div
                              key={`${i}-${l}`}
                              className={`${styles.letter}`}
                              item-card={(globalStatus.won[gridIndex][0] && i > globalStatus.won[gridIndex][1]) ? undefined : `CARD-${i}-${l}`}
                            >
                              <div className={styles.letterInner}>
                                <div className={styles.letterFront}>
                                  <input
                                    type="text"
                                    readOnly={gameFinished || disabled || globalStatus.won[gridIndex][0]}
                                    maxLength={2}
                                    item-input={(globalStatus.won[gridIndex][0] && i > globalStatus.won[gridIndex][1]) ? undefined : `INPUT-${i}-${l}`}
                                    item-grid-index={(globalStatus.won[gridIndex][0] && i > globalStatus.won[gridIndex][1]) ? undefined : `GRID-${gridIndex}`}
                                    pattern="[^0-9]*"
                                    onInput={e => {
                                      const input = e.currentTarget.value.replace(/[^a-zA-Z]+/g, "");
                                      if (input.length > 1)
                                        for (const el of document.querySelectorAll<HTMLInputElement>(`[item-input=INPUT-${i}-${l}]`))
                                          el.value = input[1];
                                      else
                                        for (const el of document.querySelectorAll<HTMLInputElement>(`[item-input=INPUT-${i}-${l}]`))
                                          el.value = input;
                                      if (wasEmpty || input !== e.currentTarget.value)
                                        next<HTMLInputElement>()?.focus()
                                      wasEmpty = false;
                                    }}
                                    onBeforeInput={e => {
                                      if (e.currentTarget.value.length === 0)
                                        wasEmpty = true;
                                      else wasEmpty = false;
                                    }}
                                    onKeyDown={e => {
                                      if (!disabled) {
                                        const key = e.code.toLowerCase();
                                        const allowedKeys = [
                                          "backspace",
                                          "delete",
                                          "space",
                                          "enter",
                                          "tab",
                                        ]
                                        if (key.length > 3
                                          && !key.startsWith("key")
                                          && !key.startsWith("arrow")
                                          && !allowedKeys.includes(key)
                                        ) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          return;
                                        };
                                        switch (key) {
                                          case "backspace": {
                                            if (e.currentTarget.value.length === 0) {
                                              const p = previous<HTMLInputElement>(false);
                                              p?.focus();
                                              for (const el of document.querySelectorAll<HTMLInputElement>(`[item-input=${p?.getAttribute("item-input")}]`))
                                                el.value = "";
                                            }
                                            for (const el of document.querySelectorAll<HTMLInputElement>(`[item-input=INPUT-${i}-${l}]`))
                                              el.value = "";
                                            break;
                                          }
                                          case "delete": {
                                            if (e.currentTarget.value.length === 0) {
                                              const n = next<HTMLInputElement>(false);
                                              n?.focus();
                                              for (const el of document.querySelectorAll<HTMLInputElement>(`[item-input=${n?.getAttribute("item-input")}]`))
                                                el.value = "";
                                            }
                                            for (const el of document.querySelectorAll<HTMLInputElement>(`[item-input=INPUT-${i}-${l}]`))
                                              el.value = "";
                                            break;
                                          }
                                          case "space":
                                          case "arrowright": {
                                            next<HTMLInputElement>(false)?.focus();
                                            break;
                                          }
                                          case "arrowleft": {
                                            previous<HTMLInputElement>(false)?.focus();
                                            break;
                                          }
                                          case "enter": {
                                            gridDispatch({ attempt: getWord(), gridIndex })
                                            break;
                                          }
                                        }
                                      }
                                    }}
                                    className={
                                      `w-full h-full read-only:border-0 caret-transparent text-center dark:text-white text-black font-extrabolt text-3xl uppercase rounded-lg ${untested}`
                                      + (!disabled ? ` ${enabled}` : "")
                                    }
                                  />
                                </div>
                                <div className={`${status} w-full h-full rounded-lg ${styles.letterBack}`}>
                                  <span className="text-center font-extrabolt text-3xl uppercase">{el[0]}</span>
                                </div>
                              </div>
                            </div>
                          })
                        }
                      </form>
                    })
                  }
                  <canvas
                    className={`absolute top-0 left-0 h-full w-full${globalStatus.won[gridIndex][0] ? "" : " hidden"}`}
                    ref={canvasRefs[gridIndex]}
                  />
                </div>)
              })
            }
          </div>
        })
      }
    </div>
    <div className="flex flex-col gap-2 mt-8 items-center justify-center">
      <div className="grid grid-rows-1 grid-cols-10 gap-2 max-w-fit">
        {
          (['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] as Letter[])
            .map(key => <LetterKey key={key} keyValue={key} available_letters={globalStatus.available_letters}
            />)
        }

      </div>
      <div className="grid grid-rows-1 grid-cols-9 gap-2 max-w-fit">
        {
          (['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] as Letter[])
            .map(key => <LetterKey key={key} keyValue={key} available_letters={globalStatus.available_letters}
            />)
        }
      </div>
      <div className="grid grid-rows-1 grid-cols-7 gap-2 max-w-fit">
        {
          (['z', 'x', 'c', 'v', 'b', 'n', 'm'] as Letter[])
            .map(key => <LetterKey key={key} keyValue={key} available_letters={globalStatus.available_letters}
            />)
        }
      </div>
    </div>
  </div>
}

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Exclamation } from "./svgs";

const Info = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} isIconOnly><InfoIcon className="w-8 h-8 p-1 dark:fill-white fill-black" /></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Informações</ModalHeader>
              <ModalBody>
                <p>
                  Esta versão do Termo foi criada por mim, Arthur Bufalo, e foi grandemente inspirada pelo trabalho do{' '}
                  <Link isExternal showAnchorIcon href="https://fserb.com/">Fernando Seboncini</Link> e seu jogo{' '}
                  <Link isExternal showAnchorIcon href="https://term.ooo/">Termooo</Link>.<br />
                  Apesar de ser bem similar, minha intenção não é lucrar em cima deste projeto, nem defamar o criador original.<br />
                  Este projeto foi criado com intenções de aprendizado e diversão, e espero que você se divirta jogando tanto quanto eu me diverti criando!
                </p>
                <p>
                  As palavras usadas nesse modelo foram retiradas das seguintes fontes:
                  <ul className="list-disc list-insidelist-disc list-inside ml-2">
                    <li>
                      <Link isExternal showAnchorIcon href="https://www.ime.usp.br/~pf/dicios/">IME da USP</Link>, disponivel na licença <Link isExternal showAnchorIcon href="https://www.gnu.org/licenses/old-licenses/gpl-1.0.html">GPL</Link>
                    </li>
                    <li>
                      <Link isExternal showAnchorIcon href="https://github.com/fserb/pt-br">Léxico PT-BR</Link>, disponível na licença <Link isExternal showAnchorIcon href="https://raw.githubusercontent.com/fserb/pt-br/master/LICENSE">MIT</Link>
                    </li>
                  </ul>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose} className="font-bold">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}