import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import Darkmode from "./DarkMode";

export default function Header() {
  const title = "Arthur Bufalo";
  return (
    <nav className="bg-zinc-200 px-2 sm:px-4 py-2.5 dark:bg-zinc-800 w-full z-20 top-0 left-0 border-b border-slate-200 dark:border-slate-600 sticky dark:bg-opacity-50 bg-opacity-50 backdrop-blur-[8px] rounded-3xl">
      <div className="flex flex-wrap items-center justify-between ml-4 max-sm:ml-1">
        <NextLink
          href="/"
          className="flex items-center text-black dark:text-white order-1"
          draggable={false}
        >
          <span className="self-start text-xl font-extrabold whitespace-nowrap dark:text-white hover:text-black block">
            {title}
          </span>
        </NextLink>
        <div className="flex order-last space-x-1 ">
          <Darkmode />
          <Button
            as={NextLink}
            href="/register"
            color="primary"
            radius="sm"
            className="max-lg:hidden font-bold hover:text-white"
            isDisabled
          >
            Registre-se
          </Button>
          <Button
            as={NextLink}
            href="/register"
            color="primary"
            radius="sm"
            className="lg:hidden font-bold hover:text-white"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                role="presentation"
                className="size-5 scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            }
            isIconOnly
            isDisabled
          />
        </div>
      </div>
    </nav>
  );
}
