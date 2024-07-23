import { Gaming } from "@components/svgs";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
// import { GeistMono } from 'geist/font/mono';

const now = Date.now();
const BIRTH = new Date(2004, 11, 28).getTime();

const calcYears = (startDate: number) => {
  const diffTime = Math.abs(now - startDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(diffYears);
};

const PROJECTS = [
  {
    title: "Crystal",
    description:
      "Minecraft frontend clone that faithfully recreates the game's visuals",
    image: "/Crystal.png",
    link: "https://github.com/hiarthurbr/crystal",
    delay: "delay-100",
  },
  {
    title: "Redstone",
    description: "In spec implementation of the Minecraft protocol ",
    image: "/RedstoneSignal.png",
    link: "https://github.com/hiarthurbr/redstone",
    delay: "delay-200",
  },
  {
    title: "CommandBlock",
    description:
      "Minecraft backend implementation in Rust. Multithreaded. Native. Fast.",
    image: "/CommandBlock.png",
    link: "https://github.com/hiarthurbr/commandblock",
    delay: "delay-300",
  },
  {
    title: "Hermes",
    description:
      "Open-source, community driven bus routing/mapping application",
    image: null,
    link: "https://github.com/cyrusium/hermes",
    delay: "delay-400",
  },
  {
    title: "CrabSlumber",
    description:
      "A server management tool that keeps an eye on your Minecraft server during its well-deserved rest.",
    image: null,
    link: "https://github.com/hiarthurbr/crabslumber",
    delay: "delay-500",
  },
  {
    title: "McMngr",
    description: "The ultimate remote minecraft server management tool",
    image: null,
    link: "https://github.com/hiarthurbr/mcmngr",
    delay: "delay-600",
  },
  {
    title: "HiArthurBR",
    description: "This very website!",
    image: null,
    link: "https://github.com/hiarthurbr/hiarthurbr",
    delay: "delay-700",
  },
] as const;

enum Keys {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  A = "KeyA",
  B = "KeyB",
}

const konami_code = [
  Keys.UP,
  Keys.UP,
  Keys.DOWN,
  Keys.DOWN,
  Keys.LEFT,
  Keys.RIGHT,
  Keys.LEFT,
  Keys.RIGHT,
  Keys.B,
  Keys.A,
];
const konami_code_serial = konami_code.join("");

declare global {
  interface Window {
    konami: boolean;
  }
}

const Index = () => {
  const router = useRouter();
  const [{ konami, keys }, dispatch_key] = useReducer(
    (state: { konami: boolean; keys: Keys[] }, action: { type: Keys }) => {
      if (state.konami) return state;
      const keys = [...state.keys, action.type];
      if (action.type !== konami_code[keys.length - 1])
        return { ...state, keys: [] };
      if (keys.length > konami_code.length) return { ...state, keys: [] };
      if (keys.length < konami_code.length) return { ...state, keys };
      if (keys.join("") === konami_code_serial) {
        return { konami: true, keys: [] };
      }
      return { ...state, keys };
    },
    (() => {
      return { konami: false, keys: [] };
    })(),
  );

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      dispatch_key({ type: e.code as Keys });
    };
    if (window.konami) return;
    document.addEventListener("keydown", callback);
    window.konami = true;

    return () => {
      document.removeEventListener("keydown", callback);
    };
  });

  useEffect(() => {
    if (konami) {
      router.push("/minigames");
    }
  }, [konami, router.push]);

  return (
    <>
      <div className="w-full select-none transition-all duration-700 grid max-4xl:grid-flow-row grid-flow-col">
        <div className="flex flex-col justify-center">
          <div className="text-left relative max-w-3xl 2xl:ml-12 mb-12">
            <div className="md:py-8 py-4 max-md:pl-4">
              <h2 className="font-extrabold md:text-5xl pl-4 text-3xl">
                Hi! I am
              </h2>
              <h1 className="font-extrabold md:text-8xl min-w-max text-6xl">
                Arthur Bufalo
              </h1>
            </div>
            <div className="absolute top-0 left-0 min-w-max">
              <h3 className="font-extrabold md:text-8xl text-6xl opacity-20">
                Web Developer
                <br />
                System Engineer
              </h3>
            </div>
            <p className="text-justify text-xl md:w-full w-2/3 max-md:pl-3 max-sm:w-11/12">
              I am a {calcYears(BIRTH)} years old Brazilian programmer, a
              full-stack web developer and a system engineer, making native
              apps. I also like photography, music, cinema, all sorts of
              paintings, and to learn new things. I am always looking for new
              challenges.
            </p>
            <div className="mt-12 mr-12 block text-right">
              <NextLink
                href="/cv"
                className="py-4 px-8 rounded-lg dark:bg-zinc-200 bg-zinc-800 text-zinc-200 hover:text-zinc-200 dark:text-zinc-800 font-bold group"
                draggable={false}
              >
                I am open to work
                <span className="ml-2 group-hover:ml-5 group-hover:-mr-3 transition-all duration-1000 ease-out">
                  &#10095;
                </span>
              </NextLink>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-3">
          <h2 className="pb-8 text-2xl font-black">Some projects I made</h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] place-items-center">
            {PROJECTS.map(({ link, image, delay, title, description }) => (
              <Card
                className={`w-80 h-max animate-swing delay my-3 dark:hover:text-white hover:text-black ${delay}`}
                style={{
                  animationDelay: `${(Date.now() * Math.random()) % 1000}ms`,
                }}
                as={NextLink}
                href={link}
                rel="noopener noreferrer"
                key={title}
              >
                <CardHeader className="flex gap-3 ml-4 pt-4">
                  {image && (
                    <Image
                      alt={`${title}'s logo`}
                      height={40}
                      radius="sm"
                      src={image}
                      width={40}
                    />
                  )}
                  <div className="flex flex-col">
                    <p className={`text-lg font-black ${delay}`}>{title}</p>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className={`leading-5 ${delay}`}>{description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* <Gaming className="fill-black dark:fill-white sticky bottom-0 right-0 w-20 h-20 bg-slate-800 p-4 rounded-2xl" /> */}
    </>
  );
};

export default Index;
