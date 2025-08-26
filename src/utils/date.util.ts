export function toTimeTzLocal(timeHHmm: string): string {
  if (!timeHHmm) return "";
  const [h, m] = timeHHmm.split(":").map(Number);
  const offsetMin = -new Date().getTimezoneOffset(); // minutes east of UTC
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const oh = String(Math.floor(abs / 60)).padStart(2, "0");
  const om = String(abs % 60).padStart(2, "0");
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm}:00${sign}${oh}:${om}`; // e.g. "09:00:00+06:00"
}
