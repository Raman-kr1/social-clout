"use client"

import * as React from "react"
import {
  User,
  BookmarkPlus,
  BookHeart,
  LayoutDashboard
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Logo } from "./svgs/Icons"

const data = {
  user: {
    name: "Username",
    email: "username@gmail.com",
    avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: false,
      collapsible: false
    },
    {
      title: "Profiles",
      url: "#",
      icon: User,
      collapsible: true,
      items: [
        {
          title: "Add",
          url: "/add-profile",
        },
        {
          title: "Fetch",
          url: "fetch-posts",
        },
      ],
    },
    {
      title: "Saved",
      url: "/saved-posts",
      icon: BookmarkPlus,
      collapsible: false,
    },
    {
      title: "Engage",
      url: "/engage",
      icon: BookHeart,
      collapsible: false,
    }
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props} className="z-50">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild onClick={() => setOpenMobile(false)}>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground">
                  <Logo className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none w-full">
                  <span className="font-semibold block w-full">SocialClout</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain links={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
