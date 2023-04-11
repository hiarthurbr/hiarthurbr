import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
interface Resume {
  title: string
  chapters: Record<string, string[] | null>
  origin: string
}

const PaperClip = (props: Record<string, unknown>) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.7}
    { ...props }
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
    />
  </svg>
}

const Clipboard = (props: Record<string, unknown>) =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    { ...props }
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
    />
  </svg>

const Exclamation = (props: Record<string, unknown>) =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor"
    { ...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>


async function copyToClipboard(text: string): Promise<boolean> {
  async function returnQueryOnState(state: PermissionState): Promise<boolean> {
    try {
      // @ts-expect-error
      const result = await navigator.permissions.query({ name: "clipboard-write" })
      return result.state === state;
    } catch { return false }
  }

  /**
   * @deprecated
   */
  function copyFromElement(): boolean {
    console.warn("This method may return true even if the content was not copied.")
    const input = document.createElement('textarea');
    input.setAttribute('readonly', '');
    input.setAttribute('hidden', '');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    
    // verify if the content was copied
    const result = document.createElement('textarea');
    result.setAttribute('readonly', '');
    result.setAttribute('hidden', '');
    document.body.appendChild(result);
    result.select();
    document.execCommand('paste');
    const copied = result.value;
    document.body.removeChild(result);

    return copied === text;
  }

  if (await returnQueryOnState("denied")) {
    console.log("Permission to clipboard denied, trying legacy method...")
    try {
      const result = copyFromElement();
      if (result) console.log('Content copied to clipboard: "', text + '"');
      else throw result;
      return result;
    }
    catch {
      console.log("Failed to copy, giving up.")
      return false;
    }
  }
  else if (typeof navigator.clipboard !== "undefined") try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard: "', text + '"');
    return true;
  } catch (err) {
    console.log("Failed to copy, verifying permission...")
    if (!(await returnQueryOnState("denied"))) return copyFromElement();
    else return false
  }
  else return false;
}

export default function RPC() {
  const params = useParams();
  const [visible, setVisible] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedSuccessful, setCopiedSuccess] = useState<boolean | null>(null);
  const [title, setTitle] = useState<Resume["title"]>('');
  const [resume, setResume] = useState<Resume["chapters"]>({});
  const [origin, setOrigin] = useState<Resume["origin"]>('');

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace('#', ''))
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [resume])

  !title && axios.get(`${params.resume}.json`).then((res) => {
    const { title, chapters, origin } = res.data satisfies Resume;
    setTitle(title);
    setResume(chapters);
    setOrigin(origin);
  })

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
      <h1 className='text-7xl'>{title}</h1>
      {
        Object.entries(resume).map(([chapter, paragraphs]) => {
          let id = chapter.toLowerCase().replaceAll(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          while (id.includes('--')) id = id.replaceAll('--', '-');
          return <div key={chapter}>
              { paragraphs === null ?
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
                    { (copied === id && copiedSuccessful !== null) ? (
                      copiedSuccessful ? <Clipboard className='h-10 stroke-lime-500' /> : <Exclamation className='h-10 stroke-red-600' />
                    ) : <PaperClip className='h-10'/> }
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
                      { (copied === id && copiedSuccessful !== null) ? (
                        copiedSuccessful ? <Clipboard className='h-8 stroke-lime-500' /> : <Exclamation className='h-8 stroke-red-600' />
                      ) : <PaperClip className='h-8'/> }
                    </span>
                  </div>
                  { paragraphs.map(paragraph => <p className='text-xl font-semibold' key={paragraph}>{paragraph}</p>) }
                </section>
              }
            </div>
          }
        )
      }
    </article>
  </>
}