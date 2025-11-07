import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserMeta {
  _id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: IUserMeta | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: IUserMeta; token?: string }>
    ) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        // persist token for axiosBaseQuery to read from localStorage
        localStorage.setItem("accessToken", action.payload.token);
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
