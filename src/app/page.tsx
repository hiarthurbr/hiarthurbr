import { Home } from "./home";
import { OPEN_GRAPH_EMAILS } from "@lib/const";

export default function Landing() {
  return <Home />;
}

const description =
  "Descubra mais sobre mim, meus projetos, passe um tempo jogando minijogos, talvez até estudando, ou lendo meu blog. Tudo por aqui!";

export const metadata = {
  title: "Arthur Bufalo | Landing",
  description,
  openGraph: {
    type: "website",
    title: "Oie! Prazer, sou Arthur 👋🏼",
    description,
    countryName: "Brazil",
    locale: "pt_BR",
    url: "https://arthurbr.me",
    emails: OPEN_GRAPH_EMAILS,
  },
};
