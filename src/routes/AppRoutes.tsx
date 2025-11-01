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
import Profile from "@/components/modules/common/Profile";

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

  // ADMIN ROUTES
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin-dashboard",
    children: [
      { index: true, element: <Navigate to="/admin-dashboard/overview" /> },
      ...generateRoutes(adminSidebarItems),
      {
        path: "profile",
        Component: withAuth(Profile, role.admin as TRole),
      },
    ],
  },

  // SENDER ROUTES
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender-dashboard",
    children: [
      { index: true, element: <Navigate to="/sender-dashboard/overview" /> },
      ...generateRoutes(senderSidebarItems),
      {
        path: "profile",
        Component: withAuth(Profile, role.sender as TRole),
      },
    ],
  },

  // RECEIVER ROUTES
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver-dashboard",
    children: [
      { index: true, element: <Navigate to="/receiver-dashboard/overview" /> },
      ...generateRoutes(receiverSidebarItems),
      {
        path: "profile",
        Component: withAuth(Profile, role.receiver as TRole),
      },
    ],
  },

  // PUBLIC ROUTES
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
