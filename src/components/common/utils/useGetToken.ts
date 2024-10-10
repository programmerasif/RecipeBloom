// utils/cookie.ts
import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("accessToken"); // Adjust the cookie name if needed
};

export const getRefreshToken = () => {
  return Cookies.get("refreshToken"); // Adjust the cookie name if needed
};