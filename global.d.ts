export interface PageConfigRequired {
  title: string;
  description: string;
  showInHeader: boolean;
}

export type PageConfig = Partial<PageConfigRequired>;

export interface Summary {
  title: string;
  chapters: Record<string, string[] | null>;
  origin: string;
}

export interface SummaryLinkIndex {
  name: string;
  link: string;
  hash: string;
}

type hasWarning = [false] | [true, string];

export type SummaryIndex = [string, SummaryLinkIndex[], ...hasWarning];

export type SummaryLink = Record<string, SummaryIndex>;
