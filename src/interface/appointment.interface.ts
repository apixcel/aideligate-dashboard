import { IDoctor } from "./doctor";

export type TAppointmentStatus = "scheduled" | "completed" | "cancelled";
export interface IAppointment {
  id: string;
  status?: TAppointmentStatus;
  client_id: string; // required (FK -> clients.id)
  patient_name: string;
  date_time: string | Date; // required (timestamptz)
  service_type: string;
  notes?: string;
  doctor_id: string; // optional (FK -> doctors.id)
  doctor?: IDoctor;
}
