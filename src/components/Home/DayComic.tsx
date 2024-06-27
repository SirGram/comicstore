"use client";

import IComic from "@/types/types";
import ComicGrid from "../ComicGrid";
import { useState } from "react";
import CardImage from "../reusable/cardImage";
import Link from "next/link";
export default function DayComic({ comic }: { comic: IComic }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center ">
    <h2 className="mb-2 comic p-3">Comic of the Day</h2>
    <h5 className="w-80 text-center bg-secondary  comic p-3 -mb-2 z-10">{comic.title}</h5>
      <article className="flex flex-col gap-4 comic  w-80">
      <Link href={`/store/${comic.id}`}>
        <CardImage
          path={`${comic.images[0].path}.${comic.images[0].extension}`}
          height="full"
          showShadow={false}
          title={comic.title}
        />
        </Link>
      </article>
    </div>
  );
}
