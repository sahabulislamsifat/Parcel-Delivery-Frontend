/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

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

export interface Parcel {
  _id: string;
  senderId: string;
  receiverId: string;
  status: ParcelStatus | string;
  trackingId: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any; // other fields
}

export interface ParcelPaginationResponse {
  data: Parcel[];
  total: number;
  page: number;
  limit: number;
}

export interface ParcelStatistics {
  totalParcels: number;
  delivered: number;
  pending: number;
  cancelled: number;
  [key: string]: number;
}

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* SENDER
    // Create Parcel (Sender)
    createParcel: builder.mutation<Parcel, Partial<Parcel>>({
      query: (data) => ({
        url: "/parcel/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Sender’s own parcels
    getMyParcels: builder.query<
      ParcelPaginationResponse,
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

    // Delivered parcels (sender view)
    getDeliveredParcels: builder.query<
      ParcelPaginationResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        return { url: `/parcel/delivered?${params.toString()}`, method: "GET" };
      },
      providesTags: ["PARCEL"],
    }),

    updateParcelStatus: builder.mutation<
      Parcel,
      { id: string; data: Partial<Parcel> }
    >({
      query: ({ id, data }) => ({
        url: `/parcel/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    deleteParcel: builder.mutation<void, string>({
      query: (id) => ({
        url: `/parcel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    cancelParcel: builder.mutation<Parcel, string>({
      query: (id) => ({
        url: `/parcel/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    //* Receiver
    getIncomingParcels: builder.query<
      ParcelPaginationResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        return {
          url: `/parcel/incoming-parcels?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),

    getDeliveredParcelsForReceiver: builder.query<
      ParcelPaginationResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        return {
          url: `/parcel/delivered?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),

    confirmDelivery: builder.mutation<
      Parcel,
      { id: string; action: "DELIVERED" | "RETURNED" }
    >({
      query: ({ id, action }) => ({
        url: `/parcel/confirm-delivery/${id}`,
        method: "PATCH",
        data: { action }, // Receiver can choose to deliver OR return
      }),
      invalidatesTags: ["PARCEL"],
    }),

    getReceiverStats: builder.query<ParcelStatistics, void>({
      query: () => ({
        url: "/parcel/receiver-statistics",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    //* ADMIN
    // Get all parcels (Admin)
    getAllParcels: builder.query<
      ParcelPaginationResponse,
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

    getParcelStatistics: builder.query<ParcelStatistics, void>({
      query: () => ({ url: "/parcel/statistics", method: "GET" }),
      providesTags: ["PARCEL"],
    }),

    // Update parcel status
    updateParcelByAdmin: builder.mutation<
      Parcel,
      { id: string; data: Partial<Parcel> }
    >({
      query: ({ id, data }) => ({
        url: `/parcel/admin-update/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Block / Unblock a parcel
    blockUnblockParcel: builder.mutation<
      Parcel,
      { id: string; data: { block: boolean } }
    >({
      query: ({ id, data }) => ({
        url: `/parcel/block-unblock/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Delete parcel
    deleteParcelByAdmin: builder.mutation<void, string>({
      query: (id) => ({ url: `/parcel/admin-delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["PARCEL"],
    }),

    //* Common
    getParcelById: builder.query<Parcel, string>({
      query: (id) => ({ url: `/parcel/${id}`, method: "GET" }),
      providesTags: ["PARCEL"],
    }),

    getParcelHistory: builder.query({
      query: (id) => ({
        url: `/parcel/status-logs/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    // Track Parcel (Public)
    trackParcel: builder.query<Parcel, string>({
      query: (trackingId) => ({
        url: `/parcel/track/${trackingId}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  // Sender
  useCreateParcelMutation,
  useGetMyParcelsQuery,
  useLazyGetMyParcelsQuery,
  useGetDeliveredParcelsQuery,
  useUpdateParcelStatusMutation,
  useDeleteParcelMutation,
  useCancelParcelMutation,

  // Receiver
  useGetIncomingParcelsQuery,
  useGetDeliveredParcelsForReceiverQuery,
  useConfirmDeliveryMutation,
  useGetReceiverStatsQuery,

  // Admin
  useGetAllParcelsQuery,
  useGetParcelStatisticsQuery,
  useUpdateParcelByAdminMutation,
  useBlockUnblockParcelMutation,
  useDeleteParcelByAdminMutation,

  // Common
  useGetParcelByIdQuery,
  useGetParcelHistoryQuery,
  useLazyTrackParcelQuery,
} = parcelApi;
