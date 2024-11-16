"use client";
import { Debug } from "@lib/canvas_debug";
import { useEffect } from "react";

export default function ReactScan() {
  useEffect(() => {
    if (Debug.showDebug) {
      // biome-ignore lint/security/noGlobalEval: fixed string and only executes in debug
      eval(
        'if (typeof window !== "undefined") import("https://unpkg.com/react-scan/dist/auto.global.js")',
      );
    }
  }, []);

  return null;
}
