"use client"; // Ensure this is at the top of the file

import { useAppDispatch } from "@/lib/hooks";

import Cookies from "js-cookie";
import { clearUserInfo } from "@/redux/api/features/usersSlice/usersSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutContent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // Perform the logout operations inside useEffect
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("activeUser");

    dispatch(clearUserInfo()); // Dispatch Redux action to clear user info

    // Redirect to homepage or login page
    router.push("/"); // Ensure this runs once the component mounts
  }, [dispatch, router]);

  // Returning null as nothing needs to be rendered
  return null;
};

export default LogoutContent;