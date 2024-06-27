
const comicFormatArray = [
  "all",
  "comic",
  "magazine",
  "trade paperback",
  "hardcover",
  "digest",
  "graphic novel",
  "digital comic",
  "infinite comic",
] as const;

const comicOrderByArray = [
  "focDate",
  "onsaleDate",
  "title",
  "issueNumber",
  "modified",
  "-focDate",
  "-onsaleDate",
  "-title",
  "-issueNumber",
  "-modified",
] as const;
const comicOrderBy2Array = [
  'asc', 'desc'
] as const

const comicLimitArray = ['10', '20', '50', '100'] as const;

const comicDateArray = ['unset', 'thisWeek' , 'thisMonth'] as const

type IComicFormat = (typeof comicFormatArray)[number];
type IComicLimit = (typeof comicLimitArray)[number];
type IComicOrderBy = (typeof comicOrderByArray)[number];
type IComicOrderBy2 = (typeof comicOrderBy2Array)[number];
type IComicDate = (typeof comicDateArray)[number];

export type { IComicFormat, IComicOrderBy, IComicLimit, IComicOrderBy2, IComicDate };
export { comicFormatArray, comicOrderByArray,comicOrderBy2Array, comicLimitArray, comicDateArray };

export default interface IComic {
  id: number;
  title: string;
  format: IComicFormat;
  creators: string[];
  price: number;
  description?: string;
  description2?: string;
  issueNumber?: number;
  series?: { seriesName: string; seriesURI: string };
  images: { path: string; extension: string }[];
  pageCount?: number;
}

export interface IComicCart extends IComic {
  quantity: number;
}

export  interface Filters {
  series?: string;
  format?: IComicFormat;
  searchTitle?: string;
  itemLimit?: IComicLimit;
  titleStartsWith?: string;
  orderBy?: IComicOrderBy;
  startYear?: string;
  orderBy2?: IComicOrderBy2 
  date?:IComicDate 
  offset?:string
}
