import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return <Html className="dark" lang="br">
    <Head>
      <link rel="preconnect" href="https://arthurbr.me" />
      <link rel="dns-prefetch" href="https://arthurbr.me" />
      <NextScript />
    </Head>
    <body className="dark:bg-zinc-900 dark:text-slate-100 m-0 p-0 max-w-full transition-colors duration-300 w-screen">
      <Main />
    </body>
  </Html>
}
