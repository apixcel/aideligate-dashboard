"use client";

import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const status = [
  {
    label: "calls.all_status",
    value: "",
  },
  {
    label: "calls.completed",
    value: "completed",
  },
  {
    label: "calls.missed",
    value: "missed",
  },
  {
    label: "calls.voicemail",
    value: "voicemail",
  },
];

interface IProps {
  onChange?: (value: { value: string; label: string }) => void;
}
const StatusFilter: React.FC<IProps> = ({ onChange }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  type StatusType = (typeof status)[number];
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(status[0]);

  const handleStatusClick = (selected: StatusType) => {
    setSelectedStatus(selected);
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
  const { t } = useTranslation();

  return (
    <div className="relative" ref={dropdownRef}>
      <div>
        <label>{t("calls.status")}</label>
        <button
          className="flex min-w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0 placeholder:text-lighter focus:border-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {t(selectedStatus.label)} <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 z-10 w-full rounded-[8px] bg-darker p-2 text-light">
          <div className="flex flex-col justify-start gap-2 text-left">
            {status.map((status) => (
              <button
                key={status.value}
                className={cn(
                  "flex w-full items-center justify-between gap-1 rounded-[8px] px-3 py-1 text-left text-sm text-light hover:bg-dark",
                  selectedStatus.value === status.value && "bg-dark"
                )}
                onClick={() => {
                  handleStatusClick(status);
                }}
              >
                {t(status.label)}
                {selectedStatus.value === status.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
