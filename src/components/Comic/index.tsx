"use client";

import { useEffect, useState } from "react";
import type IComic from "@/types/types";
import ComicInfo from "./ComicInfo";
import { useParams, useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../reusable/button";
import ScrollCards from "../reusable/scrollCards";
import useStore from "@/app/stores/store";
import Buy from "./Buy";

type ComicProps = {
  item: IComic | null;
  seriesItems?: IComic[];
};

export default function Comic({ item, seriesItems }: ComicProps) {
  const seenItemsLimit = 12;
  const [currentItem, setCurrentItem] = useState<IComic | null>(item);
  const { seenItems, setSeenItems } = useStore();
  const router = useRouter();
  const { id } = useParams();

  const updateSeenItems = (newSeenItem: IComic | null): void => {
    if (newSeenItem !== null) {
      const newSeenItems = [...seenItems];
      const isAlreadySeen = seenItems.some(
        (item) => item.id === newSeenItem.id
      );
      if (!isAlreadySeen) {
        newSeenItems.unshift(newSeenItem);
        if (newSeenItems.length > seenItemsLimit) {
          newSeenItems.pop();
        }
        setSeenItems(newSeenItems);
      }
    }
  };

  useEffect(() => {
    updateSeenItems(currentItem);
  }, [currentItem]);

  const handlePrevButton = () => {
    if (id) {
      const prevId = Number(id) - 1;
      if (prevId > 0) {
        router.push(`/store/${prevId}`);
      }
    }
  };

  const handleNextButton = () => {
    if (id) {
      const nextId = Number(id) + 1;
      if (nextId) {
        router.push(`/store/${nextId}`);
      }
    }
  };

  return (
    <section className="flex flex-col px-4 sm:px-10 my-5 w-full">
      <div className="flex flex-col w-full mt-3 gap-4">
        <div className="flex flex-col sm:flex-row justify-between w-full mb-4">
          <Button
            className="bg-transparent text-xl sm:text-2xl px-2 hover:opacity-50 transition-opacity mb-2 sm:mb-0"
            onClick={() => router.push("/store")}
          >
            <FaChevronLeft /> Store
          </Button>

          <div className="flex gap-2 sm:gap-4">
            <Button
              onClick={handlePrevButton}
              className="text-xl px-2 hover:opacity-50 transition-opacity flex-1 sm:flex-none"
            >
              <FaChevronLeft />
              <span className="hidden sm:inline">Previous comic</span>
              <span className="sm:hidden">Previous </span>
            </Button>
            <Button
              onClick={handleNextButton}
              className="text-xl px-2 hover:opacity-20 transition-opacity flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Next comic</span>
              <span className="sm:hidden text-right w-full">Next </span>
              <FaChevronRight />
            </Button>
          </div>
        </div>
        {currentItem ? (
          <>
            <div className="flex flex-col w-full md:flex-row gap-5 sm:gap-10 items-end lg:items-start">
              <ComicInfo currentItem={currentItem} />
              <Buy seriesItems={seriesItems} item={currentItem} />
            </div>
            {seriesItems && seriesItems.length > 0 && (
              <ScrollCards
                items={seriesItems}
                title="Other Issues"
                currentItem={item}
              />
            )}
            <ScrollCards
              items={seenItems}
              title="Recently Seen"
              currentItem={item}
            />
          </>
        ) : (
          <h1 className="w-full text-center">No comic was found for the provided id</h1>
        )}
      </div>
    </section>
  );
}