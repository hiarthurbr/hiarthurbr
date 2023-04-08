import axios from 'axios';
import { useState } from 'react';
type resumes = typeof import('../../../public/resumes.json');

export default function RPC() {
  const [resumes, setResumes] = useState<resumes>([]);

  function isResume(resume: any): resume is resumes[0] {
    return typeof resume.name === "string" && typeof resume.link === "string";
  }

  !resumes.length && axios.get('/resumes.json').then((res) => {
    const resumes = res.data;
    if (Array.isArray(resumes)) {
      const filteredResumes = resumes.filter(isResume);
      setResumes(filteredResumes);
    }
  })

  return <>

    <article className='prose dark:prose-invert select-none'>
      <h1 className='text-7xl'>Resumos</h1>
      <ul>
        {
          resumes.map((resume) =>
            <li key={resume.link} className='m-5'>
              <a className='font-bold text-xl ease-in-out duration-200' href={`/summaries/${resume.link}`}>{resume.name}</a>
            </li>
          )
        }
      </ul>
    </article>
  </>
}

export const config: PageConfig = {
  title: 'Resumos',
  description: 'Resumos de livros e artigos',
  showInHeader: true,
}