import DeliveryHistory from "@/components/modules/receiver/DeliveryHistory";
import IncomingParcels from "@/components/modules/receiver/IncomingParcels";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const ReceiverOverview = lazy(
  () => import("@/components/modules/receiver/ReceiverOverview")
);

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Receiver",
    items: [
      {
        title: "Overview",
        url: "/receiver-dashboard/overview",
        component: ReceiverOverview,
      },
    ],
  },
  {
    title: "ParcelXpress",
    items: [
      {
        title: "Incoming Parcels",
        url: "/receiver-dashboard/incoming-parcels",
        component: IncomingParcels,
      },
      {
        title: "Delivery History",
        url: "/receiver-dashboard/delivery-history",
        component: DeliveryHistory,
      },
    ],
  },
];
