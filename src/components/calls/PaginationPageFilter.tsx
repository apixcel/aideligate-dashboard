"use client";

import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const paginationPage = [
  {
    label: "5",
    value: 5,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "50",
    value: 50,
  },
];

const PaginationPageFilter = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  type PaginationPageType = (typeof paginationPage)[number];
  const [selectedPaginationPage, setSelectedPaginationPage] = useState<PaginationPageType>(
    paginationPage[0]
  );

  const handlePaginationPageClick = (selected: PaginationPageType) => {
    setSelectedPaginationPage(selected);
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
      <div className="flex items-center gap-2">
        <button
          className="flex w-20 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0 placeholder:text-lighter focus:border-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedPaginationPage.label} <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute bottom-[110%] left-0 z-10 w-[130px] rounded-[8px] bg-darker p-2 text-light">
          <div className="flex flex-col justify-start gap-2 text-left">
            {paginationPage.map((paginationPage) => (
              <button
                key={paginationPage.value}
                className={cn(
                  "flex w-full items-center justify-between gap-1 rounded-[8px] px-3 py-1 text-left text-sm text-light hover:bg-dark",
                  selectedPaginationPage.value === paginationPage.value && "bg-dark"
                )}
                onClick={() => {
                  handlePaginationPageClick(paginationPage);
                }}
              >
                {paginationPage.label}
                {selectedPaginationPage.value === paginationPage.value && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationPageFilter;
