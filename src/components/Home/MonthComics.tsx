"use client";

import IComic from "@/types/types";
import CardImage from "../reusable/cardImage";
import Link from "next/link";

export default function MonthComics({ comics }: { comics: IComic[] }) {
  return (
    <section className="w-full px-8 py-4 flex container justify-center items-center self-center mx-auto">
      <div className="flex flex-col gap-6 w-full justify-center">
        <h2 className="text-2xl font-bold text-center mb-4 comic p-3 w-fit mx-auto bg-terciary">
          Last releases from this month
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full justify-center">
          {comics.map((comic) => {
            const hasImage = comic.images.length > 0;
            const imageUrl = hasImage
              ? `${comic.images[0].path}.${comic.images[0].extension}`
              : "";

            return (
              <li key={comic.id} className="group relative flex flex-col items-center comic overflow-hidden h-28 hover:-translate-y-2 transition-transform">
                <div className="relative w-full h-full">
                  <Link href={`/store/${comic.id}`} >
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-lg font-bold mb-4">${comic.price}</h2>
                  </div>
                    <CardImage
                      path={imageUrl}
                      height="full"
                      showShadow={false}
                      title={comic.title}
                    />
                  </Link>
                </div>
                <p className="text-sm absolute bottom-0 py-2 text-center text-darkText bg-text w-full p-2 truncate">
                  {comic.title}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
