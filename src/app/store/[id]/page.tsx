import fetchComic, { fetchComics } from "@/api/api";
import Loading from "@/app/loading";
import Comic from "@/components/Comic";
import IComic from "@/types/types";
import { Suspense } from "react";

export default async function ComicPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const comic = await fetchComic(id);
  console.log("comic", comic);

  
  let series : IComic[] = [];

  if (comic && comic.series && comic.series.seriesURI) {
    const seriesNumber = comic.series.seriesURI.split("/").pop();;
    try {
      const [fetchedSeries, _] = await fetchComics({ series: seriesNumber });
      series = fetchedSeries;
      console.log("series", series);
    } catch (error) {
      console.error("Error fetching series:", error);
      // You might want to handle this error more gracefully in the UI
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <Comic item={comic} seriesItems={series} />
       </Suspense>
  )
}