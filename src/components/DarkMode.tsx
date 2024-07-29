"use client";
import { Switch } from "@nextui-org/switch";
import { useEffect, useState } from "react";
import { Moon, Sun } from "./svgs";

export default function DarkMode() {
  if (typeof localStorage === "undefined") return null;
  const [disabled, setDisabled] = useState<boolean>(
    localStorage.getItem("theme") === null
      ? !window.matchMedia("(prefers-color-scheme: dark)").matches
      : localStorage.getItem("theme") === "light",
  );
  useEffect(() => {
    console.debug(disabled ? "Disabling dark mode" : "Enabling dark mode");
    if (disabled) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    if (!disabled) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [disabled]);

  return (
    <Switch
      size="lg"
      isSelected={disabled}
      onValueChange={setDisabled}
      thumbIcon={disabled ? <Sun fill="black" /> : <Moon fill="black" />}
      startContent={<Moon fill="#003878" className="fill-primary-100" />}
      endContent={<Sun fill="#9d9da6" />}
    />
  );
}
