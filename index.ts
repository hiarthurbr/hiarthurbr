import { JSDOM } from "jsdom"
import axios from "axios"
import { LinkHTMLAttributes } from "react"
import { writeFileSync } from 'fs'

const base_pages = [
  "https://www.resumoporcapitulo.com.br/triste-fim-de-policarpo-quaresma",
  "https://www.resumoporcapitulo.com.br/ang%C3%BAstia"
]

const link_selector = "a._3Bkfb._1lsz7"
const text_selector = "p.mm8Nw._1j-51.roLFQS._1FoOD._78FBa.sk96G9.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr"
const title_selector = "h2.eSWI6._1j-51._1FoOD._1oG79.WJlzbz.roLFQS.public-DraftStyleDefault-block-depth0.fixed-tab-size.public-DraftStyleDefault-text-ltr"

const cache: Record<string, string[]>[] = []

async function getLinks(url: string): Promise<string[]> {
  console.log(`Fetching ${url}...`)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data)
  return Array.from(dom.window.document.querySelectorAll(link_selector)).map(link => (link as LinkHTMLAttributes<Element>).href!)
}

async function getText(url: string): Promise<[string, string[]]> {
  console.log(`Fetching ${url}...`)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data)
  return [
    Array.from(dom.window.document.querySelectorAll(title_selector)).pop()!.textContent!,
    Array.from(dom.window.document.querySelectorAll(text_selector)).map(text => text.textContent!)
  ]
}

async function main() {
  const links = await Promise.allSettled(base_pages.map(getLinks))
  for (const link of links) {
    if (link.status === "fulfilled") {
      link.value.shift()
      const textCache: Record<string, string[]> = {}
      for (const l of link.value) {
        const [title, text] = await getText(l)
        textCache[title] = text
      }
      cache.push(textCache)
    }
  }
}

main()

process.on("exit", () => {
  console.log(Object.keys(cache[0]).sort())
  writeFileSync("cache.json", JSON.stringify(cache, null, 2))
  console.log("Done!")
})