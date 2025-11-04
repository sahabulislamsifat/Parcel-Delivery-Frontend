// import { createApi } from "@reduxjs/toolkit/query/react";
// import axiosBaseQuery from "./axiosBaseQuery";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: axiosBaseQuery(),
//   tagTypes: ["USER", "SENDER", "PARCEL", "ADMIN"],
//   endpoints: () => ({}),
// });

// src/redux/api/baseApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

/**
 * baseApi: central RTK Query API slice
 * reducerPath kept unique to avoid conflicts
 */
export const baseApi = createApi({
  reducerPath: "parcelDeliveryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "SENDER", "PARCEL", "ADMIN"],
  endpoints: () => ({}),
});
