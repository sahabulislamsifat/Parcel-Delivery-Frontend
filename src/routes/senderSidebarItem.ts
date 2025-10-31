import MyParcels from "@/components/modules/sender/MyParcels";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const SenderAnalytics = lazy(
  () => import("@/components/modules/sender/SenderAnalytics")
);

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender",
    items: [
      {
        title: "Analytics",
        url: "/sender/analytics",
        component: SenderAnalytics,
      },
    ],
  },
  {
    title: "ParcelXpress",
    items: [
      {
        title: "My Parcels",
        url: "/sender/my-parcels",
        component: MyParcels,
      },
      {
        title: "Parcel Booking",
        url: "/sender/booking-parcel",
        component: MyParcels,
      },
    ],
  },
];
