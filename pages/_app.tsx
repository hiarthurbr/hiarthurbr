import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { type AppType } from "next/app";
import Header from '@components/Header';
import { NextUIProvider } from '@nextui-org/react';
import '@styles/globals.css';
import { useEffect } from "react";
const App: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    warnDevTools();
    window.addEventListener('resize', warnDevTools);
    window.addEventListener('keydown', warnDevTools);
  })

  return <>
    <NextUIProvider>
      <header className='fixed top-8 max-sm:top-4 z-[999] flex w-full max-w-screen-2xl left-2/4 -translate-x-2/4 flex-wrap px-4'>
        <Header active={2} />
      </header>
      <main className='pt-32'>
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
    <SpeedInsights />
    <Analytics />
  </>
}

export default App;

// Check for the presence of the 'console' object in the window
const warnDevTools = () => {
  console.warn('Ei! Querendo espiar o código? Não precisa disso, este site é open-source! https://github.com/Ar7hurz1nh0/Ar7hurz1nh0');
  console.warn('Hey! Trying to get a look on the code? You\'re in luck! This site is open-source! https://github.com/Ar7hurz1nh0/Ar7hurz1nh0');
};