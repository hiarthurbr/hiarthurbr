import "./globals.css";

import { Providers } from "./providers";
import Header from "@components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  "use client";
  return (
    <html className="dark" lang="br">
      <head>
        <link rel="preconnect" href="https://arthurbr.me" />
        <link rel="dns-prefetch" href="https://arthurbr.me" />
      </head>
      <body className="dark:bg-zinc-950 dark:text-zinc-100 bg-zinc-100 text-zinc-800 m-0 p-0 transition-colors duration-1000 min-w-screen">
        <Providers>
          <div className="sticky top-0 w-screen z-[999]">
            <Header />
          </div>
          <main className={`${GeistSans.className} min-h-[93vh] pt-24`}>
            {children}
          </main>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
