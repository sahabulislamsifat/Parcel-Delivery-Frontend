/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockUnblockParcelMutation,
  useDeleteParcelMutation,
  useGetParcelStatisticsQuery,
} = parcelApi;
