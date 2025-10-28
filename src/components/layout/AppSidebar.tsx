/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
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
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { getSidebarItems } from "@/utils/getSidebarItem";

const AppSidebar = (props: any) => {
  const { data: userData } = useUserInfoQuery(undefined);
  // console.log(userData);

  const data = {
    navMain: getSidebarItems(userData?.data.role ?? "SENDER"),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center pt-4 bg-white dark:bg-[#09090B]">
        <Link to="/">
          <img
            className="w-16 h-16 rounded-full"
            src="https://play-lh.googleusercontent.com/J3Ew-toK2n80uS4m85sKELgXNgNZ798HeOlk5iHI99aDccULENBJK4ZuYMyE_68Ye_59"
            alt="Logo"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-[#09090B]">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="rounded-none" asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
