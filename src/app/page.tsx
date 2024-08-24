import { Home } from "./home";

export default function Landing() {
  return <Home />;
}

const description =
  "Descubra mais sobre mim, meus projetos, passe um tempo jogando minijogos, talvez até estudando, ou lendo meu blog. Tudo por aqui!";

export const metadata = {
  title: "Arthur Bufalo | Landing",
  description,
  twitter: {
    title: "Oie! Prazer, sou Arthur 👋🏼",
    description,
  },
};
