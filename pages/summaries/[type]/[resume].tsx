import axios from '@lib/axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import copyToClipboard from '@lib/copyToClipboard';
import { Clipboard, Exclamation, PaperClip } from '@components/svgs'
import type { Resume, ResumeIndex, ResumeLink } from '@global'

const warnDialog = 'warn-dialog'

type StaticProps = Awaited<ReturnType<typeof getStaticProps>>["props"]

export default function RPC(props: StaticProps) {
  const router = useRouter();
  const params = props.params ?? router.query;
  const [visible, setVisible] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedSuccessful, setCopiedSuccess] = useState<boolean | null>(null);
  const [title, setTitle] = useState<Resume["title"]>('');
  const [resume, setResume] = useState<Resume["chapters"]>({});
  const [origin, setOrigin] = useState<Resume["origin"]>('');
  const [isDialogOpen, setDialog] = useState<boolean>(false)
  const hasPadding = isDialogOpen && (typeof sessionStorage === "undefined" ? true :
    sessionStorage.getItem(warnDialog) !== "closed" ?? true);

  useEffect(() => {
    if (typeof params.resume === "undefined") return;
    if (props.hasWarn)
      setDialog(
        typeof sessionStorage === "undefined" ? true :
          sessionStorage.getItem(warnDialog) !== "closed" ?? true
      );
    const { title, chapters, origin } = props.resume;
    setTitle(title);
    setResume(chapters);
    setOrigin(origin);
  }, [params, props, router])

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace('#', ''))
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [resume])

  useEffect(() => {
    if (sessionStorage.getItem("ai-dialog") === null) {
      console.log("ai-dialog does not exist, creating one")
      sessionStorage.setItem("ai-dialog", 'opened');
    }
  }, [])

  useEffect(() => {
    if (copied) {
      const url = new URL(`${window.location.origin}${window.location.pathname}#${copied}`);
      copyToClipboard(url.href).then(setCopiedSuccess);
      history.replaceState(null, '', url.href);
      setTimeout(() => {
        setCopied(null)
        setCopiedSuccess(null)
      }, 2000);
    }
  }, [copied])

  return <>
    <article className='prose dark:prose-invert select-none'>
      <div className={`bg-red-500 dark:bg-red-700 dark:saturate-[.8] bg-opacity-60 dark:bg-opacity-50 dark:border-opacity-30 backdrop-blur-[8px] dark:border-red-700 border-red-500 border-[6px] border-opacity-40 rounded-3xl h-14 flex w-full max-w-screen-lg left-2/4 -translate-x-2/4 flex-wrap px-4 md:px-6 max-md:h-28 ${isDialogOpen ? 'fixed' : 'hidden'}`}>
        <div className='inline-flex flex-row overflow-scroll pb-1 scrollbar' style={{}}>
          <strong className='text-xl font-extrabold absolute top-2 left-4 max-md:top-3'>
            Atenção!
          </strong>
          <p className='font-xl font-semibold pl-24 mt-2 max-md:mt-10 max-md:pl-0 max-md:text-left md:max-lg:pl-20 md:whitespace-nowrap pr-4'>
            {props.warn}</p>
          <div className='text-2xl font-extrabold absolute right-1 top-0.5'>
            <button
              className='aspect-1 h-10 p-0 bg-transparent ring-white'
              onClick={() => {
                if (typeof sessionStorage === "undefined") return;

                sessionStorage.setItem(warnDialog, 'closed')
                const key = sessionStorage.getItem(warnDialog)

                setDialog(key !== 'closed')
              }}
            >X</button>
          </div>
        </div>
      </div>
      <h1 className={`text-7xl ${hasPadding ? 'md:pt-24 pt-36' : ''}`}>{title}</h1>
      {
        resume && Object.entries(resume).map(([chapter, paragraphs]) => {
          let id = chapter.toLowerCase().replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          while (id.includes('--')) id = id.replaceAll('--', '-');
          return <div key={chapter}>
            {paragraphs === null ?
              <div id={id} className='pt-12 md:pb-8 flex justify-center max-md:flex-col max-md:items-center'>
                <div
                  className='p-1 md:ml-12 px-4 border-4 rounded-xl border-transparent hover:border-black dark:hover:border-white'
                  onMouseEnter={() => setVisible(id)}
                  onMouseLeave={() => setVisible(null)}
                  onClick={() => setCopied(id)}
                >
                  <span className='inline-block'>
                    <h2 className='text-5xl max-h-fit m-0 p-0'>{chapter}</h2>
                  </span>
                </div>
                <span className={'pl-4 inline-block translate-y-3 ' + (visible === id ? 'stroke-black dark:stroke-white' : 'stroke-transparent')}>
                  {(copied === id && copiedSuccessful !== null) ? (
                    copiedSuccessful ? <Clipboard className='h-10 stroke-lime-500' /> : <Exclamation className='h-10 stroke-red-600' />
                  ) : <PaperClip className='h-10' />}
                </span>
              </div> :
              <section>
                <div id={id} className='max-md:pt-6 md:pt-12 md:pb-2 flex justify-center max-md:flex-col max-md:items-center'>
                  <div
                    className='p-1 md:ml-12 px-4 border-2 rounded-xl border-transparent hover:border-black dark:hover:border-white'
                    onMouseEnter={() => setVisible(id)}
                    onMouseLeave={() => setVisible(null)}
                    onClick={() => setCopied(id)}
                  >
                    <span className='inline-block'>
                      <h3 className='text-3xl max-h-fit m-0 p-0'>{chapter}</h3>
                    </span>
                  </div>
                  <span className={'pl-4 inline-block translate-y-2 ' + (visible === id ? 'stroke-black dark:stroke-white' : 'stroke-transparent')}>
                    {(copied === id && copiedSuccessful !== null) ? (
                      copiedSuccessful ? <Clipboard className='h-8 stroke-lime-500' /> : <Exclamation className='h-8 stroke-red-600' />
                    ) : <PaperClip className='h-8' />}
                  </span>
                </div>
                {paragraphs.map(paragraph => <p className='text-xl font-semibold' key={paragraph}>{paragraph}</p>)}
              </section>
            }
          </div>
        }
        )
      }
    </article>
  </>
}

