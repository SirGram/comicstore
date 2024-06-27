// components/IssueCard.tsx
import { useState, useRef, useEffect } from "react";
import CardImage from "@/components/reusable/cardImage";
import IComic from "@/types/types";

type Props = {
  currentItem: IComic;
};

export default function ComicInfo({ currentItem }: Props) {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [showAllContent, setShowAllContent] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [currentItem]);

  return (
    <div className="flex flex-col mb-7 w-full">
      <div className="flex gap-6 w-full h-full">
        <div className="shrink-0 flex flex-col">
          <div className="h-80 w-56 border-border border-2 mb-4">
            {currentItem && (
              <CardImage
                path={`${currentItem.images[activeImage]?.path}.${currentItem?.images[activeImage].extension}`}
                title={currentItem?.title}
              />
            )}
          </div>
          <div className="py-3 px-2 max-w-56 flex items-center justify-around gap-2 flex-wrap comic w-fit">
            {currentItem &&
              currentItem.images.map((image, index) => (
                <div className={`w-9 h-14 m-[1px] `} key={index}>
                  <button onClick={() => setActiveImage(index)}>
                    <CardImage
                      path={`${image.path}.${image.extension}`}
                      title={currentItem.title}
                      showShadow={activeImage === index}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="comic flex flex-wrap gap-2 bg-secondary mb-4  w-fit mx-auto self-center justify-center">
            {currentItem?.creators?.map((creator, index) => (
              <span key={index} className=" px-2 py-1 rounded">
                {creator}
              </span>
            ))}
          </p>
          <div className="comic bg-transparent flex-1 flex flex-col border-2 border-border">
            <div className="bg-secondary p-4 border-b-2 border-border">
              <h1 className="text-2xl font-bold">{currentItem?.title}</h1>
              <h3 className="text-lg">{currentItem?.series?.seriesName}</h3>
            </div>
            <div className="flex flex-col flex-grow">
              <div
                ref={contentRef}
                className={`p-5 flex-1 flex flex-col bg-terciary transition-all duration-300 ease-in-out overflow-hidden`}
                style={{
                  maxHeight: showAllContent ? `${contentHeight}px` : "200px",
                }}
              >
                <h4 className="mb-4 font-normal leading-relaxed">
                  {currentItem?.description ||
                    currentItem?.description2 ||
                    "No description available"}
                </h4>
              </div>
            </div>
            <div className="w-full flex justify-between items-center p-3 border-t-2 border-border bg-secondary">
              <div className="flex gap-4">
                {currentItem?.pageCount !== undefined && (
                  <span className="font-semibold">
                    {currentItem.pageCount === 0
                      ? "Unknown"
                      : currentItem.pageCount}{" "}
                    pages
                  </span>
                )}
                <span className="font-semibold">{currentItem?.format}</span>
              </div>
              <button
                onClick={() => setShowAllContent(!showAllContent)}
                className="text-md px-4 py-2 bg-main hover:bg-opacity-80 transition-colors comic"
              >
                {showAllContent ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
