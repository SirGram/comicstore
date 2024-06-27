"use client";

import { useEffect, useState } from "react";
import type IComic from "@/types/types";
import ComicGrid from "../ComicGrid";
import Pagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";
import { Filters, IComicDate, IComicFormat, IComicLimit, IComicOrderBy, IComicOrderBy2 } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";

interface ComicStoreProps {
  items: IComic[];
  numberComics: number;
  initialPage?: number;
}

export default function ComicStore({ items, numberComics, initialPage = 1 }: ComicStoreProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => {
    // Initialize filters from URL params
    const params = Object.fromEntries(searchParams.entries());
    return {
      series: params.series || "",
      format: params.format as IComicFormat || undefined,
      searchTitle: params.searchTitle || "",
      itemLimit: params.itemLimit  as IComicLimit || '20',
      titleStartsWith: params.titleStartsWith || "",
      orderBy: params.orderBy as IComicOrderBy || 'focDate',
      startYear: params.startYear || "",
      orderBy2: params.orderBy2 as IComicOrderBy2 || undefined,
      date: params.date as IComicDate || undefined,
    };
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || initialPage.toString()));

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const totalPages = Math.ceil(numberComics / (Number(filters.itemLimit) || 20));

  useEffect(() => {
    // Update URL when filters or page changes
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }, [filters, page, router]);

  return (
    <section className="w-full flex flex-col items-center justify-center relative py-4">
      <div className="flex p-4">
        <FilterSidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center relative">
        <div className="bg-bg absolute w-full top-4 bottom-4 "></div>
        <ComicGrid items={items} />
      </div>
      <div className="mt-10">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
}