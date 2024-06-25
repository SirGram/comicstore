"use client";

import { useEffect, useState } from "react";
import type IComic from "@/types/types";
import ComicInfo from "./ComicInfo";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../reusable/button";

type ComicProps = {
  item: IComic;
};

export default function Comic({ item }: ComicProps) {
  const [currentItem, setCurrentItem] = useState<IComic>(item);
  const [visitedItems, setVisitedItems] = useState<IComic[]>([]);
  const [totalNumberIssues, setTotalNumberIssues] = useState<number>(0);

  const router = useRouter();

  const updateVisitedItems = (newVisitedItem: IComic | null): void => {
    if (newVisitedItem !== null) {
      const newVisitedItems = [...visitedItems];
      console.log("visited", visitedItems, newVisitedItem);
      const isAlreadyVisited = visitedItems.some(
        (item) => item.id === newVisitedItem.id
      );
      console.log("isAlreadyVisited", isAlreadyVisited);
      if (!isAlreadyVisited) {
        newVisitedItems.unshift(newVisitedItem);
        if (newVisitedItems.length > 12) {
          newVisitedItems.pop();
        }

        setVisitedItems(newVisitedItems);
      }
    }
  };

  useEffect(() => {
    updateVisitedItems(currentItem);
  }, [currentItem]);

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
      <div className="flex flex-col w-full px-5 mt-3">
        <div className="justify-between w-full flex mb-2">
          <Link href="/store" className="flex">
            <Button className="bg-transparent rounded-none text-2xl px-2 hover:opacity-50 transition-opacity">
            <FaChevronLeft /> Store
            </Button>
          </Link>
          <div className="flex gap-4">
            <Button
              onClick={handlePrevButton}
              className="text-xl px-2 hover:opacity-50 transition-opacity rounded-none"
            >
              <FaChevronLeft />
              Previous comic
            </Button>
            <Button
              onClick={handleNextButton}
              className="text-xl px-2 hover:opacity-20 transition-opacity rounded-none"
            >
              Next comic
              <FaChevronRight />
            </Button>
          </div>
        </div>
        <ComicInfo currentItem={currentItem} />
      </div>
      <div className=" flex-1 flex-col "> </div>
    </section>
  );
}
