"use client";

import { cn } from "@/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const loginAs = [
  {
    label: "Owner - Full Access",
    value: "owner",
  },
  {
    label: "Manager - Billing Hidden",
    value: "manager",
  },
  {
    label: "Staff - Limited Access",
    value: "staff",
  },
];

type LoginAsType = (typeof loginAs)[number];
interface IProps {
  onChange: (role: LoginAsType) => void;
}

const LoginAsFilter: React.FC<IProps> = ({ onChange }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLoginAs, setSelectedLoginAs] = useState<LoginAsType>(loginAs[0]);

  const handleLoginAsClick = (selected: LoginAsType) => {
    setSelectedLoginAs(selected);
    onChange(selected);
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
        <label>Login as</label>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-lighter outline-0 placeholder:text-lighter focus:border-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLoginAs.label} <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 z-10 w-full rounded-[8px] bg-darker p-2 text-lighter">
          <div className="flex flex-col justify-start gap-2 text-left">
            {loginAs.map((loginAs) => (
              <button
                key={loginAs.value}
                className={cn(
                  "flex w-full items-center justify-between gap-1 rounded-[8px] px-3 py-1 text-left text-sm text-lighter hover:bg-dark",
                  selectedLoginAs.value === loginAs.value && "bg-dark"
                )}
                onClick={() => {
                  handleLoginAsClick(loginAs);
                }}
              >
                {loginAs.label}
                {selectedLoginAs.value === loginAs.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAsFilter;
