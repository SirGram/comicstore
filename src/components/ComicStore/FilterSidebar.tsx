import React, { useRef, useEffect, useState } from "react";
import { Filters } from "@/types/types";
import {
  comicFormatArray,
  comicLimitArray,
  comicOrderByArray,
  comicDateArray,
} from "@/types/types";
import Select from "../reusable/select";
import Button from "../reusable/button";

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onToggle,
  filters,
  setFilters,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  const [newFilters, setNewFilters] = useState<Filters>(filters);

  const handleChange = (name: string) => (value: string) => {
    setNewFilters((prev) => ({ ...prev, [name]: value }));
  };
  const applyFilters = () => {
    setFilters(newFilters);
    onToggle()
  };

  return (
    <div className="w-full mb-4 comic">
      <div
        onClick={onToggle}
        className="bg-secondary p-4 cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-xl font-bold">Filters</h2>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>
      <div
        ref={contentRef}
        className=" transition-all duration-300 ease-in-out bg-secondary overflow-visible"
      >
        <div className="p-4 ">
          <div className="mb-4">
            <label className="block mb-2 z-50">Order By</label>
            <Select
              items={[...comicOrderByArray]}
              selectedItem={newFilters.orderBy || "title"}
              onSelect={handleChange("orderBy")}
            />
          </div>
          <div className="mb-4 ">
            <label className="block mb-2">Format</label>
            <Select
              items={[...comicFormatArray]}
              selectedItem={newFilters.format || "all"}
              onSelect={handleChange("format")}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Limit</label>
            <Select
              items={[...comicLimitArray.map(String)]}
              selectedItem={String(newFilters.itemLimit) || "20"}
              onSelect={handleChange("itemLimit")}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <Select
              items={[...comicDateArray]}
              selectedItem={newFilters.date || "unset"}
              onSelect={handleChange("date")}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Search Title</label>
            <input
              type="text"
              name="searchTitle"
              value={newFilters.searchTitle || ""}
              onChange={(e) =>
                setNewFilters((prev) => ({ ...prev, searchTitle: e.target.value }))
              }
              className="w-full p-2 comic focus-within:outline-none"
              placeholder="Enter title..."
            />
          </div>

          <Button
            onClick={applyFilters}
            className="w-full bg-mainAccent text-white py-2 hover:opacity-80 text-xl"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
