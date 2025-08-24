export interface IAppointment {
  scheduled_at: string; // timestamptz → ISO string (e.g. "2025-08-19T14:00:00Z")
  status: "booked" | "cancelled" | "completed"; // limited set of states
  notes?: string | null; // optional text
  created_at: string;
}
