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
    getItemDetail: builder.query({
      query: (id) => `items/${id}`,
      providesTags: ["ItemDetail"],
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    getUserDetail: builder.query({
      query: (token) => ({
        url: "/users/detail",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["UserDetail"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
  useGetItemDetailQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetUserDetailQuery,
} = apiSlice;
