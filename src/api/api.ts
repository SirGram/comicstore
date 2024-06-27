import type IComic from "@/types/types";
import { Filters } from "@/types/types";

export default async function fetchComic(
  comicId: string
): Promise<IComic | null> {
  const publicKey: string = process.env.PUBLIC_KEY || "";
  const hash: string = process.env.HASH_KEY || "";
  const ts: string = "1";

  if (!publicKey || !hash) {
    console.error("Missing environment variables for authentication");
    return null;
  }

  try {
    let url = `http://gateway.marvel.com/v1/public/comics/${comicId}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    const comics: IComic[] = data.data.results.map(mapComic);

    return comics[0];
  } catch (error) {
    console.error("Error fetching comic data:", error);
    return null;
  }
}
export async function fetchComics(
  filters?: Filters
): Promise<[IComic[], number]> {
  const publicKey: string = process.env.PUBLIC_KEY || "";
  const hash: string = process.env.HASH_KEY || "";
  const ts: string = "1";

  if (!publicKey || !hash) {
    console.error("Missing environment variables for authentication");
    return [[], 0];
  }

  try {
    let url = `http://gateway.marvel.com/v1/public/comics?&ts=${ts}&apikey=${publicKey}&hash=${hash}&formatType=comic&noVariants=true`;

    if (filters) {
      if (filters.series) {
        url += `&series=${filters.series}`;
      }
      if (filters.itemLimit) {
        url += `&limit=${filters.itemLimit}`;
      }
      if (filters.offset) {
        url += `&offset=${filters.offset}`;
      }
      if (filters.startYear && filters.startYear !== "unset") {
        url += `&startYear=${filters.startYear}`;
      }
      if (filters.format && filters.format !== "all") {
        url += `&format=${filters.format}`;
      }
      if (filters.titleStartsWith && filters.titleStartsWith.toLowerCase() !== "all") {
        url += `&titleStartsWith=${filters.titleStartsWith}`;
      }
      if (filters.searchTitle && filters.searchTitle !== "") {
        url += `&title=${filters.searchTitle}`;
      }
      if (filters.orderBy) {
        url += `&orderBy=${filters.orderBy}`;
      }
      if (filters.date && filters.date !== "unset") {
        url += `&dateDescriptor=${filters.date}`;
      }
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    const comics: IComic[] = data.data.results.map(mapComic);
    const totalComics: number = data.data.total;

    return [comics, totalComics];
  } catch (error) {
    console.error("Error fetching comic data:", error);
    return [[], 0];
  }
}




function mapComic(comicData: any): IComic {
  return {
    id: comicData.id,
    title: comicData.title.trim(),
    creators: comicData.creators.items
      ? comicData.creators.items.map(
          (creator: { name: string }) => creator.name
        )
      : [],
    description2: comicData.description ? comicData.description : undefined,
    description: comicData.textObjects[0]
      ? comicData.textObjects[0].text
      : undefined,
    issueNumber:
      comicData.issueNumber !== undefined ? comicData.issueNumber : undefined,
    series: comicData.series
      ? {
          seriesName: comicData.series.name,
          seriesURI: comicData.series.resourceURI,
        }
      : undefined,
    images: comicData.images
      ? comicData.images.map((image: any) => ({
          path: image.path,
          extension: image.extension,
        }))
      : [],
    pageCount:
      comicData.pageCount !== undefined ? comicData.pageCount : undefined,
    price: comicData.prices ? comicData.prices[0].price.toFixed(2) : 0.0,
    format: comicData.format ? comicData.format : undefined,
  };
}
