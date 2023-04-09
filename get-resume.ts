import { JSDOM } from "jsdom"
import axios from "axios"
import { LinkHTMLAttributes } from "react"
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { randomUUID, createHash } from 'crypto'
import { type Browser, launch } from 'puppeteer'

const sha256 = (str: string) => createHash('sha256').update(str).digest('hex')
let browser: Browser

type linkName = string
type chapterName = string
interface Summary {
  name: string;
  link: `${string}-${string}-${string}-${string}-${string}`;
  hash: string;
}

const base_pages: readonly string[] = [
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
  chapters: cache,
  origin: string
}[] = []

/**
 * Get all links, chapters and title from a summary page
 * @param url string encoded url to article
 * @returns promise tuple with links, chapters and title, respectively
 * @deprecated uses the unreliable JSDOM CSS selectors
 * @deprecated will be removed in the next version (v0.6.0)
 */
async function getLinksChaptersAndTitle(url: string): Promise<[string[], ReturnType<typeof getChapters>, string]> {
  console.log(`Fetching ${url}...`)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data)
  const chapters = getChapters(dom)
  return [Array.from(dom.window.document.querySelectorAll(link_selector)).map(link => (link as LinkHTMLAttributes<Element>).href!), chapters, dom.window.document.title.replace('Resumo Por Capítulo: ', '')]
}

/**
 * Get all chapters from a summary page
 * @param dom JSDOM instance
 * @returns tuple with chapter name and link name, respectively
 * @deprecated uses the unreliable JSDOM CSS selectors
 * @deprecated will be removed in the next version (v0.6.0)
 */
function getChapters(dom: JSDOM): [chapterName, linkName][] | false {
  const query = Array.from(dom.window.document.querySelectorAll(chapter_selector))
  const chapters = query.filter(el => el.parentElement!.parentElement!.previousElementSibling!.getAttribute('type') === "empty-line" && el.parentElement!.parentElement!.nextElementSibling!.nextElementSibling!.textContent !== 'Deixe seu comentário:')
  const format = chapters.map(el => [el.textContent!, el.parentElement!.parentElement!.nextElementSibling!.nextElementSibling!.textContent!]) satisfies [chapterName, linkName][]
  return chapters.length ? format : false
}

/**
 * Get all texts from a summary page
 * @param url url encoded string with link to summary page
 * @param index index number for sorting purposes
 * @returns tuple with index and a tuple with title and text, respectively
 * @deprecated uses the unreliable JSDOM CSS selectors
 * @deprecated will be removed in the next version (v0.6.0)
 */
async function getText(url: string, index: number): Promise<[number, [string, string[]]]> {
  console.log(`Fetching ${url}...`)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data)
  return [index, [
    Array.from(dom.window.document.querySelectorAll(title_selector)).pop()!.textContent!,
    Array.from(dom.window.document.querySelectorAll(text_selector)).map(text => text.textContent!)
  ]]
}

/**
 * Sums up the whole process of getting a summary page
 * @param value tuple with links, chapters and title, respectively
 * @returns object with title and chapters, with chapters texts
 * @deprecated uses the unreliable JSDOM CSS selectors
 * @deprecated will be removed in the next version (v0.6.0)
 */
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
      const index = page.findIndex(([, [title,]]) => link === title)
      page.splice(index, 0, [NaN, [chapter, null]])
    })
  }
  page.forEach(([, [title, text]]) => textCache[title] = text)
  return {
    title: value[2],
    chapters: textCache
  };
}

