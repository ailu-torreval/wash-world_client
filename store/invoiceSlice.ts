import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceDto } from "../entities/InvoiceDTO";
import { Invoice } from "../entities/Invoice";
import { InvoicesAPI } from "../api/invoicesAPI";

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
