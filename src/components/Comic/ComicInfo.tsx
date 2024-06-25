// components/IssueCard.tsx
import { useState } from 'react';
import CardImage from '@/components/reusable/cardImage'; // Adjust the import path as needed
import IComic from '@/types/types'; // Adjust the import path as needed

type Props = {
  currentItem: IComic;
};

export default function IssueCard({ currentItem }: Props) {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [showAllContent, setShowAllContent] = useState<boolean>(false);

  return (
    <div className="flex flex-col mb-7 w-full">
      <div className="flex gap-1 w-full h-full">
        <div className="shrink-0 flex flex-col bg-white">
          <div className="h-80 w-56 border-border border-2">
            {currentItem && (
              <CardImage
                path={`${currentItem.images[activeImage]?.path}.${currentItem?.images[activeImage].extension}`}
                title={currentItem?.title}
              />
            )}
          </div>
          <div className="my-3 mx-2 w-56 flex gap-2 flex-wrap">
            {currentItem &&
              currentItem.images.map((image, index) => (
                <div className={`w-9 h-14 `} key={index}>  
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
        <div className=" h-fit">
          <div
            className={`p-5 flex-1 bg-slate-100 flex flex-col overflow-hidden ${
              showAllContent ? "h-full" : "h-96"
            }`}
          >
            <h3 className="mb-5">{currentItem?.title}</h3>
            <div className="flex flex-col justify-center gap-1">
              <p className="mb-1">
                <span className="mr-2 font-semibold">SERIES:</span>
                <span>{currentItem?.series?.seriesName}</span>
              </p>
              <p className="mb-1">
                {currentItem?.creators?.length !== undefined &&
                currentItem.creators.length > 1 ? (
                  <span className="mr-2 font-semibold">CREATORS:</span>
                ) : (
                  <span className="mr-2 font-semibold">CREATOR:</span>
                )}
                <span>
                  {currentItem?.creators?.length === 0 ? (
                    <span>Unknown</span>
                  ) : (
                    currentItem?.creators?.map((creator, index) => (
                      <span key={index}>
                        {creator}
                        {index !== (currentItem?.creators?.length ?? 0) - 1 &&
                          ", "}
                      </span>
                    ))
                  )}
                </span>
              </p>
              <p className="mb-1">
                <span className="mr-2 font-semibold">PAGES:</span>
                <span>
                  {currentItem?.pageCount === 0
                    ? "Unknown"
                    : currentItem?.pageCount}
                </span>
              </p>
              <p className="mb-1">
                <span className="mr-2 font-semibold">FORMAT:</span>
                <span>{currentItem?.format}</span>
              </p>
              <p>
                <span className="mr-2 font-semibold">DESCRIPTION:</span>
                <span>
                  {" "}
                  {currentItem?.description ||
                    currentItem?.description2 ||
                    "No description available"}
                </span>
              </p>
            </div>
          </div>{" "}
          <div className="w-full justify-end flex bg-slate-100 py-1 pr-5">
          <button
            onClick={() => setShowAllContent(!showAllContent)}
            className="text-md px-2 hover:opacity-50 transition-opacity"
          >
            {showAllContent ? 'Show Less' : 'Show More'}
          </button></div>
        </div>
      </div>
    </div>
  );
}