/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi

import { getAccessToken, getRefreshToken } from "@/components/common/utils/useGetToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
 
    // baseUrl: "http://localhost:5001/api/v1",
    baseUrl: "https://recipe-bloom-backend.vercel.app/api/v1",
   
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      // Set the Authorization header if the access token exists
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      // Optionally, set the refresh token in a custom header if needed
      if (refreshToken) {
        headers.set("x-refresh-token", refreshToken);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});


