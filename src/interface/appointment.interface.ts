export interface IAppointment {
  client_id: string; // required (FK -> clients.id)
  patient_name?: string | null;
  date_time: string | Date; // required (timestamptz)
  service_type?: string | null;
  notes?: string | null;
  doctor_id: string; // optional (FK -> doctors.id)
  revalidate?: string; // optional path to revalidate (e.g. "/appointments")
}
