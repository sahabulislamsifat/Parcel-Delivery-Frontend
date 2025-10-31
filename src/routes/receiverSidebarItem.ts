import IncomingParcels from "@/components/modules/receiver/IncomingParcels";
import ReceiverAnalytics from "@/components/modules/receiver/ReceiverAnalytics";
import type { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Receiver",
    items: [
      {
        title: "Analytics",
        url: "/receiver/analytics",
        component: ReceiverAnalytics,
      },
    ],
  },
  {
    title: "ParcelXpress",
    items: [
      {
        title: "Incoming Parcels",
        url: "/receiver/incoming-parcels",
        component: IncomingParcels,
      },
    ],
  },
];
