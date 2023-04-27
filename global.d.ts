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

export type ResumeIndex = [string, ResumeLinkIndex[]]

export type ResumeLink = Record<string, ResumeIndex>