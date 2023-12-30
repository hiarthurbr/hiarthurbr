import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import anime, { AnimeInstance } from "animejs";
import Image from "next/image";

enum CV_Page {
  About = 0,
  Experience = 1,
  Education = 2,
  Skills = 3,
  Projects = 4,
  Contact = 5,
}

const duration = 1000;
const keyframes = [
  { start: '#FA05F0', end: '#AF00FA' },
  { start: '#5A00FA', end: '#0045FA' },
  { start: '#0FB0FA', end: '#0FFAAA' },
  { start: '#00FACB', end: '#00FA76' },
  { start: '#A8FA00', end: '#FAE700' },
  { start: '#FAA900', end: '#FA8A00' },
];

const CV = () => {
  const [page, setPage] = useState(CV_Page.About);
  const [orb, setOrb] = useState<AnimeInstance | null>(null);

  const stop_in = useMemo(() => {
    return Math.round(90 / ((duration * keyframes.length) / (duration * (page + 1))))
  }, [page]);
  const update = useCallback((a: AnimeInstance) => {
    const orb = document.getElementById("orb");
    const section = document.getElementById("section");
    if (orb && section) {
      const start = a.animations[0].currentValue;
      const end = a.animations[1].currentValue;

      if (a.progress > stop_in && !a.reversed) a.reverse();
      else if (a.progress < stop_in && a.reversed) a.reverse();

      const stop = ((() => {
        if (a.reversed)
          return Math.round(a.progress) <= stop_in;
        return Math.round(a.progress) >= stop_in;
      })());
      console.log(Math.round(a.progress), a.reversed ? 'less' : 'more', 'or equal to', stop_in, stop)

      if (stop) {
        console.error('stopping')
        a.pause();
      }

      orb.style.backgroundImage = `linear-gradient(180deg, ${start} 0%, ${end} 100%)`
      section.style.backgroundImage = `linear-gradient(180deg, ${start} 0%, ${end} 100%)`
    }
  }, [stop_in])

  // biome-ignore lint/correctness/useExhaustiveDependencies: We don't want to re-run this effect since it's only for initialization
  useEffect(() => {
    if (orb !== null) return;
    const el = document.getElementById("orb");
    setOrb(anime({
      targets: keyframes[0],
      keyframes,
      backgroundImage: el?.style.backgroundImage,
      duration: duration * keyframes.length,
      easing: 'easeOutQuad',
      autoplay: false,
      update,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orb) {
      orb.update = update;
      orb.play();
    }
  }, [update, orb]);

  return (
    <div className="w-full max-w-7xl max-xl:max-w-2xl select-none flex flex-row max-xl:flex-col justify-center items-center gap-10 dark:bg-slate-900 bg-slate-300 max-xl:rounded-xl rounded-2xl shadow-2xl bg-opacity-75 backdrop-blur-sm p-16 transition-all duration-500">
      <div className="relative w-fit h-fit">
        <div className="-animate-[spin_30s_linear_infinite] absolute top-0 left-0 z-10">
          <Image
            src="/mikuuu.png"
            alt="face"
            className="w-96 h-96 rounded-full scale-110"
            width={512}
            height={512}
            draggable={false}
          />
        </div>
        <div id="orb" className="w-96 h-96 rounded-full blur-md z-0" style={{
          backgroundImage: "linear-gradient(180deg, #FA05F0 0%, #AF00FA 100%)"
        }} />
        <div className="my-8">
          <h1 className="text-2xl font-bold">Arthur Bufalo Rodrigues</h1>
          <p className="dark:text-gray-300 text-gray-700 text-lg font-semibold">Self-taught Developer</p>
        </div>
      </div>
      <div className="h-full w-full mx-8 xl:self-start">
        <ul className="mb-4 -mt-8 py-4 px-5 flex flex-row capitalize dark:bg-slate-700 bg-slate-400 bg-opacity-50 dark:bg-opacity-75 backdrop-blur-sm rounded-lg justify-evenly">
          <li className="hover:-translate-y-1 transition-all duration-500" onClick={() => setPage(CV_Page.About)} onKeyDown={() => setPage(CV_Page.About)}>
            <a className="dark:text-white dark:hover:text-slate-300 hover:text-slate-700 text-slate-900 cursor-pointer font-bold" href={void 0}>About</a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-500" onClick={() => setPage(CV_Page.Experience)} onKeyDown={() => setPage(CV_Page.Experience)}>
            <a className="dark:text-white dark:hover:text-slate-300 hover:text-slate-700 text-slate-900 cursor-pointer font-bold" href={void 0}>Experience</a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-500" onClick={() => setPage(CV_Page.Education)} onKeyDown={() => setPage(CV_Page.Education)}>
            <a className="dark:text-white dark:hover:text-slate-300 hover:text-slate-700 text-slate-900 cursor-pointer font-bold" href={void 0}>Education</a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-500" onClick={() => setPage(CV_Page.Skills)} onKeyDown={() => setPage(CV_Page.Skills)}>
            <a className="dark:text-white dark:hover:text-slate-300 hover:text-slate-700 text-slate-900 cursor-pointer font-bold" href={void 0}>Skills</a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-500" onClick={() => setPage(CV_Page.Projects)} onKeyDown={() => setPage(CV_Page.Projects)}>
            <a className="dark:text-white dark:hover:text-slate-300 hover:text-slate-700 text-slate-900 cursor-pointer font-bold" href={void 0}>Projects</a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-500" onClick={() => setPage(CV_Page.Contact)} onKeyDown={() => setPage(CV_Page.Contact)}>
            <a className="dark:text-white dark:hover:text-slate-300 hover:text-slate-700 text-slate-900 cursor-pointer font-bold" href={void 0}>Contact</a>
          </li>
        </ul>
        <div id="section" className="p-2.5 rounded-2xl max-xl:rounded-xl min-h-full h-96">
          <div className="bg-slate-300 dark:bg-slate-700 rounded-lg bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm min-h-full text-white">
            {
              page === CV_Page.About ? <About /> :
                page === CV_Page.Experience ? <Experience /> :
                  page === CV_Page.Education ? <Education /> :
                    page === CV_Page.Skills ? <Skills /> :
                      page === CV_Page.Projects ? <Projects /> :
                        page === CV_Page.Contact ? <Contact /> :
                          <>You somehow broke my cv, congrats</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CV;

const About = () => {
  return (
    <section className="p-4">
    </section>
  )
}

const Experience = () => {
  const now = Date.now();
  const js_exp = (new Date(2019, 10, 1)).getTime();
  const react_exp = (new Date(2020, 1, 1)).getTime();
  const nextjs_exp = (new Date(2021, 2, 1)).getTime();
  const rust_exp = (new Date(2022, 11, 1)).getTime();
  const cpp_exp = (new Date(2021, 2, 1)).getTime();
  const python_exp = (new Date(2020, 2, 1)).getTime();
  const linux_exp = (new Date(2020, 7, 1)).getTime();
  const aws_exp = (new Date(2022, 6, 1)).getTime();

  const calcExp = (startDate: number) => {
    const diffTime = Math.abs(now - startDate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(diffYears);
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold">Experience</h2>
      <ul className="list-disc list-inside">
        <li>{calcExp(js_exp)} years experience in TypeScript/JavaScript</li>
        <li>{calcExp(react_exp)} years experience in React</li>
        <li>{calcExp(nextjs_exp)} years experience in Next.js</li>
        <li>{calcExp(rust_exp)} year experience in Rust</li>
        <li>{calcExp(cpp_exp)} years experience in C++</li>
        <li>{calcExp(python_exp)} years experience in Python</li>
        <li>{calcExp(linux_exp)} years experience in Linux server</li>
        <li>{calcExp(aws_exp)} years experience in AWS</li>
      </ul>
    </section>
  )
}

const Education = () => {
  return (
    <section className="p-4">
      <h2 className="text-xl font-bold">Medals</h2>
      <ul className="list-disc list-inside">
        <li>Bronze medal in the Canguru Matemática 2018</li>
        <li>Honorable mention medal in the Canguru Matemática 2019</li>
        <li>Honorable mention medal in the Brazilian Mathematical Olympiad of Public Schools (OBMEP) 2022</li>
        <li>Silver medal in the Brazilian Astronomy and Astronautics Olympiad (OBA) 2022</li>
        <li>Silver medal in the Olympiad of Knowledge (OBA) 2023</li>
      </ul>
      <h2 className="text-xl font-bold">Education</h2>
      <p>Systems Development Engineering Certificate at ETEC Rosa Perrone Scavone, São Paulo (2020-2023)</p>
    </section>
  )
}

const Skills = () => {
  return (
    <section className="p-4">
      <p>My skills</p>
    </section>
  )
}

const Projects = () => {
  return (
    <section className="p-4">
      <p>My projects</p>
    </section>
  )
}

const Contact = () => {
  return (
    <section className="p-4">
      <h2 className="text-xl font-bold">Contact Information</h2>
      <p>Full Name: Arthur Bufalo Rodrigues</p>
      <p>Phone: +55 11 95478-2329</p>
      <p>Email: arthurbr@cdmd.dev or contact@arthurbr.me</p>
      <p>Github: <a href="https://github.com/Ar7hurz1nh0">github.com/Ar7hurz1nh0</a></p>
    </section>
  )
}