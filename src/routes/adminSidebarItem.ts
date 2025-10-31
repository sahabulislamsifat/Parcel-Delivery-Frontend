import ManageAllParcels from "@/components/modules/admin/ManageAllParcels";
import ManageAllUsers from "@/components/modules/admin/ManageAllUsers";
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
      {
        title: "Manage All Users",
        url: "/admin/manage-all-users",
        component: ManageAllUsers,
      },
      {
        title: "Manage All Parcels",
        url: "/admin/all-parcels",
        component: ManageAllParcels,
      },
    ],
  },
];
