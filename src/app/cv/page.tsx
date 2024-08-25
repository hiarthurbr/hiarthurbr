import CV from "./cv";
import { OPEN_GRAPH_EMAILS } from "@lib/const";

export default CV;

export const metadata = {
  title: "Arthur Bufalo | Curriculum Vitae",
  openGraph: {
    type: "profile",
    firstName: "Arthur",
    lastName: "Bufalo",
    countryName: "Brazil",
    emails: OPEN_GRAPH_EMAILS,
    gender: "Cis Male",
    siteName: "Arthur Bufalo",
    title: "Arthur Bufalo | Curriculum Vitae",
    username: "hiarthurbr",
    url: "https://arthurbr.me/cv",
    description: "Arthur Bufalo's Curriculum Vitae",
    locale: "en_US",
  },
};
