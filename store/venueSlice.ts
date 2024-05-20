import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Venue } from "../entities/Interfaces";
import { VenuesAPI } from "../api/venuesAPI";

export interface VenuesState {
  venues: Venue[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: VenuesState = {
  venues: [],
  loading: false,
  error: null,
};

// First, create the thunk
export const fetchAllVenues = createAsyncThunk(
  "fetchAllVenues",
  async (thunkAPI) => {
    return await VenuesAPI.fetchAllVenues();
  }
);
export const fetchAllVenuesByAdmin = createAsyncThunk(
  "fetchAllVenuesByAdmin",
  async (thunkAPI) => {
    return await VenuesAPI.fetchAllVenuesByAdmin();
  }
);

export const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVenues.pending, (state: VenuesState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVenues.fulfilled, (state: VenuesState, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(fetchAllVenues.rejected, (state: VenuesState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }),
      builder
      .addCase(fetchAllVenuesByAdmin.pending, (state: VenuesState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVenuesByAdmin.fulfilled, (state: VenuesState, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(fetchAllVenuesByAdmin.rejected, (state: VenuesState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = venueSlice.actions;

export default venueSlice.reducer;
