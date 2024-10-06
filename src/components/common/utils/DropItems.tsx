'use clint'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const DropItems = ({
    img,
    handleLogout,
  }: {
    img: string;
    handleLogout: () => void;
  }) => {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={img}
                alt="User profile image"
                width={45}
                height={45}
                className="rounded-full w-[50px] h-[50px]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem autoFocus={false}>
                <Button className="font-bold h-8 w-full bg-blue-700 text-white">
                  
                  <Link href={"/profile"}>Profile</Link>{" "}
                </Button>
              </DropdownMenuItem>
  
              <DropdownMenuItem>
                <Button
                  className="font-bold h-8 w-full bg-red-700 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Suspense>
      </div>
    );
  };
  export default DropItems