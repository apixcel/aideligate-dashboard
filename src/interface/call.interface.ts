export type TCallStatus = "completed" | "missed" | "voicemail";
export interface ICall {
  id: string;
  client_id: string;
  caller_number: string;
  call_time: string; // ISO
  status: TCallStatus;
  notes: string | null;
  clients?: { client_name: string } | null; // joined for convenience
  created_at: string;
}
