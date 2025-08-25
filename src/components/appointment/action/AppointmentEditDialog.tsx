import { IAppointment } from "@/interface/appointment.interface";
import { format } from "date-fns";
import CreateAppointment from "../CreateAppointment";

interface IProps {
  appointment: IAppointment;
  isOpen: boolean;
  setIsopen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}
const AppointmentEditDialog: React.FC<IProps> = ({ appointment, isOpen, setIsopen, onSuccess }) => {
  const dt = new Date(appointment.date_time);

  const date = format(dt, "yyyy-MM-dd");
  const time = format(dt, "HH:mm");

  return (
    <CreateAppointment
      onSuccess={onSuccess}
      renderTrigger={false}
      isOpen={isOpen}
      setIsopen={setIsopen}
      defaultValues={{
        ...appointment,
        date: date,
        time: time,
        notes: appointment.notes || "",
      }}
    />
  );
};

export default AppointmentEditDialog;
