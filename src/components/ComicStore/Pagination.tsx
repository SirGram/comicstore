"use client";

import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Button from "../reusable/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);
  const searchParams = useSearchParams();

  const handlePageChange = (selectedItem: { selected: number }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    // Update or add the page parameter
    current.set('page', (selectedItem.selected + 1).toString());
  
    // Remove any duplicate page parameters
    const uniqueParams = new URLSearchParams();
    for (const [key, value] of current.entries()) {
      if (key === 'page' && uniqueParams.has('page')) continue;
      uniqueParams.append(key, value);
    }
  
    const search = uniqueParams.toString();
    const query = search ? `?${search}` : '';
  
    // Update the URL query parameter with the new page number
    router.push(`${pathname}${query}`);
  };

  return (
    <ReactPaginate
      initialPage={page - 1} // react-paginate uses 0-based index
      className="w-full flex items-center justify-center gap-2"
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="comic inline-block px-3 py-1 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
      activeClassName="active"
      activeLinkClassName="bg-mainAccent text-white"
      previousClassName="previous-page"
      nextClassName="next-page"
      onPageChange={handlePageChange}
      pageCount={totalPages}
      breakLabel="..."
      previousLabel={
        <IconContext.Provider value={{ color: "black", size: "24px" }}>
          <Button className="comic mr-4 p-2">
            <FaChevronLeft />
          </Button>
        </IconContext.Provider>
      }
      nextLabel={
        <IconContext.Provider value={{ color: "black", size: "24px" }}>
          <Button  className="comic ml-4 p-2">
            <FaChevronRight />
          </Button>
        </IconContext.Provider>
      }
    />
  );
}
