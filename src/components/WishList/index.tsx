"use client";

import { useState, useEffect } from "react";
import useStore from "@/app/stores/store";
import ComicGrid from "../ComicGrid";
import Pagination from "./Pagination";
import  IComic  from "@/types/types"; // Ensure this is the correct path to your types

export default function WishList() {
  const { wishlist } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedWishlist, setPaginatedWishlist] = useState<IComic[]>([]);
  const itemsPerPage = 20;

  useEffect(() => {
    if (wishlist.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedWishlist(wishlist.slice(startIndex, endIndex));
    } else {
      setPaginatedWishlist([]);
    }
  }, [wishlist, currentPage]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const totalPages = Math.max(1, Math.ceil(wishlist.length / itemsPerPage));

  return (
    <section className="flex w-full h-full flex-col items-start justify-start py-5 mt-10 ">
      <div className="w-full flex justify-center">
        <h1 className="p-2 text-center mb-6 font-bold comic">
          {wishlist.length > 0 ? "Wishlist" : "Wishlist is empty"}
        </h1>
      </div>
      {wishlist.length > 0 ? (
        <>
          <div className="w-full flex flex-col items-center justify-center relative">
            <div className="bg-bg absolute w-full top-4 bottom-4 "></div>
            <ComicGrid items={paginatedWishlist} />
          </div>
          {wishlist.length > itemsPerPage && (
            <div className="w-full mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="w-full text-center mt-10">
          <p className="text-lg">Your wishlist is currently empty. Add some comics to see them here!</p>
        </div>
      )}
    </section>
  );
}
