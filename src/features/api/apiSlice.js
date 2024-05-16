import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Items", "Categories", "Subcategories"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "items",
      providesTags: ["Items"],
    }),
    getCategories: builder.query({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    getSubcategories: builder.query({
      query: () => "subcategories",
      providesTags: ["Subcategories"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} = apiSlice;
