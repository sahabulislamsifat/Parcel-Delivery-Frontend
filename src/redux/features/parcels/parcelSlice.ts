import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ParcelState {
  selectedParcelId: string | null;
}

const initialState: ParcelState = {
  selectedParcelId: null,
};

const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    setSelectedParcelId: (state, action: PayloadAction<string | null>) => {
      state.selectedParcelId = action.payload;
    },
  },
});

export const { setSelectedParcelId } = parcelSlice.actions;
export default parcelSlice.reducer;
