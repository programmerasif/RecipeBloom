/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
 
    baseUrl: "http://localhost:5001/api/v1",
    // baseUrl: "https://assignment-3-lovat-seven.vercel.app/api",
    credentials: 'include',
  }),
  tagTypes: [],
  endpoints: () => ({}),
});


