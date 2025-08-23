"use client";

import { SectionSubTitle } from "@/components";
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";
import StatusFilter from "./StatusFilter";
import StaffFilter from "./StaffFilter";
import SortByFilter from "./SortByFilter";
import PaginationPageFilter from "./PaginationPageFilter";
import { useState } from "react";

const callsTableHeaders = [
  {
    label: "Caller",
    key: "caller",
  },
  {
    label: "Phone",
    key: "phone",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Staff",
    key: "staff",
  },
  {
    label: "Date/Time",
    key: "dateTime",
  },
  {
    label: "Duration",
    key: "duration",
  },
  {
    label: "Actions",
    key: "actions",
  },
];

const callsTableRows = [
  {
    _id: "1",
    caller: "Robert Johnson",
    phone: "+1 (555) 456-7890",
    status: "In Progress",
    staff: "Mike Chen",
    startTime: "15/01/2024, 15:45:00",
    endTime: "Not ended",
    duration: "5:23",
    notes: ["Technical support request regarding account access."],
  },
  {
    _id: "2",
    caller: "John Doe",
    phone: "+1 (555) 123-4567",
    status: "Completed",
    staff: "Sarah Wilson",
    startTime: "15/01/2024, 14:30:00",
    endTime: "15/01/2024, 14:42:00",
    duration: "12:00",
    notes: ["Customer inquiry about pricing plans. Interested in premium package."],
  },
  {
    _id: "3",
    caller: "Maria Garcia",
    phone: "+1 (555) 987-6543",
    status: "Missed",
    staff: "Unassigned",
    startTime: "15/01/2024, 13:15:00",
    endTime: "Not ended",
    duration: "00:00",
    notes: [],
  },
  {
    _id: "4",
    caller: "Emily Davis",
    phone: "+1 (555) 234-5678",
    status: "Completed",
    staff: "Sarah Wilson",
    startTime: "15/01/2024, 11:20:00",
    endTime: "15/01/2024, 11:28:00",
    duration: "8:00",
    notes: ["Follow-up call for appointment scheduling."],
  },
  {
    _id: "5",
    caller: "David Brown",
    phone: "+1 (555) 345-6789",
    status: "Missed",
    staff: "Unassigned",
    startTime: "15/01/2024, 09:30:00",
    endTime: "Not ended",
    duration: "00:00",
    notes: [],
  },
];

const CallsTable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="mb-4 rounded-md border border-dark">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              {/* table headers */}
              <thead className="border-b border-dark">
                <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-dark transition-colors">
                  {callsTableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* table rows */}
              <tbody className="divide-y divide-dark last:border-0">
                {callsTableRows.map((row) => (
                  <tr
                    key={row._id}
                    className="cursor-pointer text-light"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <td className="cursor-pointer p-2 align-middle font-medium whitespace-nowrap">
                      {row.caller}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.phone}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.status === "In Progress" && (
                        <span className="rounded-md bg-brand-blue-2/80 px-2 py-1 text-sm text-white">
                          {row.status}
                        </span>
                      )}
                      {row.status === "Completed" && (
                        <span className="rounded-md bg-success/80 px-2 py-1 text-sm text-lighter">
                          {row.status}
                        </span>
                      )}
                      {row.status === "Missed" && (
                        <span className="rounded-md bg-red/80 px-2 py-1 text-sm text-white">
                          {row.status}
                        </span>
                      )}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.staff}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.startTime}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.duration}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      <button className="rounded-md p-1 text-light hover:bg-white-secondary hover:text-black-secondary">
                        <User className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
