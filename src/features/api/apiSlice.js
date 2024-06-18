import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    console.log("Token expired, trying to refresh");
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );
    console.log("Refresh result", refreshResult);
    if (refreshResult.data) {
      api.dispatch(setToken(refreshResult.data.accessToken));
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
