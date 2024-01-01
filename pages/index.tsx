import { Gaming } from "@components/svgs";
import Link from "next/link";
import React from "react";
// import { GeistMono } from 'geist/font/mono';

const now = Date.now();
const birth = (new Date(2004, 11, 28)).getTime();

const calcYears = (startDate: number) => {
  const diffTime = Math.abs(now - startDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(diffYears);
};


const Index = () => {
  return (
    <>
      <div className="w-full select-none transition-all duration-700">
        <div className="text-left relative max-w-3xl 2xl:ml-12">
          <div className="md:py-8 py-4 max-md:pl-4">
            <h2 className="font-extrabold md:text-5xl pl-4 text-3xl">Hi! I am</h2>
            <h1 className="font-extrabold md:text-8xl min-w-max text-6xl">Arthur Bufalo</h1>
          </div>
          <div className="absolute top-0 left-0 min-w-max">
            <h3 className="font-extrabold md:text-8xl text-6xl opacity-20">Web Developer<br />System Engineer</h3>
          </div>
          <p className="text-justify text-xl md:w-full w-2/3 max-md:pl-3 max-sm:w-11/12">
            I am a {calcYears(birth)} years old Brazilian programmer, a full-stack web developer and also a system engineer, where I make native apps. I also like photography, music, cinema, all sorts of paintings, and learn new things, and I am always looking for new challenges.
          </p>
          <div className="mt-12 mr-12 block text-right">
            <Link href="/cv" className="py-4 px-8 rounded-lg dark:bg-zinc-200 bg-zinc-800 text-zinc-200 hover:text-zinc-200 dark:text-zinc-800 font-bold group">
              I am open to work
              <span className="ml-2 group-hover:ml-5 group-hover:-mr-3 transition-all duration-1000 ease-out">&#10095;</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <Gaming className="fill-black dark:fill-white sticky bottom-0 right-0 w-20 h-20 bg-slate-800 p-4 rounded-2xl" /> */}
    </>
  );
};

export default Index;