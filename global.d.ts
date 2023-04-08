declare interface PageConfigRequired {
  title: string;
  description: string;
  showInHeader: boolean;
}

declare type PageConfig = Partial<PageConfigRequired>;