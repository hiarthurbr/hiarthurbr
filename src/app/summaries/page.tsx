"use client";
import axios from "@lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ResumeLink } from "@global";

export default function RPC() {
  const [resumes, setResumes] = useState<ResumeLink | null>(null);

  useEffect(() => {
    axios.get("/summaries/summaries.json").then((response) => {
      setResumes(JSON.parse(response.data));
    });
  }, []);

  return (
    <>
      <article className="prose dark:prose-invert select-none mx-auto py-8">
        <h1 className="text-7xl">Resumos</h1>
        {resumes ? (
          Object.keys(resumes).map((key) => (
            <div key={key}>
              <h2>{resumes[key][0]}</h2>
              <ul>
                {resumes[key][1].map((resume) => (
                  <li key={resume.link} className="m-5">
                    <Link
                      className="font-bold text-xl ease-in-out duration-200"
                      href={`/summaries/${key}/${resume.link}`}
                    >
                      {resume.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <h2>Loading</h2>
        )}
      </article>
    </>
  );
}
