import { IDoctor } from "./doctor";

export type TAppointmentStatus = "scheduled" | "completed" | "cancelled";
export interface IAppointment {
  id: string;
  status?: TAppointmentStatus;
  client_id: string; // required (FK -> clients.id)
  patient_name: string | null;
  date_time: string | Date; // required (timestamptz)
  service_type: string | null;
  notes?: string | null;
  doctor_id: string; // optional (FK -> doctors.id)
  doctor?: IDoctor;
}
