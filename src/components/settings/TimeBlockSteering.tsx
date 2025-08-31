"use client";

import { getTimeBlocks } from "@/actions/timeBlock.action";
import { SectionSubTitle } from "@/components";
import { ITimeBlock } from "@/interface/timeBlock.interface";
import { format, parseISO } from "date-fns";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddTimeBlockWindow from "./AddTimeBlockWindow";
import DeleteTimeBlock from "./DeleteTimeBlock";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TimeBlockSteering = () => {
  const { t } = useTranslation();
  const [timeWindows, setTimeWindows] = useState<ITimeBlock[]>([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchTimeBlocks = async () => {
      const res = await getTimeBlocks();
      if (res.data) setTimeWindows(res.data);
    };
    fetchTimeBlocks();
  }, [refetch]);

  const formatTimeLabel = (input: string) => {
    if (!input) return "";
    try {
      const date = parseISO(`1970-01-01T${input}`);
      return format(date, "h:mm a");
    } catch {
      return input;
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
      <div className="flex items-center justify-between">
        <SectionSubTitle
          icon={Clock}
          title={t("settings.time_Block_Steering")}
          description={t("settings.steer_bookings")}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="mb-0">{t("settings.preferred_Time_windows")}</label>
          <AddTimeBlockWindow onAdd={() => setRefetch((n) => n + 1)} />
        </div>

        {/* window cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {timeWindows.map((block) => {
            const day = days[(block.day_of_week ?? 1) - 1];
            const start = formatTimeLabel(block.start_time);
            const end = formatTimeLabel(block.end_time);

            return (
              <div
                key={`${block.id ?? `${block.day_of_week}-${block.start_time}-${block.end_time}`}`}
                className="rounded-lg border border-dark p-3"
              >
                {/* mobile: < md */}
                <div className="flex flex-col gap-2 md:hidden">
                  <div className="flexw flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-md border border-dark px-3 py-1.5 text-sm text-light">
                      {day}
                    </span>
                    <DeleteTimeBlock block={block} onSuccess={() => setRefetch((n) => n + 1)} />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-light">
                    <span>{start}</span>
                    <span className="opacity-60">–</span>
                    <span>{end}</span>
                  </div>
                </div>

                {/* desktop/tablet: md+ */}
                <div className="hidden items-center gap-3 md:flex">
                  <span className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light">
                    {day}
                  </span>
                  <span className="text-sm text-light">{t("settings.from")}</span>
                  <span className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light">
                    {start}
                  </span>
                  <span className="text-sm text-light">{t("settings.to")}</span>
                  <span className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light">
                    {end}
                  </span>
                  <DeleteTimeBlock block={block} onSuccess={() => setRefetch((n) => n + 1)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeBlockSteering;
