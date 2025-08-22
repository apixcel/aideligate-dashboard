import { IFeedCard } from "@/types";
import { Calendar } from "lucide-react";
import HomeFeedTabCard from "./HomeFeedTabCard";

const appointmentsTabsTableData: IFeedCard[] = [
  {
    id: "2",
    icon: Calendar,
    title: "Appointment booked with Dr. Smith, tomorrow at 10:00 AM",
    action: "appointment",
    time: "5 minutes ago",
  },
  {
    id: "5",
    icon: Calendar,
    title: "Appointment rescheduled by Mike Wilson",
    action: "appointment",
    time: "1 hour ago",
  },
];

const AppointmentsTabs = () => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {appointmentsTabsTableData.map((item) => (
        <HomeFeedTabCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AppointmentsTabs;
