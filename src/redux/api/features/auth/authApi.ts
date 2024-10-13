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
    promoteToPremium: builder.mutation({
      query: (data) => {
        console.log(data);

        return {
          url: `/users/promote-premium/${data?.id}`,
          method: "PATCH",
          body: data?.isPremium,
        };
      },
    }),
    // getLoginUserInfo: builder.query({
    //   query: (mongodbId) => {
    //     console.log(mongodbId);
    //     return {
    //       url: `/users/${mongodbId}`,
    //       method: "GET",
    //       credentials:"include"
    //     };
    //   },
    // }),
    getUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
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
  // useGetLoginUserInfoQuery,
  usePromoteToPremiumMutation,
  useGetUsersQuery
} = authApi;
