"use client";

import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sortBy = [
  {
    label: "Newest",
    value: "desc",
  },
  {
    label: "Oldest",
    value: "asc",
  },
];

interface IProps {
  onChange?: (value: { value: string; label: string }) => void;
}

const SortByFilter: React.FC<IProps> = ({ onChange }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  type SortByType = (typeof sortBy)[number];
  const [selectedSortBy, setSelectedSortBy] = useState<SortByType>(sortBy[0]);

  const handleSortByClick = (selected: SortByType) => {
    setSelectedSortBy(selected);
    onChange?.(selected);
    setIsOpen(false);
  };

  // outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div>
        <label>Sort By</label>
        <button
          className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0 placeholder:text-lighter focus:border-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedSortBy.label} <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 z-10 w-full rounded-[8px] bg-darker p-2 text-light">
          <div className="flex flex-col justify-start gap-2 text-left">
            {sortBy.map((sortBy) => (
              <button
                key={sortBy.value}
                className={cn(
                  "flex w-full items-center justify-between gap-1 rounded-[8px] px-3 py-1 text-left text-sm text-light hover:bg-dark",
                  selectedSortBy.value === sortBy.value && "bg-dark"
                )}
                onClick={() => {
                  handleSortByClick(sortBy);
                }}
              >
                {sortBy.label}
                {selectedSortBy.value === sortBy.value && (
                  <Check className="h-full max-h-4 w-full max-w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortByFilter;
