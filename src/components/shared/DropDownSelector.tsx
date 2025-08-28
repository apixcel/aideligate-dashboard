"use client";

import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  onChange?: (value: { value: string | number; label: string | number }) => void;
  data: { value: string | number; label: string | number }[];
  className?: string;
  defaultValue?: { value: string | number; label: string | number };

  containerClassName?: string;
}

const DropDownSelector: React.FC<IProps> = ({
  onChange,
  data,
  className,
  defaultValue,
  containerClassName,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  type SortByType = (typeof data)[number];
  const [selectedSortBy, setSelectedSortBy] = useState<SortByType>(defaultValue || data[0]);

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
    <div className={twMerge("relative", containerClassName)} ref={dropdownRef}>
      <button
        type="button"
        className={twMerge(
          "flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0 placeholder:text-lighter focus:border-neutral",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSortBy.label} <ChevronDown className="h-4 w-4" />
      </button>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 z-10 w-full rounded-[8px] bg-darker p-2 text-light">
          <div className="flex flex-col justify-start gap-2 text-left">
            {data.map((sortBy) => (
              <button
                type="button"
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

export default DropDownSelector;
