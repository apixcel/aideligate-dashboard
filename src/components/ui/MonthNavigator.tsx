"use client";
import { addMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface IProps {
  onChange?: (date: Date) => void;
}
const today = new Date();
today.setHours(0, 0, 0, 0);
today.setDate(1);
const MonthNavigator: React.FC<IProps> = ({ onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(today);

  const handlePrev = () => {
    const prevMonth = addMonths(currentMonth, -1);
    setCurrentMonth(prevMonth);
    onChange?.(prevMonth);
  };
  const handleNext = () => {
    const nextMonth = addMonths(currentMonth, 1);
    console.log(nextMonth);

    setCurrentMonth(nextMonth);
    onChange?.(nextMonth);
  };

  useEffect(() => {
    onChange?.(currentMonth);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrev}
        className="rounded border border-dark p-[8px] hover:bg-brand-blue-2 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-[120px] text-center text-[18px] font-medium">
        {format(currentMonth, "MMMM yyyy")}
      </span>
      <button
        onClick={handleNext}
        className="rounded border border-dark p-[8px] hover:bg-brand-blue-2 hover:text-white"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MonthNavigator;
