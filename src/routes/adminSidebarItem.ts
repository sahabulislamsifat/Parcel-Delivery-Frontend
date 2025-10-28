import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/components/modules/admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "ParcelXpress",
    items: [
      //   {
      //     title: "All Bookings (Manage)",
      //     url: "/admin/all-bookings",
      //     component: AllBookingsTable,
      //   },
    ],
  },
];
