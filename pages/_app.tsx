import Header from "@components/Header";
import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppType } from "next/app";
import "@styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { useEffect } from "react";

const App: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    warnDevTools();
    window.addEventListener("resize", warnDevTools);
    window.addEventListener("keydown", warnDevTools);
  });

  return (
    <>
      <NextUIProvider className="h-full min-h-screen">
        <div className="sticky top-0 w-screen z-[999]">
          <Header />
        </div>
        <main className={`${GeistSans.className} min-h-[93vh]`}>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
};

export default App;

// Check for the presence of the 'console' object in the window
const warnDevTools = () => {
  console.warn(
    "Ei! Querendo espiar o código? Não precisa disso, este site é open-source! https://github.com/Ar7hurz1nh0/Ar7hurz1nh0",
  );
  console.warn(
    "Hey! Trying to get a look on the code? You're in luck! This site is open-source! https://github.com/Ar7hurz1nh0/Ar7hurz1nh0",
  );
};
