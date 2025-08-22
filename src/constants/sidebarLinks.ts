import { LayoutDashboard, Phone, Calendar, Star, Settings, ChartColumn } from "lucide-react";

export const sidebarLinks = [
  {
    route: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    route: "/calls",
    label: "Calls",
    icon: Phone,
  },
  {
    route: "/appointments",
    label: "Appointments",
    icon: Calendar,
  },
  {
    route: "/reviews",
    label: "Reviews",
    icon: Star,
  },
  {
    route: "/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    route: "/usage",
    label: "Usage & Plan",
    icon: ChartColumn,
  },
];
