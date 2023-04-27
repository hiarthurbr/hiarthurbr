import { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

export default function Document() {
  return <Html className="dark" lang="br">
    <Head>
      <link rel="preconnect" href="https://arthurbr.me" />
      <link rel="dns-prefetch" href="https://arthurbr.me" />
      {CssBaseline.flush()}
      <script dangerouslySetInnerHTML={{
        __html: `if (window && !window.location.host.startsWith("localhost") && window.location.origin.startsWith("http://")) window.location.href = window.location.href.replace("http://", "https://")`}
        } />
      <NextScript />
    </Head>
    <body className="dark:bg-zinc-900 dark:text-slate-100 m-0 p-0 max-w-full">
      <Main />
    </body>
  </Html>
}
