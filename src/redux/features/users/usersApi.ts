/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  IResponseWithMeta,
  IUser,
  IUserListResponse,
  IUserQueryParams,
} from "@/types";
import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Get All Users (Admin)
    getAllUsers: builder.query<
      IResponseWithMeta<IUserListResponse>,
      IUserQueryParams | void
    >({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: (result) => {
        const users: IUser[] =
          (result as any)?.data?.users ??
          (result as any)?.data?.data ??
          (Array.isArray((result as any)?.data) ? (result as any).data : []);

        return users && users.length
          ? [
              ...users.map((u: IUser) => ({
                type: "USER" as const,
                id: u._id,
              })),
              { type: "USER", id: "LIST" },
            ]
          : [{ type: "USER", id: "LIST" }];
      },
      keepUnusedDataFor: 30,
    }),

    //  Get Single User
    getSingleUser: builder.query<IResponseWithMeta<IUser>, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "USER", id }],
      keepUnusedDataFor: 60,
    }),

    // Get All Receivers
    getAllReceivers: builder.query<
      IResponseWithMeta<IUserListResponse>,
      IUserQueryParams | void
    >({
      query: (params) => ({
        url: "/user/all-receivers",
        method: "GET",
        params,
      }),
      providesTags: (result) => {
        const users: IUser[] =
          (result as any)?.data?.users ??
          (result as any)?.data?.data ??
          (Array.isArray((result as any)?.data) ? (result as any).data : []);

        return users && users.length
          ? [
              ...users.map((u: IUser) => ({
                type: "USER" as const,
                id: u._id,
              })),
              { type: "USER", id: "LIST" },
            ]
          : [{ type: "USER", id: "LIST" }];
      },
      keepUnusedDataFor: 30,
    }),

    // Block / Unblock User
    blockUser: builder.mutation<
      IResponseWithMeta<IUser>,
      { id: string; block: boolean }
    >({
      query: ({ id, block }) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
        data: { block },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "USER", id: arg.id },
        { type: "USER", id: "LIST" },
      ],
    }),

    // Update User Info
    updateUser: builder.mutation<
      IResponseWithMeta<IUser>,
      { id: string; data: Partial<IUser> }
    >({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "USER", id: arg.id },
        { type: "USER", id: "LIST" },
      ],
    }),

    // Delete User
    deleteUser: builder.mutation<IResponseWithMeta<null>, string>({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "USER", id },
        { type: "USER", id: "LIST" },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllReceiversQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useBlockUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
