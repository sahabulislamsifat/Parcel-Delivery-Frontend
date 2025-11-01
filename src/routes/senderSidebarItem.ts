import MyParcels from "@/components/modules/sender/MyParcels";
import CreateParcel from "@/components/modules/sender/CreateParcel";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const SenderOverview = lazy(
  () => import("@/components/modules/sender/SenderOverview")
);

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender",
    items: [
      {
        title: "Overview",
        url: "/sender-dashboard/overview",
        component: SenderOverview,
      },
    ],
  },
  {
    title: "ParcelXpress",
    items: [
      {
        title: "Create Parcel",
        url: "/sender-dashboard/create-parcel",
        component: CreateParcel,
      },
      {
        title: "View My Parcels",
        url: "/sender-dashboard/my-parcels",
        component: MyParcels,
      },
    ],
  },
];
