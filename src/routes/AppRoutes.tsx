import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/layout/DashboardLayout";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItem";
import { senderSidebarItems } from "./senderSidebarItem";
import { receiverSidebarItems } from "./receiverSidebarItem";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
      {
        // path: "bookings/:id",
        // Component: withAuth(AdminBookingDetails, role.superAdmin as TRole),
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/analytics" /> },
      ...generateRoutes(senderSidebarItems),
      {
        // path: "bookings/:id",
        // Component: withAuth(AdminBookingDetails, role.superAdmin as TRole),
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/analytics" /> },
      ...generateRoutes(receiverSidebarItems),
      {
        // path: "bookings/:id",
        // Component: withAuth(AdminBookingDetails, role.superAdmin as TRole),
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
