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
        createRecipe: builder.mutation({
            query: (data) => {
            
           
            
              return {
                url: `/recipe/create-recipe`,
                method: "post",
               
                body:data
              };
            },
          
          }),
        // updateProducts: builder.mutation({
        //     query: (data) => {
            
        //     if (!data?.token) {
        //       console.log('token not found');
              
        //     }
            
        //       return {
        //         url: `/facility/${data.id}`,
        //         method: "put",
        //         headers: {
        //           Authorization: `${data?.token}`,
        //         },
        //         body:data?.updatedFacilityData
        //       };
        //     },
          
        //   }),
        // deleteProducts: builder.mutation({
        //     query: (data) => {
           
        //     if (!data?.token) {
        //       console.log('token not found');
              
        //     }
            
            
        //       return {
        //         url: `/facility/${data?.id}`,
        //         method: "delete",
        //         headers: {
        //           Authorization: `${data?.token}`, 
        //           'Content-Type': 'application/json',  
        //       }
        //       };
        //     },
          
        //   }),
        // getSingleProduct: builder.query({
        //     query: (id) => {
             
              
        //       return {
        //         url: `/facility/${id}`,
        //         method: "get",
        //       };
        //     },   
        //   }),
     
      
    }),
  });
  
  export const {
useCreateRecipeMutation
    
  } = recipeApi;