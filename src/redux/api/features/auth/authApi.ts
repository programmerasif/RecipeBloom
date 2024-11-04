import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    signUp: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    addAdmin: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/add-admin",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    promoteToPremium: builder.mutation({
      query: (data) => {
        return {
          url: `/users/promote-premium/${data?.id}`,
          method: "PATCH",
          body: data?.isPremium,
        };
      },
    }),

    getUsers: builder.query({
      query: (query) => {
        if (query?.search) {
          return `users/?searchTerm=${query?.search}&page=${query.page}&limit=2`;
        }
        return `users/?limit=2&page=${query?.page}`;
      },
    }),
    getUsersStatus: builder.query({
      query: () => {
        return `users/`;
      },
    }),
    getSingleUser: builder.query({
      query: (id) => {
        return `/users/${id}`;
      },
    }),
    changeUserStatus: builder.mutation({
      query: (id) => {
        return {
          url: `users/status/${id}`,
          method: "PATCH",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
    }),
    promotedToAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/promote-admin/${id}`,
          method: "PATCH",
        };
      },
    }),
    followUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users/follow",
          method: "POST",
          body: data,
        };
      },
    }),
    unFollowUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users/unfollow",
          method: "POST",
          body: data,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        const email = { email: data };

        return {
          url: "/auth/forget-password",
          method: "POST",
          body: email,
        };
      },
    }),
    updatePassword: builder.mutation({
      query: (data) => {

        return {
          url: "/users/updatePass",
          method: "POST",
          body: data,
        };
      },
    }),
    updateUserInfo: builder.mutation({
      query: (data) => {
        console.log(data);

        return {
          url: `/users/${data?._id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
    }),
    getFollowers: builder.query({
      query: (_id) => {
        return {
          url: `/users/followers/${_id}`,
          method: "get",
        };
      },
    }),
    getFollowing: builder.query({
      query: (_id) => {
        return {
          url: `/users/following/${_id}`,
          method: "get",
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useAddAdminMutation,
  usePromoteToPremiumMutation,
  useGetUsersQuery,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  usePromotedToAdminMutation,
  useGetUsersStatusQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useGetSingleUserQuery,
  useForgetPasswordMutation,
  useUpdateUserInfoMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useUpdatePasswordMutation
} = authApi;
