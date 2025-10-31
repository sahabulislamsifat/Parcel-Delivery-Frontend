/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all parcels (Admin)
    getAllParcels: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/parcel/all-parcels?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    // Update parcel status
    updateParcelStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/parcel/status/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Block / Unblock a parcel
    blockUnblockParcel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/parcel/block-unblock/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Delete parcel
    deleteParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockUnblockParcelMutation,
  useDeleteParcelMutation,
} = parcelApi;
