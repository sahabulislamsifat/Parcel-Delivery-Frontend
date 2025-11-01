import ManageAllParcels from "@/components/modules/admin/ManageAllParcels";
import ManageAllUsers from "@/components/modules/admin/ManageAllUsers";
import ParcelAnalytics from "@/components/modules/admin/ParcelAnalytics";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AdminOverview = lazy(
  () => import("@/components/modules/admin/AdminOverview")
);

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard/overview",
        component: AdminOverview,
      },
    ],
  },
  {
    title: "ParcelXpress",
    items: [
      {
        title: "Parcel Analytics",
        url: "/admin-dashboard/analytics",
        component: ParcelAnalytics,
      },
      {
        title: "Manage All Users",
        url: "/admin-dashboard/manage-all-users",
        component: ManageAllUsers,
      },
      {
        title: "Manage All Parcels",
        url: "/admin-dashboard/all-parcels",
        component: ManageAllParcels,
      },
    ],
  },
];
