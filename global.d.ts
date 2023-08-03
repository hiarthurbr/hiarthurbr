export interface PageConfigRequired {
  title: string;
  description: string;
  showInHeader: boolean;
}

export type PageConfig = Partial<PageConfigRequired>;

export interface Resume {
  title: string
  chapters: Record<string, string[] | null>
  origin: string
}

export interface ResumeLinkIndex {
  name: string;
  link: string;
  hash: string
}

type hasWarning = [false] | [true, string]

export type ResumeIndex = [string, ResumeLinkIndex[], ...hasWarning]

export type ResumeLink = Record<string, ResumeIndex>