import { JSDOM } from "jsdom"
import axios from "axios"
import { LinkHTMLAttributes } from "react"
import { writeFileSync, rmdirSync, mkdirSync } from 'fs'
import { randomUUID } from 'crypto'

type linkName = string
type chapterName = string

const base_pages = [
  "https://www.resumoporcapitulo.com.br/triste-fim-de-policarpo-quaresma",
  "https://www.resumoporcapitulo.com.br/ang%C3%BAstia"
]

const link_selector = "a._3Bkfb._1lsz7"
const text_selector = "p.mm8Nw._1j-51.roLFQS._1FoOD._78FBa.sk96G9.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr"
const chapter_selector = "p.mm8Nw._1j-51.roLFQS._1FoOD._1oG79.WJlzbz.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr > span._2PHJq.public-DraftStyleDefault-ltr > span:first-child:not(br):not(a)"
const title_selector = "h2.eSWI6._1j-51._1FoOD._1oG79.WJlzbz.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr"

type cache = Record<string, string[] | null>
const cache: {
  title: string,
  chapters: cache
}[] = []

async function getLinksChaptersAndTitle(url: string): Promise<[string[], ReturnType<typeof getChapters>, string]> {
  console.log(`Fetching ${url}...`)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data)
  const chapters = getChapters(dom)
  return [Array.from(dom.window.document.querySelectorAll(link_selector)).map(link => (link as LinkHTMLAttributes<Element>).href!), chapters, dom.window.document.title.replace('Resumo Por Capítulo: ', '')]
}

function getChapters(dom: JSDOM): [chapterName, linkName][] | false {
  const query = Array.from(dom.window.document.querySelectorAll(chapter_selector))
  const chapters = query.filter(el => el.parentElement!.parentElement!.previousElementSibling!.getAttribute('type') === "empty-line" && el.parentElement!.parentElement!.nextElementSibling!.nextElementSibling!.textContent !== 'Deixe seu comentário:')
  const format = chapters.map(el => [el.textContent!, el.parentElement!.parentElement!.nextElementSibling!.nextElementSibling!.textContent!]) satisfies [chapterName, linkName][]
  return chapters.length ? format : false
}

async function getText(url: string, index: number): Promise<[number, [string, string[]]]> {
  console.log(`Fetching ${url}...`)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data)
  return [index, [
    Array.from(dom.window.document.querySelectorAll(title_selector)).pop()!.textContent!,
    Array.from(dom.window.document.querySelectorAll(text_selector)).map(text => text.textContent!)
  ]]
}

async function getPage(value: [string[], false | [string, string][], string]) {
  const [link, chapters] = value
  link.shift()
  const textCache: cache = {}
  let page: [number, [string, string[] | null]][] = await Promise.all(link.map(getText))
  page = page.sort((a, b) => a[0] - b[0])
  if (chapters) {
    chapters
    .filter(chapter => !(page.map(x => x[1][0])
    .includes(chapter[0])))
    .forEach(([chapter, link]) => {
      const index = page.findIndex(([index, [title, text]]) => link === title)
      page.splice(index, 0, [NaN, [chapter, null]])
    })
  }
  page.forEach(([index, [title, text]]) => textCache[title] = text)
  return {
    title: value[2],
    chapters: textCache
  };
}

async function main() {
  const links = await Promise.all(base_pages.map(getLinksChaptersAndTitle))
  links.map(getPage).forEach(page => {
    page.then(textCache => cache.push(textCache))
  })
}

main()

process.on("exit", () => {
  const resumes: { name: string, link: string }[] = []
  rmdirSync("public/articles", { recursive: true })
  mkdirSync("public/articles")
  cache.forEach(file => {
    const uuid = randomUUID()
    writeFileSync(`public/articles/${uuid}.json`, JSON.stringify(file))
    resumes.push({ name: file.title, link: uuid })
  })
  writeFileSync("public/resumes.json", JSON.stringify(resumes))
  console.log("Done!")
})