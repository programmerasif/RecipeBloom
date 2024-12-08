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
import { usePathname } from 'next/navigation';
import { AlarmClockPlus, Combine, SquareKanban } from "lucide-react";

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
      className="flex items-center p-2 text-sm font-medium text-gray-50 hover:bg-[#e1ebf746] rounded-md duration-300"
    >
      {link.icon}
      <span className="ml-3">{link.label}</span>
    </a>
  );
};

const AdminMainDashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const currentRoute = usePathname(); 
  console.log(currentRoute);
  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);



  const sideBrLinks = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconBrandTabler className="text-gray-50 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Home",
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-gray-50 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Profile",
    },
    {
      label: "Manage User",
      href: "#",
      icon: (
        <SquareKanban className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "ManageUser",
    },
    {
      label: "Add New Recipe",
      href: "#",
      icon: (
        <IconUserBolt className="text-gray-50 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "AddNewRecipe",
    },
    {
      label: "Connection",
      href: "#",
      icon: (
        <Combine  className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Connection",
    },
    {
      label: "Manage Recipe",
      href: "#",
      icon: (
        <SquareKanban className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        
      ),
      component: "ManageRecipe",
    },
    {
      label: "Update Password",
      href: "#",
      icon: (
        <IconSettings className="text-gray-50 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "UpdatePass",
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-gray-50 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Logout",
    },
  ];

  const [activeComponent, setActiveComponent] = useState("Dashboard"); // State to track the active component

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto  dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
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
    {
        currentRoute === "/admin-dashboard#" && <div> welcome to Admin Dashboard</div>
      }
      <DashboardInterface activeComponent={activeComponent} />
    </div>
  );
};

export default AdminMainDashboard;
