import { LucideIcon } from "lucide-react";

export interface IFeedCard {
  id: string;
  icon: LucideIcon;
  title: string;
  action: "call" | "appointment" | "review";
  time: string;
}
