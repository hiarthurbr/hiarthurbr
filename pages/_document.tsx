import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark" lang="br">
      <Head>
        <link rel="preconnect" href="https://arthurbr.me" />
        <link rel="dns-prefetch" href="https://arthurbr.me" />
        <NextScript />
      </Head>
      <body className="dark:bg-zinc-950 dark:text-zinc-100 bg-zinc-100 text-zinc-800 m-0 p-0 transition-colors duration-1000 min-w-screen">
        <Main />
      </body>
    </Html>
  );
}
