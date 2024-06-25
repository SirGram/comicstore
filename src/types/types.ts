export default interface IComic {
  id: number;
  title: string;
  format: ComicFormat;
  creators: string[];
  price: number;
  description?: string;
  description2?: string;
  issueNumber?: number;
  series?: { seriesName: string; seriesURI: string };
  images: { path: string; extension: string }[];

  pageCount?: number;
}

export type IComicDate = "thisWeek" | "lastWeek" | "thisMonth" | "nextWeek";
export type IComicLimit = 10 | 20 | 50 | 100;
export type IComicFormat =
  | "all"
  | "comic"
  | "magazine"
  | "trade paperback"
  | "hardcover"
  | "digest"
  | "graphic novel"
  | "digital comic"
  | "infinite comic";

export enum IComicOrderBy {
  FocDate = "focDate",
  OnSaleDate = "onsaleDate",
  Title = "title",
  IssueNumber = "issueNumber",
  Modified = "modified",
  DescFocDate = "-focDate",
  DescOnSaleDate = "-onsaleDate",
  DescTitle = "-title",
  DescIssueNumber = "-issueNumber",
  DescModified = "-modified",
}
