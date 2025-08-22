import { Calendar, Phone, Star } from "lucide-react";
import HomeFeedTabCard from "./HomeFeedTabCard";
import { IFeedCard } from "@/types";

const allTabsTableData: IFeedCard[] = [
  {
    id: "1",
    icon: Phone,
    title: "New call from John Doe at 2:15 PM",
    action: "call",
    time: "2 minutes ago",
  },
  {
    id: "2",
    icon: Calendar,
    title: "Appointment booked with Dr. Smith, tomorrow at 10:00 AM",
    action: "appointment",
    time: "5 minutes ago",
  },
  {
    id: "3",
    icon: Star,
    title: "New 5-star review from Maria: 'Great service!'",
    action: "review",
    time: "10 minutes ago",
  },
  {
    id: "4",
    icon: Phone,
    title: "Missed call from Sarah Johnson",
    action: "call",
    time: "15 minutes ago",
  },
  {
    id: "5",
    icon: Calendar,
    title: "Appointment rescheduled by Mike Wilson",
    action: "appointment",
    time: "1 hour ago",
  },
];

const AllTabs = () => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {allTabsTableData.map((item) => (
        <HomeFeedTabCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllTabs;
