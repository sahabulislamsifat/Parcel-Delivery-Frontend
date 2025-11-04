/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import {
  useUserInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { getSidebarItems } from "@/utils/getSidebarItem";
import { useAppDispatch } from "@/redux/hook";
import { authApi } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { GrLogout } from "react-icons/gr";
import { RiProfileLine } from "react-icons/ri";

const AppSidebar = (props: any) => {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Sidebar {...props}>
        <SidebarHeader className="items-center pt-4 bg-white dark:bg-[#101828]">
          <p className="text-center text-sm text-gray-400">Loading...</p>
        </SidebarHeader>
      </Sidebar>
    );
  }

  const role = userData?.data?.role ?? "SENDER";
  const data = { navMain: getSidebarItems(role) };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center pt-4 bg-white dark:bg-[#101828]">
        <Link to="/">
          <img
            className="w-16 h-16 rounded-full"
            src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
            alt="Logo"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-white dark:bg-[#101828]">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items
                  .filter((child) => !child.hidden) // ✅ hidden item skip করবে
                  .map((child) => (
                    <SidebarMenuItem key={child.title}>
                      <SidebarMenuButton className="rounded-none" asChild>
                        <Link to={child.url}>{child.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Profile + Logout */}
      <div className="mb-4 flex flex-col gap-4 bg-white dark:bg-[#101828]">
        <Link
          to={`/${role.toLowerCase()}-dashboard/profile`}
          className="hover:bg-[#2a2c2c] w-full hover:text-white mx-auto py-1 px-4 dark:text-white text-start transition-colors duration-200 flex items-center gap-2"
        >
          <RiProfileLine /> Profile
        </Link>
        <button
          onClick={handleLogout}
          className="hover:bg-red-700 w-full mx-auto py-1 hover:text-white dark:text-white transition-colors duration-200 text-start px-4 cursor-pointer flex items-center gap-2"
        >
          <GrLogout /> Logout
        </button>
      </div>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
