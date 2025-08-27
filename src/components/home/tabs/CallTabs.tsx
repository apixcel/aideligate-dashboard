"use client";

import { getClientCallsAction } from "@/actions/call.action";
import HomeCardSkeleton from "@/components/ui/HomeCardSkeleton";
import { ICall } from "@/interface/call.interface";
import { IFeedCard } from "@/types";
import { format } from "date-fns";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import HomeFeedTabCard from "./HomeFeedTabCard";
import { useTranslation } from "react-i18next";

const callTabsTableData: IFeedCard[] = [


  {
    id: "1",
    icon: Phone,
    title: "New call from John Doe at 2:15 PM",
    action: "call",
    time: "2 minutes ago",
  },
  {
    id: "2",
    icon: Phone,
    title: "Missed call from Sarah Johnson",
    action: "call",
    time: "15 minutes ago",
  },
];

const CallTabs = () => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await getClientCallsAction({
        page: 1,
        pageSize: 5,
      });
      setIsLoading(false);
      if (res.data) {
        setCalls(res.data);
      }
    };
    fetch();
  }, []);

  const {t} = useTranslation();
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {isLoading ? (
        <HomeCardSkeleton number={5} />
      ) : (
        calls.map((item) => {
          const data: IFeedCard = {
            id: item.id,
            icon: Phone,
            title: `${t("dashboard_overview.new_call_from")} ${item.caller_number} at ${format(
              new Date(item.call_time),
              "hh:mm a"
            )}`,
            action: "call",
            time: format(new Date(item.created_at), "MMM dd, h:mm a"),
          };
          return <HomeFeedTabCard key={item.id} item={data} />;
        })
      )}
    </div>
  );
};

export default CallTabs;
