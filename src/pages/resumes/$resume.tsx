import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
interface Resume {
  title: string
  chapters: Record<string, string[] | null>
}

export default function RPC() {
  const params = useParams();
  const [title, setTitle] = useState<Resume["title"]>('');
  const [resume, setResume] = useState<Resume["chapters"]>({});

  !title && axios.get(`/articles/${params.resume}.json`).then((res) => {
    const { title, chapters} = res.data;
    setTitle(title);
    setResume(chapters);
  })

  return <>
    <article className='prose dark:prose-invert select-none'>
      <h1 className='text-7xl'>{title}</h1>
      {
        Object.entries(resume).map(([chapter, paragraphs]) =>
          <section key={chapter}>
            { paragraphs === null ?
              <h2 className='text-5xl'>{chapter}</h2> :
              <>
                <h3 className='text-3xl'>{chapter}</h3>
                { paragraphs.map(paragraph => <p className='text-xl font-semibold' key={paragraph}>{paragraph}</p>) }
              </>
            }
          </section>
        )
      }
    </article>
  </>
}