import {
  Calendar,
  ChartColumn,
  LayoutDashboard,
  Phone,
  Settings,
  Star,
  UserRoundSearch,
} from "lucide-react";

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
    route: "/provider",
    label: "Providers",
    icon: UserRoundSearch,
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
