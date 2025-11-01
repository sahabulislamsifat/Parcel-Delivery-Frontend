// src/redux/features/parcels/parcelApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Parcel (Sender)
    createParcel: builder.mutation<any, any>({
      query: (data) => ({
        url: "/parcel/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Get all parcels (Admin)
    getAllParcels: builder.query<
      any,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        return {
          url: `/parcel/all-parcels?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),

    // NEW: Sender’s own parcels
    getMyParcels: builder.query<
      any,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        return {
          url: `/parcel/my-parcels?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),

    getParcelById: builder.query({
      query: (id) => ({
        url: `/parcel/${id}`,
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

    // Parcel Statistics
    getParcelStatistics: builder.query<any, void>({
      query: () => ({
        url: "/parcel/statistics",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useLazyGetMyParcelsQuery,
  useGetParcelByIdQuery,
  useGetAllParcelsQuery,
  useGetMyParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockUnblockParcelMutation,
  useDeleteParcelMutation,
  useGetParcelStatisticsQuery,
} = parcelApi;

export type ParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "BLOCKED";
