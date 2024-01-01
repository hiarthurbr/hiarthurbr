import { useCallback, useEffect, useMemo, useState } from "react";
import anime, { AnimeInstance } from "animejs";
import Image from "next/image";
import { CircularProgress, Card, CardHeader, CardBody, CardFooter, Divider, Link, Progress } from "@nextui-org/react";
import { AnchorIcon } from "@components/svgs";
import { match } from "ts-pattern"

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

const calcYears = (startDate: number) => {
  const diffTime = Math.abs(now - startDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(diffYears);
};

const now = Date.now();
const birth = (new Date(2004, 11, 28)).getTime();

const js_exp = (new Date(2019, 10, 1)).getTime();
const react_exp = (new Date(2020, 1, 1)).getTime();
const nextjs_exp = (new Date(2021, 2, 1)).getTime();
const rust_exp = (new Date(2022, 11, 1)).getTime();
const cpp_exp = (new Date(2021, 2, 1)).getTime();
const python_exp = (new Date(2020, 2, 1)).getTime();
const linux_exp = (new Date(2020, 7, 1)).getTime();
const aws_exp = (new Date(2022, 6, 1)).getTime();

const js_years = calcYears(js_exp);
const react_years = calcYears(react_exp);
const nextjs_years = calcYears(nextjs_exp);
const rust_years = calcYears(rust_exp);
const cpp_years = calcYears(cpp_exp);
const python_years = calcYears(python_exp);
const linux_years = calcYears(linux_exp);
const aws_years = calcYears(aws_exp);

const js_text = js_years > 1 ? 'years' : 'year';
const react_text = react_years > 1 ? 'years' : 'year';
const nextjs_text = nextjs_years > 1 ? 'years' : 'year';
const rust_text = rust_years > 1 ? 'years' : 'year';
const cpp_text = cpp_years > 1 ? 'years' : 'year';
const python_text = python_years > 1 ? 'years' : 'year';
const linux_text = linux_years > 1 ? 'years' : 'year';
const aws_text = aws_years > 1 ? 'years' : 'year';

const CV = () => {
  console.log(new Date(now).toLocaleString());
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

  const Page = match(page)
    .with(CV_Page.About, () => <About />)
    .with(CV_Page.Experience, () => <Experience />)
    .with(CV_Page.Education, () => <Education />)
    .with(CV_Page.Skills, () => <Skills />)
    .with(CV_Page.Projects, () => <Projects />)
    .with(CV_Page.Contact, () => <Contact />)
    .otherwise(() => <About />)

  return (
    <div className="w-full max-w-7xl max-xl:max-w-2xl max-sm:px-0 max-xl:px-8 max-sm:max-w-full select-none flex flex-row max-xl:flex-col justify-center items-center gap-10 dark:bg-slate-900 bg-slate-300 max-xl:rounded-xl rounded-2xl shadow-2xl bg-opacity-75 backdrop-blur-sm p-16 transition-all duration-500">
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
        <div className="my-8 xl:mt-14 xl:mb-2">
          <h1 className="text-2xl font-bold">Arthur Bufalo Rodrigues</h1>
          <p className="dark:text-gray-300 text-gray-700 text-lg font-semibold">Web/System Developer</p>
        </div>
      </div>
      <div className="h-full w-full mx-8 xl:self-start">
        <ul className="mb-4 -mt-8 py-4 px-5 max-sm:px-0 flex flex-row max-sm:grid max-sm:grid-flow-row max-sm:grid-cols-3 max-sm:gap-6 capitalize dark:bg-slate-700 bg-slate-400 bg-opacity-50 dark:bg-opacity-75 backdrop-blur-sm rounded-lg justify-evenly">
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
          <div className="bg-slate-300 dark:bg-slate-700 rounded-lg bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm text-white overflow-scroll h-full">
            {Page}
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
      <h2 className="text-2xl font-bold my-2">About me</h2>
      <p className="leading-snug py-1 text-lg">
        Hi! My name is Arthur, I am {calcYears(birth)} years old and I am a self-taught Brazilian developer.
      </p>
      <p className="leading-none py-1 text-lg">
        When I started programming, in web development, I liked backend more than frontend, but found myself frequently visiting the frontend side of things. I still think that backend is more interesting, but I do like to make pretty things in the frontend too.
      </p>
      <p className="leading-snug py-1 text-lg">
        Other than programming, I really like all kinds of art, be it music, cinema, paintings, photography, even games. I do like to play games, but I have found myself playing less in favor of programming.
      </p>
      <p className="leading-snug py-1 text-lg">
        Also, I really like challenges, and if I can&apos;t find one, I make one myself (I am looking at you, <Link isExternal showAnchorIcon href="https://ar7hurz1nh0/redstone" className="dark:text-cyan-600">ar7hurz1nh0/redstone</Link>).
      </p>
    </section>
  )
}

const Experience = () => {

  return (
    <section className="p-4">

      <div>
        <h2 className="text-2xl font-bold my-2">Experience</h2>
        <ul className="list-disc list-inside text-left leading-snug font-semibold mx-4">
          <li>{js_years} {js_text} experience in TypeScript/JavaScript</li>
          <li>{react_years} {react_text} experience in React</li>
          <li>{nextjs_years} {nextjs_text} experience in Next.js</li>
          <li>{rust_years} {rust_text} experience in Rust</li>
          <li>{cpp_years} {cpp_text} experience in C++</li>
          <li>{python_years} {python_text} experience in Python</li>
          <li>{linux_years} {linux_text} experience in Linux server</li>
          <li>{aws_years} {aws_text} experience in AWS</li>
        </ul>
      </div>
    </section>
  )
}

const Education = () => {
  return (
    <section className="p-4">
      <div className="">
        <h2 className="text-2xl font-bold my-2">Academic Experience</h2>
        <p className="leading-tight text-justify mx-4">Systems Development Engineering Certificate at ETEC Rosa Perrone Scavone (2020-2023)</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold my-2">Medals</h2>
        <ul className="list-disc list-inside text-justify leading-snug mx-4">
          <li>Bronze medal in the Canguru Matemática 2018</li>
          <li>Honorable mention medal in the Canguru Matemática 2019</li>
          <li>
            <Link isExternal showAnchorIcon href="https://premiacao.obmep.org.br/17obmep/verRelatorioPremiadosMencao-SP.3.do.htm" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-300 dark:hover:text-slate-400 transition-all duration-500 hover:underline font-semibold">
              Honorable mention medal in the Brazilian Mathematical Olympiad of Public Schools (OBMEP) 2022
            </Link>
          </li>
          <li>
            <Link isExternal showAnchorIcon href="http://www.oba.org.br/site/index.php/zerouminforma.com.br/estudante-da-escola-do-sesi-de-dourados-recebe-medalha-de-ouro-na-olimpiada-brasileira-de-astronomia-e-astronautica/?p=conteudo&idcat=22&pag=conteudo&acao=mostra&idaluno=224983&olimp=oba&ed=2022" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-300 dark:hover:text-slate-400 transition-all duration-500 hover:underline font-semibold">
              Silver medal in the Brazilian Olympiad of Astronomy and Astronautics (OBA) 2022
            </Link>
          </li>
          <li>
            <Link isExternal showAnchorIcon href="https://drive.google.com/file/d/15Ec4AwZR9edky3y6SWlPDfFGXQbDUygY/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-300 dark:hover:text-slate-400 transition-all duration-500 hover:underline font-semibold">
              Silver medal in the Brazilian Olympiad of Knowledge (OBS) 2023
            </Link>
          </li>
          <li>
            <Link isExternal showAnchorIcon href="http://www.robotica.cpscetec.com.br/verEventos.php?pag=54" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-300 dark:hover:text-slate-400 transition-all duration-500 hover:underline font-semibold">
              Second place in the CEETEPS Programming Marathon 2023
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

const Skills = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mt-2 mb-4">Coding confidence</h2>
      <div className="grid grid-flow-row md:grid-cols-5 grid-cols-3 gap-8 justify-evenly justify-items-center">
        <CircularProgress
          label="TypeScript"
          size="lg"
          value={95}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="JavaScript"
          size="lg"
          value={90}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="React"
          size="lg"
          value={85}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="NextJS"
          size="lg"
          value={85}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="Rust"
          size="lg"
          value={80}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="C++"
          size="lg"
          value={65}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="Python"
          size="lg"
          value={70}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="Dart"
          size="lg"
          value={70}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="PHP"
          size="lg"
          value={50}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="C#"
          size="lg"
          value={70}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
        <CircularProgress
          label="Java"
          size="lg"
          value={65}
          color="success"
          showValueLabel={true}
          className="scale-110 -translate-x-2 translate-y-1.5"
        />
      </div>
      <h2 className="text-2xl font-bold mt-6 my-4">Language Skills</h2>
      <div className="grid grid-flow-row grid-cols-2 gap-8 justify-evenly items-center">
        <Progress
          label="Portuguese"
          size="md"
          value={100}
          color="success"
          showValueLabel={true}
          className="w-full"
        />
        <Progress
          label="English"
          size="md"
          value={80}
          color="success"
          showValueLabel={true}
          className="w-full"
        />
        <Progress
          label="Spanish"
          size="md"
          value={20}
          color="success"
          showValueLabel={true}
          className="w-full"
        />
      </div>
    </section>
  )
}

const Projects = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mt-2 mb-4">Projects</h2>
      <div className="grid grid-flow-row grid-cols-2 max-sm:grid-cols-1 gap-8 justify-evenly items-center max-sm:mx-12">
        <Card className="w-full h-full">
          <CardHeader>
            <p>
              <span className="text-default-300">cyrusium/</span>
              <span className="text-md">hermes</span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="leading-snug">Open Source Community driven bus routing/mapping application.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/cyrusium/hermes"
            >
              Visit project on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <p>
              <span className="text-default-300">Ar7hurz1nh0/</span>
              <span className="text-md">redstone</span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="leading-snug">Minecraft Protocol implementation in Rust.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/Ar7hurz1nh0/redstone"
            >
              Visit project on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <p>
              <span className="text-default-300">Ar7hurz1nh0/</span>
              <span className="text-md">mcmngr</span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="leading-snug">The ultimate remote Minecraft server management tool.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/Ar7hurz1nh0/mcmngr"
            >
              Visit project on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <p>
              <span className="text-default-300">Ar7hurz1nh0/</span>
              <span className="text-md">utils</span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="leading-snug">Lifesaver functions & constants in multiple languages that I write over time.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/Ar7hurz1nh0/utils"
            >
              Visit project on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
      <h3 className="py-4 font-bold">More projects available at my <Link isExternal showAnchorIcon href="https://github.com/ar7hurz1nh0">GitHub</Link></h3>
    </section>
  )
}

