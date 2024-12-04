/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import DashboardInterface from "@/components/common/DashboardInterface";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AlarmClockPlus, Combine, CookingPot } from "lucide-react";

// Define the SidebarLink component type to accept onClick
type SidebarLinkProps = {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
    component?: string;
  };
  onClick?: () => void;
  className?: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, onClick }) => {
  return (
    <a
      href={link.href}
      onClick={onClick} // Handle the click event
      className="flex items-center p-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 rounded-md"
    >
      {link.icon}
      <span className="ml-3">{link.label}</span>
    </a>
  );
};

const UserMainDashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sideBrLinks = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Home",
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Profile",
    },
    {
      label: "My Recipes",
      href: "#",
      icon: (
        <CookingPot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "MyRecipes",
    },
    {
      label: "Connection",
      href: "#",
      icon: (
        <Combine  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Connection",
    },
    {
      label: "Add New Recipe",
      href: "#",
      icon: (
        <AlarmClockPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "AddNewRecipe",
    },
    
    {
      label: "Update Password",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "UpdatePass",
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Logout",
    },
  ];

  const [activeComponent, setActiveComponent] = useState("Dashboard"); 

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" 
      )}
    >
      <div className="">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate={false}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="font-bold text-2xl">Welcome </div>
              <div className="mt-8 flex flex-col gap-2">
                {sideBrLinks.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => setActiveComponent(link.component!)} 
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Asif Khan",
                  href: "#",
                  icon: (
                    <Image
                      src="https://i.ibb.co.com/zSxsmvV/Untitled-design.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      <DashboardInterface activeComponent={activeComponent} />
    </div>
  );
};

export default UserMainDashboard;
