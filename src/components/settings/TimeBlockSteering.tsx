"use client";

import { getTimeBlocks } from "@/actions/timeBlock.action";
import { SectionSubTitle } from "@/components";
import { ITimeBlock } from "@/interface/timeBlock.interface";
import { format, parseISO } from "date-fns";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import AddTimeBlockWindow from "./AddTimeBlockWindow";
import DeleteTimeBlock from "./DeleteTimeBlock";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TimeBlockSteering = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [timeWindows, setTimeWindows] = useState<ITimeBlock[]>([]);

  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchTimeBlocks = async () => {
      const res = await getTimeBlocks();
      if (res.data) {
        setTimeWindows(res.data);
      }
    };
    fetchTimeBlocks();
  }, [refetch]);
  const formatTimeLabel = (input: string) => {
    if (!input) return "";
    try {
      // Ensure we have a valid ISO-like string
      const date = parseISO(`1970-01-01T${input}`);
      return format(date, "h:mm a"); // 9:00 AM, 2:30 PM, etc.
    } catch {
      return input; // fallback
    }
  };
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6">
      <div className="flex items-center justify-between">
        <SectionSubTitle
          icon={Clock}
          title="Time Block Steering"
          description="Steer bookings toward preferred windows."
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="mb-0">Preferred Time Windows</label>
          <AddTimeBlockWindow onAdd={() => setRefetch(refetch + 1)} />
        </div>

        {/* window card */}

        {timeWindows.map((block, i) => {
          return (
            <div className="flex flex-col gap-3" key={i + "time_block_window"}>
              <div className="flex items-center gap-3 rounded-lg border border-dark p-3">
                <span className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0">
                  {days[block.day_of_week - 1]}
                </span>
                <span className="text-sm text-light">from</span>
                <span className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0">
                  {formatTimeLabel(block.start_time)}
                </span>
                <span className="text-sm text-light">to</span>
                <span className="flex w-36 items-center justify-between gap-2 rounded-[8px] border border-dark px-[16px] py-[7px] text-sm whitespace-nowrap text-light outline-0">
                  {formatTimeLabel(block.end_time)}
                </span>
                <span className="text-sm text-light">to</span>
                <DeleteTimeBlock onSuccess={() => setRefetch(refetch + 1)} block={block} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeBlockSteering;
