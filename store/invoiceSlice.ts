import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceDto } from "../entities/InvoiceDTO";
import { Invoice } from "../entities/Invoice";
import { InvoicesAPI } from "../api/invoicesAPI";
import { Venue } from "../entities/Venue";
import { WashType } from "../entities/WashType";
import { Extra } from "../entities/Extra";
import { RootState } from "./store";
import { invoiceCreated } from "./clientSlice";

interface InvoiceState {
  invoiceDto: Partial<InvoiceDto>;
  invoice: Invoice | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: InvoiceState = {
  invoiceDto: {
    client_id: undefined,
    venue_id: undefined,
    washType_id: undefined,
    extras_ids: undefined,
    total_amount: undefined,
    points_earned: undefined,
    points_redeemed: undefined,
  },
  invoice: null,
  loading: false,
  error: null,
};

export const createInvoice = createAsyncThunk(
  "createInvoice",
  async (_, thunkAPI) => {
    let state: RootState = thunkAPI.getState() as RootState;
    const invoiceDto: InvoiceDto = state.invoice.invoiceDto as InvoiceDto;
    try {
      const response = await InvoicesAPI.createInvoice(invoiceDto) as unknown as Invoice;
      thunkAPI.dispatch(invoiceCreated(response));
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
      // state.invoiceDto = { ...state.invoiceDto, ...action.payload };
      // console.log("FROM SLICE", state.invoiceDto)
      state.invoiceDto = { ...state.invoiceDto, ...action.payload };
      if (action.payload.extras_ids) {
        state.invoiceDto.extras_ids = action.payload.extras_ids;
      }
      console.log("FROM SLICE", state.invoiceDto);
    },
    replaceInvoiceDto: (state, action: PayloadAction<InvoiceDto>) => {
      state.invoiceDto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.loading = false;
          state.invoice = action.payload;
          console.log("invoice created, invoice slice", action.payload)
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
