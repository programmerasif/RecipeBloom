import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    signUp: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    addAdmin: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);
        return {
          url: "/auth/add-admin",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getLoginUserInfo: builder.query({
      query: (mongodbId) => {
        console.log(mongodbId);
        return {
          url: `/users/${mongodbId}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useAddAdminMutation,
  useGetLoginUserInfoQuery,
} = authApi;
