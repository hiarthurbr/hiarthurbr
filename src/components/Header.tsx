import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Darkmode from "./DarkMode";
import { Config } from "./Config";
import { Exclamation } from "./svgs";

export default function Header() {
  const title = "Arthur Bufalo";
  return (
    <Navbar
      classNames={{
        base: "w-11/12 md:w-5/6 mx-auto max-w-[96rem] bg-transparent backdrop-blur-sm absolute top-2 data-[hidden]:top-0 select-none *:!transition-all *:!duration-1000 !transition-all !duration-1000",
        wrapper:
          "dark:bg-zinc-900 bg-zinc-200 bg-opacity-70 dark:bg-opacity-70 rounded-2xl px-6 md:px-16 max-w-full",
      }}
      shouldHideOnScroll
    >
      <NavbarBrand>
        <NextLink
          href="/"
          className="flex items-center text-black dark:text-white order-1"
          draggable={false}
        >
          <span className="self-start text-xl font-extrabold whitespace-nowrap dark:text-white hover:text-black block">
            {title}
          </span>
        </NextLink>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Darkmode />
        </NavbarItem>
        <NavbarItem>
          <Config />
        </NavbarItem>
        <NavbarItem className="*:!transition-all *:!duration-1000">
          <Button
            as={NextLink}
            href="/register"
            color="primary"
            radius="sm"
            className="max-lg:size-10 max-lg:min-w-10 px-0 lg:px-4 font-bold hover:text-white"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                role="presentation"
                className="lg:hidden size-5 scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            }
            isDisabled
          >
            <span className="max-lg:hidden font-bold hover:text-white">
              Registre-se
            </span>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
