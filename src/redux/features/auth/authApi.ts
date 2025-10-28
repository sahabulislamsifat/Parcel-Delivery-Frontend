import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";
import { baseApi } from "../api/baseApi";

// Logged-in user type (adjust fields as needed)
interface IUser {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  role: "ADMIN" | "SENDER" | "RECEIVER";
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<IUser>, Partial<IUser>>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<
      IResponse<IUser>,
      { email: string; password: string }
    >({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["SENDER"],
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    // userInfo query with void type
    userInfo: builder.query<IResponse<IUser>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery, // now works without argument
} = authApi;
