import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "parcelDeliveryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "SENDER", "PARCEL", "ADMIN"],
  endpoints: () => ({}),
});
