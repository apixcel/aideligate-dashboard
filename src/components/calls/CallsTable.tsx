import { SectionSubTitle } from "@/components";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import StatusFilter from "./StatusFilter";
import StaffFilter from "./StaffFilter";
import SortByFilter from "./SortByFilter";
import PaginationPageFilter from "./PaginationPageFilter";

const CallsTable = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
      <div>
        <SectionSubTitle
          title="Call Management"
          description="View, filter, and manage all incoming and outgoing calls"
        />
      </div>

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          {/* search */}
          <div className="flex-1">
            <label htmlFor="search">Search</label>
            <div className="relative text-lighter">
              <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
              <input
                type="text"
                id="search"
                placeholder="Search by caller, phone, or staff..."
                className="flex h-9 w-full px-3 py-1 pl-10"
              />
            </div>
          </div>

          {/* filters */}
          <div className="flex gap-2">
            {/* status */}
            <StatusFilter />

            {/* staff */}
            <StaffFilter />
            {/* sort by */}
            <SortByFilter />
          </div>
        </div>

        {/* table */}
        <div className="mb-4"></div>

        {/* pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="mb-0">Rows per page:</label>
            <PaginationPageFilter />
          </div>

          <div className="flex items-center gap-3">
            <label className="mb-0">Page 1 of 1:</label>
            {/* prev button */}
            <button
              disabled
              className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-blue-2"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>

            {/* next button */}
            <button
              disabled
              className="flex items-center justify-center gap-2 rounded-[8px] bg-brand-blue-2 px-[14px] py-[6px] font-[500] text-white hover:bg-brand-blue-2/80 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-blue-2"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallsTable;
