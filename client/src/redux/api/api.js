import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Category", "Services"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `api/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "api/products",
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (newProduct) => ({
        url: "api/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `api/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: (productId) => ({
        url: `api/products/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
    }),
    getCategory: build.query({
      query: () => "api/category",
      providesTags: ["Category"],
    }),
    createService: build.mutation({
      query: (newService) => ({
        url: "api/services",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: ["Services"],
    }),
    getServices: build.query({
      query: () => "api/services",
      providesTags: ["Services"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetCategoryQuery,
  useCreateServiceMutation,
  useGetServicesQuery,
} = api;
