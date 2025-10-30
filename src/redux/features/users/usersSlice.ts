import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserFilterState {
  page: number;
  limit: number;
  search: string;
  role: string;
  status: string;
}

const initialState: UserFilterState = {
  page: 1,
  limit: 10,
  search: "",
  role: "",
  status: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<UserFilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = userSlice.actions;
export default userSlice.reducer;
