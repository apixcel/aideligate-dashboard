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
    label: "nav.dashboard",
    icon: LayoutDashboard,
  },
  {
    route: "/calls",
    label: "nav.calls",
    icon: Phone,
  },
  {
    route: "/provider",
    label: "nav.provider",
    icon: UserRoundSearch,
  },
  {
    route: "/appointments",
    label: "nav.appointments",
    icon: Calendar,
  },
  {
    route: "/reviews",
    label: "nav.reviews",
    icon: Star,
  },
  {
    route: "/settings",
    label: "nav.settings",
    icon: Settings,
  },
  {
    route: "/usage",
    label: "nav.usage_plan",
    icon: ChartColumn,
  },
];