async function main() {
  // {
  //   const links = await Promise.all(base_pages.map(getLinksChaptersAndTitle))
  //   links.map(getPage).forEach(page => {
  //     page.then(textCache => cache.push(textCache))
  //   })
  // }

  browser = await launch()

  const cache: {
    title: string,
    chapters: cache,
    origin: string
  }[] = await Promise.all(base_pages.map(async url => {
    const page = await browser.newPage()
    await page.goto(url)
    console.log(`Fetching ${url}...`)

    const links = await Promise.all(
      Array.from(await page.$$(link_selector))
        .map(async link => await (await link.getProperty('href')).jsonValue()))
    links.shift()
    const title = (await page.title()).replace('Resumo Por Capítulo: ', '')

    const chapters = await page.$$eval(chapter_selector, (chapters) => {
      const query = chapters.filter(el => el
        .parentElement
        ?.parentElement
        ?.previousElementSibling
        ?.getAttribute('type') === "empty-line"
        && el
        ?.parentElement
        ?.parentElement
        ?.nextElementSibling
        ?.nextElementSibling
        ?.textContent !== 'Deixe seu comentário:'
      )

      const format = query.map(el => [
        el.textContent!,
        el.parentElement
          ?.parentElement
          ?.nextElementSibling
          ?.nextElementSibling
          ?.textContent!
      ]) satisfies [chapterName, linkName][]

      return query.length ? format : false
    })
    await page.close();

    const texts: [number, [string, string[] | null]][] = (await Promise.all(links.map(async (link, index) => {
      const page = await browser.newPage()
      console.log(`${title}: fetching ${link}...`)
      await page.goto(link)

      const chapter_title = await page.$$eval(title_selector, titles => titles.pop()!.textContent!)
      const text = await page.$$eval(text_selector, texts => texts.map(text => text.textContent!))

      await page.close()
      return [ index, [ chapter_title, text ] ] satisfies [number, [string, string[] | null]]
    }))).sort((a, b) => a[0] - b[0])

    if (chapters) chapters
      .filter(chapter => !(texts.map(x => x[1][0]).includes(chapter[0])))
      .forEach(([chapter, link]) => {
        const index = texts.findIndex(([, [title,]]) => link === title)
        texts.splice(index, 0, [NaN, [chapter, null]])
      })

    const textCache: cache = {}
    texts.forEach(([, [title, text]]) => textCache[title] = text)

    return {
      title,
      chapters: textCache,
      origin: new URL(url).origin
    }
  }))

  await browser.close()
  const base_write = <const>"public/summaries"
  const base_read = <const>"/summaries.json"
  if (!cache.length) return;
  let resumes: Summary[] = []

  if (!existsSync(base_write)) {
    mkdirSync(base_write)
    writeFileSync(base_write + base_read, JSON.stringify([]))
  }
  else if (!existsSync(base_write + base_read)) writeFileSync(base_write + base_read, JSON.stringify([]))
  else resumes = JSON.parse(readFileSync(base_write + base_read, "utf-8"))
  
  try {
    cache.forEach(file => {
      const i = resumes.findIndex(summary => summary.name === file.title)
      const hash = sha256(JSON.stringify(file))
      let uuid = randomUUID()
      if (i !== -1) {
        if (resumes[i].hash == hash) {
          console.info(`Skipping ${file.title}...`)
          return;
        }
        uuid = resumes[i].link;
        resumes[i].hash = hash
      }
      else resumes.push({ name: file.title, link: uuid, hash })
      writeFileSync(`${base_write}/${uuid}.json`, JSON.stringify(file))
      console.info(`Wrote ${file.title} to ${base_write}/${uuid}.json`)
    })
    writeFileSync(base_write + base_read, JSON.stringify(resumes))
  }
  catch {
    console.error(`${base_write} is not writable.`)
  }
  finally {
    console.log("Done!")
  }
}

main()

// Please don't kill me for this
let funCounter = 0;
process.on('uncaughtException', async () => {
  if (funCounter >= 10) {
    console.error("Ending the fun as it's probably other people's fault")
    return;
  }
  await browser.close()
  console.log("Restarting thread for the", ++funCounter, "time")
  main()
})

// process.on("exit", () => {
//   if (!cache.length) return;
//   const resumes: { name: string, link: string }[] = []
//   try { rmdirSync("public/articles", { recursive: true }) } catch {}
//   mkdirSync("public/articles")
//   cache.forEach(file => {
//     const uuid = randomUUID()
//     writeFileSync(`public/articles/${uuid}.json`, JSON.stringify(file))
//     resumes.push({ name: file.title, link: uuid })
//   })
//   writeFileSync("public/resumes.json", JSON.stringify(resumes))
//   console.log("Done!")
// })