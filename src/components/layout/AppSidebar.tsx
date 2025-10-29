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

const AppSidebar = (props: any) => {
  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const role = userData?.data?.role ?? "SENDER";
  const data = {
    navMain: getSidebarItems(role),
  };

  const handleLogout = async () => {
    try {
      await logout(undefined);
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
                {item.items.map((child) => (
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
      <div className="mb-4 flex flex-col gap-4 bg-[#101828]">
        <Link
          to={`/${role.toLowerCase()}/profile`}
          className="hover:bg-[#009CFE] w-full mx-auto py-1 px-2 text-white text-center transition-colors duration-200"
        >
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 w-full mx-auto py-1 text-white transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