interface GetStaticProps {
  params?: Record<string, string>;
  locale?: string;
  locales?: string[];
  defaultLocale?: string;
}

export async function getStaticProps(context: GetStaticProps) {
  try {
    const resume = require(`public/summaries/${context.params?.type}/${context.params?.resume}.json`) as Resume
    const [, , hasWarn, warn] = require(`public/summaries/summaries.json`)[context.params!.type] as ResumeIndex
    return {
      props: {
        resume,
        hasWarn,
        warn: hasWarn ? warn : null,
        params: {
          type: context.params?.type,
          resume: context.params?.resume
        }
      }
    }
  }
  catch (e) {
    console.error("Error while parsing resume:", e)
    console.log("Trying to fetch from latest deployed version")
    const request = await axios.get(`/summaries/${context.params?.type}/${context.params?.resume}.json`)
    const [, , hasWarn, warn] = JSON.parse(await axios.get('/summaries/summaries.json'))[context.params!.type] as ResumeIndex
    const resume = JSON.parse(request.data) as Resume
    return {
      props: {
        resume,
        hasWarn,
        warn: hasWarn ? warn : null,
        params: {
          type: context.params?.type,
          resume: context.params?.resume
        }
      }
    }
  }
}

interface GetStaticPaths {
  paths: Array<{ params: { type: string, resume: string } }>
  fallback?: boolean | 'blocking'
}

export async function getStaticPaths(): Promise<GetStaticPaths> {
  try {
    const json = require(`public/summaries/summaries.json`) as ResumeLink
    const summaryTypes = Object.keys(json)
    const summaries: Array<{ params: { type: string, resume: string } }>[] = summaryTypes.map(index => {
      const s: Array<{ params: { type: string, resume: string } }> = []
      json[index][1].forEach(i => {
        s.push({ params: { type: index, resume: i.link } })
      })
      return s;
    })

    const flattenSummaries: Array<{ params: { type: string, resume: string } }> = []

    summaries.forEach(i => {
      i.forEach(o => flattenSummaries.push(o))
    })

    return {
      paths: flattenSummaries,
      fallback: false
    }
  }
  catch (e) {
    try {
      console.error("Error while parsing local files:", e)
      console.log("Trying to parse from latest deployed version.")
      const request = await axios.get('/summaries/summaries.json')
      const json = JSON.parse(request.data) as ResumeLink
      const summaryTypes = Object.keys(json)
      const summaries: Array<{ params: { type: string, resume: string } }>[] = summaryTypes.map(index => {
        const s: Array<{ params: { type: string, resume: string } }> = []
        json[index][1].forEach(i => {
          s.push({ params: { type: index, resume: i.link } })
        })
        return s;
      })

      const flattenSummaries: Array<{ params: { type: string, resume: string } }> = []

      summaries.forEach(i => {
        i.forEach(o => flattenSummaries.push(o))
      })

      return {
        paths: flattenSummaries,
        fallback: false
      }
    }
    catch (e) {
      console.error('Error while parsing summaries, returning empty paths:', e)
      return {
        paths: [],
        fallback: false
      }
    }
  }
}