const Contact = () => {
  return (
    <section className="p-4 text-justify mx-8">
      <h2 className="text-2xl font-bold mt-2 mb-4 text-center">Contact Information</h2>
      <p className="leading-snug">
        <span className="font-bold">Full Name:{' '}</span>
        Arthur Bufalo Rodrigues
      </p>
      <p className="leading-snug">
        <span className="font-bold">Phone:{' '}</span>
        <Link className="dark:text-cyan-600" showAnchorIcon anchorIcon={<AnchorIcon />} href="tel:+55 11 95478-2329">+55 11 95478-2329</Link>
      </p>
      <p className="leading-snug">
        <span className="font-bold">E-Mail:{' '}</span>
        <Link className="dark:text-cyan-600" showAnchorIcon anchorIcon={<AnchorIcon />} href="mailto:arthurbr@cdmd.dev">arthurbr@cdmd.dev</Link>
        or{' '}
        <Link className="dark:text-cyan-600" showAnchorIcon anchorIcon={<AnchorIcon />} href="mailto:contact@arthurbr.me">contact@arthurbr.me</Link>
      </p>
      <p className="leading-snug">
        <span className="font-bold">GitHub:{' '}</span>
        <Link className="dark:text-cyan-600" isExternal showAnchorIcon href="https://github.com/Ar7hurz1nh0">github.com/Ar7hurz1nh0</Link>
      </p>
      <p className="leading-snug">
        <span className="font-bold">LinkedIn:{' '}</span>
        <Link className="dark:text-cyan-600" isExternal showAnchorIcon href="https://www.linkedin.com/in/ArthurBR">linkedin.com/in/ArthurBR</Link>
      </p>
    </section>
  )
}