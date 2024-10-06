/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { decode } from "@/app/utils/jwtDecode";
import Cookies from "js-cookie";
import { useGetLoginUserInfoQuery } from "@/redux/api/features/auth/authApi";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import { useRouter } from "next/navigation";
import DropItems from "./utils/DropItems";
import { Button } from "../ui/button";
import { navMenu } from "@/app/constant/constant";
import Loader from "@/app/loader/loader";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  type TUser = {
    role: string;
    email: string;
    mongoId: string;
  };
  const [user, setUser] = useState<TUser | null>(null);
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

  const { data, isLoading } = useGetLoginUserInfoQuery(user?.mongoId);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      try {
        const decodedUser = decode(accessToken);

        // Type guard to check if decodedUser has role and email properties
        if (
          decodedUser &&
          typeof decodedUser === "object" &&
          "role" in decodedUser &&
          "email" in decodedUser
        ) {
          setUser(decodedUser as TUser);
        }
        setUserInfo(data?.data);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [data?.data]);

  const menuItems = navMenu(user?.role as string);
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUser(null);
    setUserInfo({});

    router.push("/");
  };

  return (
    <nav className="container relative z-20 transition-all duration-300">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold">
              <Image
                src={logo}
                alt="logo"
                width={80}
                height={80}
                className=""
              />
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 dark:bg-black flex items-baseline space-x-4">
              {menuItems.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.href}
                  className="text-gray-800 dark:text-white hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {menu.linkText}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                {userInfo?.image ? (
                  <DropItems
                    img={userInfo?.image}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <div className="flex justify-center items-center gap-5">
                    <Link
                    href="/login"
                    className="text-gray-800 dark:text-white hover:text-gray-600 py-2 rounded-md text-sm font-medium"
                  >
                    <Button className="bg-[#F54749] duration-300">Login</Button>
                  </Link>
                  <Link
                    href="/sign-up"
                    className="text-gray-800 dark:text-white hover:text-gray-600 py-2 rounded-md text-sm font-medium"
                  >
                    <Button className="bg-[#F54749] duration-300">Register</Button>
                  </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center gap-3 lg:hidden">
            <div className="mt-4">{/* <DarkModeToggle /> */}</div>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <div>
                {userInfo?.image ? (
                  <DropItems
                    img={userInfo?.image}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <div>
                    <Link href="/login">
                      <Button className="bg-[#F54749] duration-300  mt-4">
                        Login
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button className="bg-[#F54749] duration-300  mt-4">
                        register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile device*/}
      <div
        className={`${
          isMobileMenuOpen
            ? "fixed inset-0 top-[64px] z-30 bg-black bg-opacity-60"
            : "hidden"
        } lg:hidden`}
      >
        <div className="px-4 pt-5 pb-3 space-y-1">
          {menuItems.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-100 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            >
              {menu.linkText}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
