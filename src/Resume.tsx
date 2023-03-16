import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
interface Resume {
  title: string
  chapters: Record<string, string[]>
}

export default function RPC() {
  const params = useParams();
  const [title, setTitle] = useState<Resume["title"]>('');
  const [resume, setResume] = useState<Resume["chapters"]>({});

  axios.get(`/${params.resume}.json`).then((res) => {
    const { title, chapters} = res.data;
    setTitle(title);
    setResume(chapters);
  })

  return <>
    <article className='prose prose-invert select-none'>
      <h1 className='text-7xl'>{title}</h1>
      {
        Object.entries(resume).map(([chapter, paragraphs]) =>
          <section key={chapter}>
            <h2 className='text-5xl'>{chapter}</h2>
            { paragraphs.map(paragraph => <p className='text-xl font-semibold' key={paragraph}>{paragraph}</p>) }
          </section>
        )
      }
    </article>
  </>
}