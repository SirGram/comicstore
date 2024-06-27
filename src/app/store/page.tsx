import { fetchComics } from "@/api/api";
import ComicStore from "@/components/ComicStore";
import { Filters, IComicLimit } from "@/types/types";

export default async function Store({ searchParams }: { searchParams: Filters & { page: string } }) { 
  const page = parseInt(searchParams.page, 10) || 1;
  
  // Keep itemLimit as a string
  const itemLimit: IComicLimit = searchParams.itemLimit || "20";
  
  // Calculate offset using parsed values
  const offset = ((page - 1) * parseInt(itemLimit, 10)).toString();

  const filters: Filters = { 
    series: searchParams.series,
    format: searchParams.format,
    searchTitle: searchParams.searchTitle,
    itemLimit,
    titleStartsWith: searchParams.titleStartsWith,
    orderBy: searchParams.orderBy,
    startYear: searchParams.startYear,
    offset,
    orderBy2: searchParams.orderBy2,
    date: searchParams.date,
  };

  const [comics, totalComics] = await fetchComics(filters);

  return (
    <ComicStore items={comics} numberComics={totalComics} initialPage={page}  />
  );
}