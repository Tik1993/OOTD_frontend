import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Items", "Categories", "Subcategories", "ItemDetail"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "items",
      providesTags: ["Items"],
      invalidatesTags: ["ItemDetail"],
    }),
    getCategories: builder.query({
      query: () => "categories",
      providesTags: ["Categories"],
      invalidatesTags: ["ItemDetail"],
    }),
    getSubcategories: builder.query({
      query: () => "subcategories",
      providesTags: ["Subcategories"],
      invalidatesTags: ["ItemDetail"],
    }),
    getItemDeatil: builder.query({
      query: (id) => `items/${id}`,
      providesTags: ["ItemDetail"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
  useGetItemDeatilQuery,
} = apiSlice;
