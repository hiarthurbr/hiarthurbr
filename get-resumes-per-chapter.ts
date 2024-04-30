import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { type Browser, launch } from 'puppeteer'
import type { ResumeLink, ResumeLinkIndex as Summary, Resume as SummaryPage } from "global"

const sha256 = (str: string) => createHash('sha256').update(str).digest('hex')
let browser: Browser

type linkName = string
type chapterName = string

const base_pages: string[] = require("./links.json") as string[];

const { link_selector, text_selector, chapter_selector, title_selector } = require("./selectors.json");

type cache = Record<string, string[] | null>

async function scrapePages(urls: string[]): Promise<PromiseSettledResult<SummaryPage>[]> {
  return await Promise.allSettled(urls.map(async url => {
    const page = await browser.newPage()
    await page.goto(url)
    console.log(`Fetching base page: ${url}`)
    const links = await Promise.all(
      Array.from(await page.$$(link_selector))
        .map(async link => await (await link.getProperty('href')).jsonValue()))
    links.shift()
    const title = (await page.title()).replace(' | resumoporcapítulo', '').trim()

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

    const texts: [number, [string, string[] | null]][] = [];

    const get_links = links.map((link, index) => [link, index, false as boolean] satisfies [string, number, boolean])
    while (texts.length < links.length) {
      const results = await Promise.allSettled(get_links.filter(a => !a[2]).map(async ([link, index]) => {
        const page = await browser.newPage()
        console.log(`${title}: fetching ${link}...`)
        await page.goto(link)

        const chapter_title = await page.$$eval(title_selector, titles => titles.pop()!.textContent!)
        const text = await page.$$eval(text_selector, texts => texts.map(text => text.textContent!))

        await page.close()
        texts.push([index, [chapter_title, text]]);
        return link as string;
      }))
      results.filter(result => result.status === 'fulfilled').forEach(result => {
        if (result.status === 'rejected') return;
        const index = get_links.findIndex(([link]) => link === result.value)
        get_links[index]![2] = true;
      })
    }

    texts.sort((a, b) => a[0] - b[0])

    if (chapters) chapters
      .filter(chapter => !(texts.map(x => x[1][0]).includes(chapter[0])))
      .forEach(([chapter, link]) => {
        const index = texts.findIndex(([, [title,]]) => link === title)
        texts.splice(index, 0, [Number.NaN, [chapter, null]])
      })

    const textCache: cache = {}
    texts.forEach(([, [title, text]]) => { textCache[title] = text })

    return {
      title,
      chapters: textCache,
      origin: url
    }
  }))
}

const Cache: SummaryPage[] = []

async function main() {
  const cache_link_pages = [...base_pages]
  while (Cache.length < base_pages.length) {
    browser = await launch({ headless: true })
    const build = await scrapePages(cache_link_pages)
    build.forEach((page, i) => {
      if (page.status === "fulfilled") {
        Cache.push(page.value)
        cache_link_pages.splice(cache_link_pages.indexOf(page.value.origin), 1)
      }
      else {
        const error = page.reason.message
        const width = cache_link_pages[i]?.length ?? 0 > error?.length ? cache_link_pages[i]?.length : error?.length
        const error_padding = error?.length < width ? " ".repeat(width - error?.length) : ""
        console.error(`${'-'.repeat(width + 2)}\n|${cache_link_pages[i]}${" ".repeat(width - (cache_link_pages[i]?.length ?? 0))}|\n|${error}${error_padding}|\n${'-'.repeat(width + 2)}`)
      }
    })
    await browser.close()
  }

  const base_write = <const>"public/summaries"
  const base_write_chapters = <const>`${base_write}/per-chapter`
  const base_read = <const>`${base_write}/summaries.json`
  const base_json = { "per-chapter": ["Por capítulo", [], false] } satisfies ResumeLink
  const base_json_file = JSON.stringify(base_json)
  if (!Cache.length) return;
  let summaries: ResumeLink = base_json;

  if (!existsSync(base_write_chapters)) {
    mkdirSync(base_write_chapters, { recursive: true, mode: 0o777 })
    writeFileSync(base_read, base_json_file)
  }
  else if (!existsSync(base_read)) writeFileSync(base_read, base_json_file)
  else summaries = require(`./${base_read}`)
  const resumes: Summary[] = summaries["per-chapter"][1]

  try {
    Cache.forEach(file => {
      const title_hash = sha256(file.title).slice(0, 12)
      const i = resumes.findIndex(summary => summary.link === title_hash)
      const hash = sha256(JSON.stringify(file))
      if (i !== -1) resumes[i]!.hash = hash
      else resumes.push({ name: file.title, link: title_hash, hash })
      writeFileSync(`${base_write_chapters}/${title_hash}.json`, JSON.stringify(file))
      console.info(`Wrote ${file.title} to ${base_write_chapters}/${title_hash}.json`)
    })
    summaries["per-chapter"][1] = resumes
    writeFileSync(`./${base_read}`, JSON.stringify(summaries))
  }
  catch (e) {
    console.error(`${base_write} is not writable:`, e)
  }
  finally {
    console.log("Done!")
  }
}

main()