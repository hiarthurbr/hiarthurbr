import { type AppType } from "next/app";
import Header from '@components/Header';
import { NextUIProvider } from '@nextui-org/react';
import '@styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  return <NextUIProvider>
    <header className='fixed top-8 max-sm:top-4 z-[999] flex w-full max-w-screen-2xl left-2/4 -translate-x-2/4 flex-wrap px-4'>
      <Header active={2}/>
    </header>
    <main className='pt-32'>
      <Component {...pageProps} />
    </main>
  </NextUIProvider>
}

export default App;