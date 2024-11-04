/* eslint-disable @typescript-eslint/no-unused-expressions */
import { baseApi } from "../../baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRecipes: builder.query({
      query: (data) => {
        const { query, id } = data;

        if (query?.search) {
          return `/recipe/user/${id}?searchTerm=${query?.search}&page=${query.page}&limit=1`;
        }
        return `/recipe/user/${id}?limit=2&page=${query?.page}`;
      },
    }),
    getUserFeedRecipes: builder.query({
      query: (query) => {
        if (query?.search) {
          return `recipe/?searchTerm=${query?.search}&page=${query.page}&limit=2`;
        }
        return `recipe/?limit=2&page=${query?.page}`;
      },
    }),
    createRecipe: builder.mutation({
      query: (data) => {
        return {
          url: `/recipe/create-recipe`,
          method: "post",

          body: data,
        };
      },
    }),
    comments: builder.mutation({
      query: (data) => {
        return {
          url: `/comment`,
          method: "post",

          body: data,
        };
      },
    }),
    updateComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/updateComment`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/deleteComment`,
          method: "DELETE",
          body: data,
        };
      },
    }),
    giveLike: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/like`,
          method: "post",
          body: data,
        };
      },
    }),
    givedislike: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/dislike`,
          method: "post",
          body: data,
        };
      },
    }),
    getComments: builder.query({
      query: (id) => {
        return {
          url: `/comment/${id}`,
          method: "GET",
        };
      },
    }),
    updateRecipe: builder.mutation({
      query: (data) => {
        return {
          url: `recipe/${data._id}`,
          method: "PATCH",

          body: data?.updateData,
        };
      },
    }),
    deleteRecipe: builder.mutation({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "delete",
        };
      },
    }),
    getSingleRecipe: builder.query({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetUserRecipesQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useGetUserFeedRecipesQuery,
  useGetSingleRecipeQuery,
  useCommentsMutation,
  useGetCommentsQuery,
  useGiveLikeMutation,
  useGivedislikeMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = recipeApi;
