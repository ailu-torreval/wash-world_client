import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceDto } from "../entities/InvoiceDTO";
import { Invoice } from "../entities/Invoice";
import { InvoicesAPI } from "../api/invoicesAPI";
import { Venue } from "../entities/Venue";
import { WashType } from "../entities/WashType";
import { Extra } from "../entities/Extra";

interface InvoiceState {
  invoiceDto: Partial<InvoiceDto>;
  invoice: Invoice | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: InvoiceState = {
  invoiceDto: {},
  invoice: null,
  loading: false,
  error: null,
};

export const createInvoice = createAsyncThunk(
  "createInvoice",
  async (invoice: InvoiceDto, thunkAPI) => {
    try {
      const response = InvoicesAPI.createInvoice(invoice);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateInvoiceDto: (state, action: PayloadAction<Partial<InvoiceDto>>) => {
      state.invoiceDto = { ...state.invoiceDto, ...action.payload };
      console.log("FROM SLICE", state.invoiceDto)
    },
    replaceInvoiceDto: (state, action: PayloadAction<InvoiceDto>) => {
      state.invoiceDto = action.payload;
    },
    finalizeInvoiceDto: (state) => {
      if (state.invoiceDto.venue_id instanceof Venue) {
        state.invoiceDto.venue_id = state.invoiceDto.venue_id.id;
      }
      if (state.invoiceDto.washType_id instanceof WashType) {
        state.invoiceDto.washType_id = state.invoiceDto.washType_id.id;
      }
      if (Array.isArray(state.invoiceDto.extras_ids)) {
        state.invoiceDto.extras_ids = state.invoiceDto.extras_ids.map(extra => extra instanceof Extra ? extra.id : 0);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.loading = true
      })
      .addCase(
        createInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.loading = false;
          state.invoice = action.payload;
        }
      )
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateInvoiceDto } = invoiceSlice.actions;

export default invoiceSlice.reducer;
