"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import PaginationPageFilter from "./PaginationPageFilter";
interface IProps {
  totalPages?: number;
  pageLimit?: number;
  totalItems?: number;
  onPageLimitChange?: (value: number) => void;
  onPageChange?: (value: number) => void;
}
const Pagination: React.FC<IProps> = ({
  totalPages = 1,
  pageLimit = 10,
  totalItems = 1,
  onPageLimitChange,
  onPageChange,
}) => {
  const totalPage = totalPages || Math.ceil(totalItems / pageLimit);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page > totalPage || page < 1) return;
    onPageChange?.(page);
    setCurrentPage(page);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <label className="mb-0">Rows per page:</label>
        <PaginationPageFilter onChange={onPageLimitChange} />
      </div>

      <div className="flex items-center gap-3">
        <label className="mb-0">
          Page {currentPage} of {totalPage}:
        </label>
        {/* prev button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-blue-2"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>

        {/* next button */}
        <button
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-blue-2"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
