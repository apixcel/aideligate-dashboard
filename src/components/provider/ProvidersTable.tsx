"use client";
import { getAllDoctors } from "@/actions/doctor.action";
import useDebounce from "@/hooks/useDebounce";
import { IDoctor } from "@/interface/doctor";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRowSkeleton from "../ui/TableRowSkeleton";
import CreateProvider from "./CreateProvider";
import DeleteProvider from "./DeleteProvider";
import EditProvderInfo from "./EditProvderInfo";
const providersTableHeaders = [
  {
    label: "provider.full_name",
    key: "full_name",
  },
  {
    label: "provider.date_joined",
    key: "created_at",
  },
  {
    label: "provider.actions",
    key: "action",
  },
];
const ProvidersTable = () => {
  const [refetch, setRefetch] = useState(false);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(false); // ✅ added
  const [search, setSearch] = useDebounce("");

  const { t } = useTranslation();

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true); // ✅ start loading
      const res = await getAllDoctors({ search });
      setDoctors(res.data || []);
      setIsLoading(false); // ✅ end loading
    };

    fetchDoctors();
  }, [search, refetch]);
  return (
    <div className="flex w-full flex-col gap-[20px]">
      <div className="flex w-full flex-wrap items-end justify-between gap-[10px]">
        <div className="w-full max-w-[450px]">
          <label htmlFor="search">{t("calls.search")}</label>
          <div className="relative text-lighter">
            <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="search"
              placeholder={t("provider.search_placeholder")}
              className="flex h-9 w-full px-3 py-1 pl-10"
            />
          </div>
        </div>

        <CreateProvider onSuccess={() => setRefetch(!refetch)} />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-dark">
            <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-dark transition-colors">
              {providersTableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
                >
                  {t(header.label)}
                </th>
              ))}
            </tr>
          </thead>
          {/* table body */}
          <tbody className="divide-y divide-dark last:border-0">
            {isLoading ? (
              <TableRowSkeleton col={providersTableHeaders.length} /> // ✅ skeleton while loading
            ) : (
              doctors.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer text-light duration-[0.3s] hover:bg-white/5"
                >
                  <td className="cursor-pointer p-2 align-middle font-medium whitespace-nowrap">
                    {row.full_name}
                  </td>
                  <td className="cursor-pointer p-2 align-middle font-medium whitespace-nowrap">
                    {format(new Date(row.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="cursor-pointer p-2 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <EditProvderInfo onSuccess={() => setRefetch(!refetch)} provider={row} />
                      <DeleteProvider onSuccess={() => setRefetch(!refetch)} doctor={row} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvidersTable;
