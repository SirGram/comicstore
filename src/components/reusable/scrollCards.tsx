import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CardImage from "@/components/reusable/cardImage";
import Comic from "@/types/types";
import { useRouter } from "next/navigation";

export default function ScrollCards({
  currentItem,
  items,
  title,
}: {
  currentItem: Comic | null;
  items: Comic[];
  title: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const router = useRouter();

  const onClickCard = (item: Comic) => {
    router.push(`/store/${item.id}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the container width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft + container.clientWidth <
            container.scrollWidth - 1
        );
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial scroll state
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <article className="flex flex-col flex-1 rounded-base w-full p-2 px-4 overflow-hidden comic bg-secondary">
      <div className="flex justify-between items-center ">
        {title && <h3 className="flex-1">{title}</h3>}
        <div className="flex">
          <button
            onClick={() => scroll("left")}
            className={`mr-1 text-xl size-8 bg-tertiary flex items-center justify-center border-border border-2 rounded-base ${
              canScrollLeft
                ? "hover:opacity-50 transition-opacity"
                : "opacity-10 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
          >
            <FaChevronLeft className="w-full" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`text-xl size-8 bg-tertiary flex items-center justify-center border-border border-2 rounded-base ${
              canScrollRight
                ? "hover:opacity-50 transition-opacity"
                : "opacity-10 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
          >
            <FaChevronRight className="w-full" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-none  rounded-base overflow-hidden relative border-border border-[3px] hover:-translate-y-2 mt-2 transition-transform ${
              currentItem?.title === item.title &&
              currentItem?.description === item.description
                ? "pointer-events-none"
                : ""
            }`}
            style={{ scrollSnapAlign: "start" }}
          >
            <button onClick={() => onClickCard(item)} className="w-40  ">
              <div className="">
                {item && (
                  <CardImage
                    path={
                      item.images[0]
                        ? `${item.images[0].path}.${item.images[0].extension}`
                        : ""
                    }
                    title={item.title}
                    height="full"
                    showShadow={false}
                  />
                )}
              </div>
              <h5
                className={`absolute bottom-0 text-center w-full border-t-[3px] border-border py-2 z-20 ${
                  currentItem?.title === item.title &&
                  currentItem?.description === item.description
                    ? "bg-secondary"
                    : "bg-tertiary"
                }`}
              >
                #{item.issueNumber}
              </h5>
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
