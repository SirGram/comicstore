

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ScrollCards from "@/components/reusable/scrollCards";
import type IComic from "@/types/types";
import fetchComic from "@/api/api";
import Comic from "@/components/Comic";

export default async function ComicPage({ params }: { params: { id: string } }) {
  const { id } = params

  const comic = await fetchComic(id);
  console.log("comic", comic);



  const handlePrevButton = () => {
  
  };
  const handleNextButton = () => {
   
  };
  if (!comic) {
    return <div>No comic was found</div>;
  }

  return (
   <Comic item={comic} />
  );
}
