"use client";

import IComic from "@/types/types";
import CardImage from "../reusable/cardImage";
import Link from "next/link";

export default function DayComic({ comic }: { comic: IComic }) {
  return (
    <div className="flex flex-col justify-center items-center  w-full p-10 relative">
      <div className="bg-dots  bg-repeat bg-right-top  bg-cover inset-4  absolute h-full -z-10"></div>
      <h2 className="mb-2 comic p-3">Comic of the Day</h2>
      <h5 className="w-80 text-center bg-secondary comic p-3 -mb-2 z-20">
        {comic.title}
      </h5>
      <article className="flex flex-col gap-4 comic w-80 relative group   bg-center">
        <Link href={`/store/${comic.id}`}>
          <div className="relative w-full h-full">
            <h2 className="inset-0 z-10 h-full absolute bg-overlay justify-center items-center flex bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ${comic.price}
            </h2>
            <CardImage
              path={`${comic.images[0].path}.${comic.images[0].extension}`}
              height="full"
              showShadow={false}
              title={comic.title}
            />
          </div>
        </Link>
      </article>
    </div>
  );
}
