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
      const newInvoiceDto = { ...state.invoiceDto };

      if (newInvoiceDto.venue_id instanceof Venue) {
        newInvoiceDto.venue_id = newInvoiceDto.venue_id.id;
      }
      if (newInvoiceDto.washType_id instanceof WashType) {
        newInvoiceDto.washType_id = newInvoiceDto.washType_id.id;
      }
      if (Array.isArray(newInvoiceDto.extras_ids)) {
        newInvoiceDto.extras_ids = newInvoiceDto.extras_ids.map(extra => extra instanceof Extra ? extra.id : 0);
      }
    
      state.invoiceDto = newInvoiceDto;
      console.log("finalized invoice", state.invoiceDto)
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

export const { updateInvoiceDto, finalizeInvoiceDto } = invoiceSlice.actions;

export default invoiceSlice.reducer;
