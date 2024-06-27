"use client";

import { useEffect, useState } from "react";
import type IComic from "@/types/types";
import ComicInfo from "./ComicInfo";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../reusable/button";
import ScrollCards from "../reusable/scrollCards";
import useStore from "@/app/stores/store";
import Buy from "./Buy";

type ComicProps = {
  item: IComic;
  seriesItems?: IComic[];
};

export default function Comic({ item, seriesItems }: ComicProps) {
  const seenItemsLimit = 12;

  const [currentItem, setCurrentItem] = useState<IComic>(item);
  const [visitedItems, setVisitedItems] = useState<IComic[]>([]);
  const [totalNumberIssues, setTotalNumberIssues] = useState<number>(0);

  const { seenItems, setSeenItems } = useStore();

  console.log("seenItems", seenItems);

  const router = useRouter();

  const updateSeenItems = (newSeenItem: IComic | null): void => {
    if (newSeenItem !== null) {
      const newSeenItems = [...seenItems];
      const isAlreadySeen = seenItems.some(
        (item) => item.id === newSeenItem.id
      );
      console.log("isAlreadySeen", isAlreadySeen);
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
  }, [currentItem, updateSeenItems]);

  const handlePrevButton = () => {
    const prevId = currentItem.id - 1;

    if (prevId > 0) {
      router.push(`/store/${prevId}`);
    }
  };

  const handleNextButton = () => {
    const nextId = currentItem.id + 1;
    if (nextId) {
      router.push(`/store/${nextId}`);
    }
  };
  return (
    <section className="flex px-10 my-5  w-full">
      <div className="flex flex-col w-full px-5 mt-3 gap-4">
        <div className="justify-between w-full flex mb-4">
          <Button
            className="bg-transparent text-2xl px-2 hover:opacity-50 transition-opacity"
            onClick={() => router.push("/store")}
          >
            <FaChevronLeft /> Store
          </Button>

          <div className="flex gap-4">
            <Button
              onClick={handlePrevButton}
              className="text-xl px-2 hover:opacity-50 transition-opacity "
            >
              <FaChevronLeft />
              Previous comic
            </Button>
            <Button
              onClick={handleNextButton}
              className="text-xl px-2 hover:opacity-20 transition-opacity "
            >
              Next comic
              <FaChevronRight />
            </Button>
          </div>
        </div>
        <div className="flex gap-10">
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
      </div>
      <div className=" flex-1 flex-col "> </div>
    </section>
  );
}
