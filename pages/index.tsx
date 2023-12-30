import Link from "next/link";
import React from "react";
// import { GeistMono } from 'geist/font/mono';

const Index = () => {
  return (
    <div className="w-full select-none">
      <div className="text-left relative max-w-3xl 2xl:ml-12">
        <div className="py-8">
          <h2 className="font-extrabold text-5xl pl-4">Hi! I am</h2>
          <h1 className="font-extrabold text-8xl">Arthur Bufalo</h1>
        </div>
        <div className="absolute top-0 left-0 min-w-max">
          <h3 className="font-extrabold text-8xl opacity-20">Web Developer<br />System Engineer</h3>
        </div>
        <p className="text-justify text-xl w-full">
          I am a 19 years old Brazilian programmer, a full-stack web developer and also a system engineer, where I make native apps. I also like photography, music, cinema, all sorts of paintings, and learn new things, and I am always looking for new challenges.
        </p>
        <div className="mt-12 mr-12 block text-right">
          <Link href="/cv" className="py-4 px-8 rounded-lg dark:bg-zinc-200 bg-zinc-800 text-zinc-200 hover:text-zinc-200 dark:text-zinc-800 font-bold group">
            I am open to work
            <span className="ml-2 group-hover:ml-5 group-hover:-mr-3 transition-all duration-1000 ease-out">&#10095;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;