"use client";

import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const days = [
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },

  {
    label: "Friday",
    value: "friday",
  },

  {
    label: "Saturday",
    value: "saturday",
  },

  {
    label: "Sunday",
    value: "sunday",
  },
];

const DaySelectFilter = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  type DayType = (typeof days)[number];
  const [selectedDay, setSelectedDay] = useState<DayType>(days[0]);

  const handleDayClick = (selected: DayType) => {
    setSelectedDay(selected);
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
        <button
          className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0 placeholder:text-lighter focus:border-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedDay.label} <ChevronDown className="h-full max-h-4 w-full max-w-4" />
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 z-10 w-full rounded-[8px] bg-darker p-2 text-light">
          <div className="flex flex-col justify-start gap-2 text-left">
            {days.map((day) => (
              <button
                key={day.value}
                className={cn(
                  "flex w-full items-center justify-between gap-1 rounded-[8px] px-3 py-1 text-left text-sm text-light hover:bg-dark",
                  selectedDay.value === day.value && "bg-dark"
                )}
                onClick={() => {
                  handleDayClick(day);
                }}
              >
                {day.label}
                {selectedDay.value === day.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySelectFilter;
