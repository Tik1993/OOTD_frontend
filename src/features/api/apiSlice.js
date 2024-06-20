import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ootd-backend.onrender.com",
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
    addWishlist: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { itemId },
      }),
    }),
    addCloset: builder.mutation({
      query: ({ userId, itemDetail }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { itemDetail },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled;
          //console.log(data)
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
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
  useAddWishlistMutation,
  useAddClosetMutation,
  useSendLogoutMutation,
} = apiSlice;
