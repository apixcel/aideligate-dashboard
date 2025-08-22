import { IFeedCard } from "@/types";
import { Phone } from "lucide-react";
import HomeFeedTabCard from "./HomeFeedTabCard";

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
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {callTabsTableData.map((item) => (
        <HomeFeedTabCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CallTabs;
