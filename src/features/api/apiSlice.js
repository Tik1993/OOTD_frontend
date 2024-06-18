import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
      query: () => ({
        url: "/users/detail",
        method: "GET",
      }),
      providesTags: ["UserDetail"],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
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
  useRefreshTokenMutation,
} = apiSlice;
