import axios from '@lib/axios'
import { useEffect, useState } from 'react';
import type { ResumeIndex, ResumeLink, ResumeLinkIndex } from '../../global'
import Link from 'next/link';

type StaticProps = Awaited<ReturnType<typeof getStaticProps>>["props"]

export default function RPC(props: StaticProps) {
  const [resumes, setResumes] = useState<ResumeLink | null>(null);

  useEffect(() => {
    console.log(props)
    if (typeof props?.summaries !== "undefined")
      setResumes(props.summaries as ResumeLink);
  }, [props])

  return <>
    <article className='prose dark:prose-invert select-none'>
      <h1 className='text-7xl'>Resumos</h1>
        {
          resumes ? Object.keys(resumes).map((key) =>
            <div key={key}>
              <h2>{resumes[key][0]}</h2>
              <ul>
                {
                  resumes[key][1].map(resume =>
                    <li key={resume.link} className='m-5'>
                      <Link className='font-bold text-xl ease-in-out duration-200' href={`/summaries/${key}/${resume.link}`}>{resume.name}</Link>
                    </li>
                    )
                }
              </ul>
            </div>
          ) : <h2>Loading</h2>
        }
    </article>
  </>
}

export async function getStaticProps() {
  try {
    const summaries = (() => {
      const json = require("public/summaries/summaries.json") as ResumeLink
      const summaries = new Map<string, ResumeIndex>()
      for (const key in json) {
        const summary = json[key];
        summary[1] = summary[1].filter(summary => summary.name !== "Local test");
        summaries.set(key, summary);
      }
      return Object.fromEntries(summaries);
    })();
    return {
      props: {
        summaries
      }
    }
  }
  catch (e) {
    console.error("Error while parsing summaries:", e)
    console.log("Trying to fetch from latest deployed version")
    const request = await axios.get('/summaries/summaries.json')
    const summaries = JSON.parse(request.data) as ResumeLink
    return {
      props: {
        summaries
      }
    }
  }
}