"use client";

import { getClientCallsAction } from "@/actions/call.action";
import { SectionSubTitle } from "@/components";
import useDebounce from "@/hooks/useDebounce";
import { ICall, TCallStatus } from "@/interface/call.interface";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../ui/Pagination";
import TableRowSkeleton from "../ui/TableRowSkeleton";
import SortByFilter from "./SortByFilter";
import StatusFilter from "./StatusFilter";

const callsTableHeaders = [
  {
    label: "calls.caller",
    key: "caller",
  },
  {
    label: "calls.status",
    key: "status",
  },
  {
    label: "calls.date_time",
    key: "dateTime",
  },
  {
    label: "calls.note",
    key: "note",
  },
  // {
  //   label: "calls.action",
  //   key: "actions",
  // },
];

const statusLocale = {
  completed: "calls.completed",
  missed: "calls.missed",
  voicemail: "calls.voicemail",
};

const CallsTable = () => {
  const { t } = useTranslation();
  const [calls, setCalls] = useState<ICall[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // ✅ added

  const [search, setSearch] = useDebounce("");

  const [queryFilter, setQueryFilter] = useState({
    status: "",
    sortDir: "",
    pageSize: 10,
    page: 1,
  });

  useEffect(() => {
    const fetchCalls = async () => {
      setIsLoading(true); // ✅ start loading
      const res = await getClientCallsAction({
        page: queryFilter.page,
        pageSize: queryFilter.pageSize,
        status: queryFilter.status as TCallStatus,
        sortBy: "created_at",
        sortDir: queryFilter.sortDir as "asc" | "desc",
        search: search,
      });
      setCalls(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setIsLoading(false); // ✅ end loading
    };
    fetchCalls();
  }, [queryFilter, search]);

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300">
      <div>
        <SectionSubTitle
          title={t("calls.call_Management")}
          description={t("calls.view_Filter_manage")}
        />
      </div>

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          {/* search */}
          <div className="flex-1">
            <label htmlFor="search">{t("calls.search")}</label>
            <div className="relative text-lighter">
              <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                id="search"
                placeholder={t("calls.search_placeholder")}
                className="flex h-9 w-full px-3 py-1 pl-10"
              />
            </div>
          </div>

          {/* filters */}
          <div className="flex flex-wrap gap-2">
            {/* status */}
            <StatusFilter
              onChange={(status) => setQueryFilter({ ...queryFilter, status: status.value })}
            />

            {/* sort by */}
            <SortByFilter
              onChange={(value) => setQueryFilter({ ...queryFilter, sortDir: value.value })}
            />
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
                      {t(header.label)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-dark last:border-0">
                {isLoading ? (
                  <TableRowSkeleton col={callsTableHeaders.length} /> // ✅ skeleton while loading
                ) : (
                  calls.map((row) => (
                    <tr key={row.id} className="cursor-pointer text-light">
                      <td className="cursor-pointer p-2 align-middle font-medium whitespace-nowrap">
                        {row.caller_number}
                      </td>
                      <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                        <span
                          className={`rounded-md px-2 py-1 text-sm text-white ${
                            row.status === "voicemail"
                              ? "bg-brand-blue-2/80"
                              : row.status === "missed"
                                ? "bg-red/80"
                                : "bg-success/80"
                          }`}
                        >
                          {t(statusLocale[row.status])}
                        </span>
                      </td>
                      <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                        {format(new Date(row.call_time), "dd MMM yyyy, HH:mm")}
                      </td>
                      <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                        {row.notes}
                      </td>
                      {/* <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                        <button className="rounded-md p-1 text-light hover:bg-white-secondary hover:text-black-secondary">
                          <User className="h-4 w-4" />
                        </button>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}
        <Pagination
          totalPages={totalPages}
          onPageChange={(page) => setQueryFilter({ ...queryFilter, page: page })}
          onPageLimitChange={(pageLimit) => setQueryFilter({ ...queryFilter, pageSize: pageLimit })}
        />
      </div>
    </div>
  );
};

export default CallsTable;
