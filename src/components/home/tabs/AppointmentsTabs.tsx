import { getAppointments } from "@/actions/appointment.action";
import HomeCardSkeleton from "@/components/ui/HomeCardSkeleton";
import { IAppointment } from "@/interface/appointment.interface";
import { IFeedCard } from "@/types";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import HomeFeedTabCard from "./HomeFeedTabCard";

const AppointmentsTabs = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await getAppointments({
        page: 1,
        limit: 5,
      });
      setIsLoading(false);
      if (res.data) {
        setAppointments(res.data);
      }
    };
    fetch();
  }, []);
  return (
    <div className="flex flex-col gap-4 divide-y divide-darker">
      {isLoading ? (
        <HomeCardSkeleton />
      ) : (
        appointments.map((item) => {
          const data: IFeedCard = {
            action: "appointment",
            icon: Calendar,
            time: format(new Date(item.date_time), "MMM dd, h:mm a"),
            id: item.id,
            title: `Appointment with ${item.patient_name}`,
          };
          return <HomeFeedTabCard key={item.id} item={data} />;
        })
      )}
    </div>
  );
};

export default AppointmentsTabs;
