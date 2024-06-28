"use client";

import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Button from "../reusable/button";
import { useState, useEffect } from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }:{currentPage:number, totalPages:number, onPageChange:(page:number) => void}) {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  
  const [windowWidth, setWindowWidth] = useState(
    window  ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  return (
    <ReactPaginate
      initialPage={currentPage - 1}
      className="w-full flex items-center justify-center gap-1 sm:gap-2"
      containerClassName="pagination"
      pageRangeDisplayed={isMobile ? 1 : 3}
      marginPagesDisplayed={isMobile ? 1 : 2}
      pageClassName="page-item"
      pageLinkClassName={`comic font-light  text-darkText inline-block px-2 py-1 sm:px-3 sm:py-1 text-sm sm:text-base text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]`}
      activeClassName="active "
      activeLinkClassName="bg-mainAccent text-text font-extrabold"
      previousClassName="previous-page"
      nextClassName="next-page"
      onPageChange={handlePageChange}
      pageCount={totalPages}
      breakLabel="..."
      previousLabel={
        <IconContext.Provider value={{ color: "black", size: isMobile ? "18px" : "24px" }}>
          <Button className="comic mr-1 sm:mr-4 p-1 sm:p-2 ">
            <FaChevronLeft />
          </Button>
        </IconContext.Provider>
      }
      nextLabel={
        <IconContext.Provider value={{ color: "black", size: isMobile ? "18px" : "24px" }}>
          <Button className="comic ml-1 sm:ml-4 p-1 sm:p-2">
            <FaChevronRight />
          </Button>
        </IconContext.Provider>
      }
    />
  );
}