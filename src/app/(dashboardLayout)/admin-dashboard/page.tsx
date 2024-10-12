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

const AdminMainDashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  
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
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Dashboard",
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
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: "Settings",
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

  const [activeComponent, setActiveComponent] = useState("Dashboard"); // State to track the active component

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <div className="">
        <Sidebar open={true} setOpen={() => {}} animate={false}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* <Logo /> */} logo
              <div className="mt-8 flex flex-col gap-2">
                {sideBrLinks.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => setActiveComponent(link.component!)} // Update active component on click
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <Image
                      src="https://assets.aceternity.com/manu.png"
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

export default AdminMainDashboard;