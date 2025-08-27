"use client";

import { getAppointments } from "@/actions/appointment.action";
import useDebounce from "@/hooks/useDebounce";
import { IAppointment, TAppointmentStatus } from "@/interface/appointment.interface";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import MonthNavigator from "../shared/MonthNavigator";
import Pagination from "../shared/Pagination";
import TableRowSkeleton from "../ui/TableRowSkeleton";
import AppointmentActions from "./action/AppointmentActions";
import DoctorSelector from "./DoctorSelector";
const appointmenTableHeaders = [
  {
    label: "Patient Name",
    key: "patient_name",
  },
  {
    label: "Provider",
    key: "doctor.full_name",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Service Type",
    key: "service_type",
  },
  {
    label: "Date/Time",
    key: "date_time",
  },
  {
    label: "Note",
    key: "notes",
    className: "min-w-[180px]",
  },
  {
    label: "Actions",
    key: "action",
  },
];
interface IProps {
  refetch: number;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}
const AppointmentTable: React.FC<IProps> = ({ refetch, setRefetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [query, setQuery] = useState({
    from: "",
    to: "",
    page: 1,
    pageSize: 10,
    doctor_id: "",
    status: "",
  });
  const [search, setSearch] = useDebounce("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      const res = await getAppointments({
        page: query.page,
        limit: query.pageSize,
        from: query.from,
        to: query.to,
        doctor_id: query.doctor_id,
        search: search,
        status: query.status as TAppointmentStatus,
      });
      setIsLoading(false);
      if (res.data) setAppointments(res.data);
      if (res.meta) setTotalPages(res.meta.totalPages);
    };

    fetchAppointments();
  }, [query, search, refetch]);

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <MonthNavigator onChange={(date) => setQuery({ ...query, from: date.toString() })} />
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="w-full max-w-[450px]">
          <label htmlFor="search">Search</label>
          <div className="relative text-lighter">
            <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="search"
              placeholder="Search by Patient name, notes..."
              className="flex h-9 w-full px-3 py-1 pl-10"
            />
          </div>
        </div>

        <div className="flex gap-[20px]">
          <div>
            <label>Provider</label>
            <DoctorSelector onChange={(value) => setQuery({ ...query, doctor_id: value })} />
          </div>
          <div>
            <label>Status</label>
            <select onChange={(e) => setQuery({ ...query, status: e.target.value })}>
              <option value={""} hidden>
                Status
              </option>

              {["scheduled", "completed", "cancelled"].map((status) => (
                <option key={status} value={status} className="capitalize">
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mb-4 rounded-md border border-dark">
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            {/* table headers */}
            <thead className="border-b border-dark">
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-dark transition-colors">
                {appointmenTableHeaders.map((header) => (
                  <th
                    key={header.key}
                    className={twMerge(
                      "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap",
                      header.className
                    )}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* table rows */}
            <tbody className="divide-y divide-dark last:border-0">
              {isLoading ? (
                <TableRowSkeleton col={appointmenTableHeaders.length} />
              ) : (
                appointments.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer text-light duration-[0.3s] hover:bg-white/5"
                  >
                    <td className="cursor-pointer p-2 align-middle font-medium whitespace-nowrap">
                      {row.patient_name}
                    </td>
                    <td className="cursor-pointer p-2 align-middle font-medium whitespace-nowrap">
                      {row.doctor?.full_name}
                    </td>

                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      <span
                        className={`rounded-md px-2 py-1 text-sm text-white capitalize ${row.status === "scheduled" ? "bg-brand-blue-2/80" : row.status === "cancelled" ? "bg-red/80" : "bg-success/80"}`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.service_type}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {format(new Date(row.date_time), "dd MMM yyyy, HH:mm")}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      {row.notes}
                    </td>
                    <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                      <AppointmentActions setRefetch={setRefetch} appointment={row} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        onPageChange={(page) => setQuery({ ...query, page: page })}
        onPageLimitChange={(pageLimit) => setQuery({ ...query, pageSize: pageLimit })}
      />
    </div>
  );
};

export default AppointmentTable;
