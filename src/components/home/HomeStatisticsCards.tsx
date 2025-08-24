"use client";
import { useAuth } from "@/hooks/useAuth";
import { CalendarDays, ChevronRight, PhoneCall, Star } from "lucide-react";
import Link from "next/link";
const HomeStatisticsCards = () => {
  const { user, isLoading } = useAuth();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* card 1 */}
      {user?.email}
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300 hover:border-dark hover:shadow-md">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-lightest xl:text-base">Calls Today</h5>
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border-2 border-[#2d2d2d] bg-[linear-gradient(90deg,#232526,#414345)]">
            <PhoneCall className="h-4 w-4" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-lighter">12</h3>
          <Link
            href="/calls"
            className="group inline-flex items-center gap-[2px] text-xs hover:underline"
          >
            View calls{" "}
            <ChevronRight className="mt-[1px] h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {/* card 2 */}
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300 hover:border-dark hover:shadow-md">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-lightest xl:text-base">Appointments This Week</h5>
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border-2 border-[#2d2d2d] bg-[linear-gradient(90deg,#232526,#414345)]">
            <CalendarDays className="h-4 w-4" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-lighter">28</h3>
          <Link
            href="/calls"
            className="group inline-flex items-center gap-[2px] text-xs hover:underline"
          >
            Open calendar{" "}
            <ChevronRight className="mt-[1px] h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {/* card 3 */}
      <div className="flex flex-col gap-6 rounded-xl border border-darker bg-darkest p-6 transition-all duration-300 hover:border-dark hover:shadow-md">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-lightest xl:text-base">New Reviews This Week</h5>
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border-2 border-[#2d2d2d] bg-[linear-gradient(90deg,#232526,#414345)]">
            <Star className="h-4 w-4" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-lighter">5</h3>
          <Link
            href="/calls"
            className="group inline-flex items-center gap-[2px] text-xs hover:underline"
          >
            Open reviews{" "}
            <ChevronRight className="mt-[1px] h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeStatisticsCards;
