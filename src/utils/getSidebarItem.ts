import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItem";
import { receiverSidebarItems } from "@/routes/receiverSidebarItem";
import { senderSidebarItems } from "@/routes/senderSidebarItem";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.sender:
      return [...senderSidebarItems];
    case role.receiver:
      return [...receiverSidebarItems];
    default:
      return [];
  }
};
