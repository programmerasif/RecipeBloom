/* eslint-disable @typescript-eslint/no-unused-expressions */
import { baseApi } from "../../baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getProductsForBooking: builder.query({
    //   query: (query) => {
    //     if (query?.search) {
    //       return `/facility??searchTerm=${query?.search}&page=${query.page}&limit=${query.limit}`;
    //     } else if (query?.filter) {
    //       `/facility??category=${query?.filter}&page=${query.page}&limit=${query.limit}`;
    //     } else if (query?.back) {
    //       `/facility??page=${query.page}&limit=${query.limit}`;
    //     } else if (query.all) {
    //       return "/facility?";
    //     }
    //     return `/facility??page=${query.page}&limit=${query.limit}`;
    //   },
    // }),
    getUserRecipes: builder.query({
      query: (data) => {
        const { query, id } = data;
        console.log(query, id, "line 20 api");
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
} = recipeApi;
