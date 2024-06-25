import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import CardImage from "@/components/reusable/cardImage";
import Comic from "@/types/types"

export default function ScrollCards({
  currentItem,
  items,
  setCurrentItem,
  title,
}: {
  currentItem: Comic | null;
  items: Comic[];
  setCurrentItem: (updateComic: Comic | null) => void;
  title: string;
}) {
  const onClickCard = (item: Comic) => {
    console.log(item);
    setCurrentItem(item);
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth: number | undefined =
        scrollContainerRef.current.firstElementChild?.clientWidth;
      if (cardWidth !== undefined) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = Math.max(cardWidth, containerWidth - cardWidth);
        scrollContainerRef.current.scrollBy({
          left: -scrollWidth!,
          behavior: "smooth",
        });
      }
    }
  };
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const canScrollLeft = container.scrollLeft > 0;
        const canScrollRight =
          container.scrollLeft + container.clientWidth <
          container.scrollWidth - 10;
        console.log(
          container.scrollLeft,
          container.clientWidth,
          container.scrollWidth
        );
        // Update state variables
        setCanScrollLeft(canScrollLeft);
        setCanScrollRight(canScrollRight);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth: number | undefined =
        scrollContainerRef.current.firstElementChild?.clientWidth;
      if (cardWidth !== undefined) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = Math.max(cardWidth, containerWidth - cardWidth);
        scrollContainerRef.current.scrollBy({
          left: scrollWidth!,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="flex flex-col flex-1 overflow-hidden w-0">
      <div className="flex  h-full justify-end ">
        <div className="flex-1 h-full">
          {title && (
            <h3 className="flex-1 bg-slate-300 h-full w-max  py-1 px-3">
              {title}
            </h3>
          )}
        </div>
        <button
          onClick={scrollLeft}
          className={`text-xl px-2  flex items-center ${
            canScrollLeft ? "hover:opacity-50 transition-opacity" : ""
          } ${!canScrollLeft && "opacity-10"}`}
          disabled={!canScrollLeft}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className={`text-xl px-2  flex items-center ${
            canScrollRight ? "hover:opacity-50 transition-opacity" : ""
          } ${!canScrollRight && "opacity-10"}`}
          disabled={!canScrollRight}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className=" bg-slate-300">
        <div
          ref={scrollContainerRef}
          className=" bg-slate-100 flex flex-row overflow-x-hidden w-auto "
          style={{
            scrollSnapType: "x mandatory", // Enable horizontal scroll snapping
          }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={`flex flex-col justify-center bg-white border-solid border-8 ${
                currentItem &&
                currentItem.title === item.title &&
                currentItem.description === item.description
                  ? " border-slate-800 pointer-events-none"
                  : "border-slate-200"
              }`}
              onClick={() => onClickCard(item)}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="h-48 w-32">
                {item &&
                <CardImage
                  path={`${item.images[0].path}.${item.images[0].extension}`}
                  title={item.title}
                  height="full"
                />}
              </div>

              <h5 className=" text-center w-full">#{item.issueNumber}</h5>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
