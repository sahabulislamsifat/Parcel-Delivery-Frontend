import type {
  IResponseWithMeta,
  IUser,
  IUserListResponse,
  IUserQueryParams,
} from "@/types";
import { baseApi } from "../api/baseApi";

// User API endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      IResponseWithMeta<IUserListResponse>,
      IUserQueryParams
    >({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    blockUser: builder.mutation<
      IResponseWithMeta<IUser>,
      { id: string; block: boolean }
    >({
      query: ({ id, block }) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
        data: { block },
      }),
      invalidatesTags: ["USER"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    deleteUser: builder.mutation<IResponseWithMeta<null>, string>({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
