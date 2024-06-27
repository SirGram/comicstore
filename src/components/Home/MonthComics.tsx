"use client";

import IComic from "@/types/types";
import ComicGrid from "../ComicGrid";
import CardImage from "../reusable/cardImage";
import Link from "next/link";

export default function MonthComics({ comics }: { comics: IComic[] }) {
  return (
    <section className="w-full px-8 py-4 flex ">
      <div className="flex flex-col gap-6 w-full justify-center">
        <h2 className="text-2xl font-bold text-center mb-4 comic p-3 w-fit mx-auto bg-terciary">Last Releases from This Month</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full justify-center ">
          {comics.map((comic) => {
            const hasImage = comic.images.length > 0;
            return (
              <li key={comic.id} className="flex flex-col items-center comic overflow-hidden h-28 hover:-translate-y-2 transition-transform">
                <Link href={`/store/${comic.id}`}>
                
                <CardImage
                  path={hasImage ? `${comic.images[0].path}.${comic.images[0].extension}` : ''}
                  height="full"
                  showShadow={false}
                  title={comic.title}
                />
                
                <p className="text-sm text-center  text-darkText bg-text w-full p-2 truncate">{comic.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
