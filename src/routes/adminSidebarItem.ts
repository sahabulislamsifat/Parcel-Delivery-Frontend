import ManageAllParcels from "@/components/modules/admin/ManageAllParcels";
import ManageAllUsers from "@/components/modules/admin/ManageAllUsers";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const ParcelAnalytics = lazy(
  () => import("@/components/modules/admin/ParcelAnalytics")
);

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Parcel Analytics",
        url: "/admin/analytics",
        component: ParcelAnalytics,
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
