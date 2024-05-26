import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import * as SecureStore from "expo-secure-store";
import { Client } from "../entities/Client";
import { LoginUserDto } from "../entities/LoginUserDTO";
import { ClientAPI } from "../api/clientAPI";
import { SignupUserDto } from "../entities/SignupUserDTO";
import { Invoice } from "../entities/Invoice";
import { clearVenues } from "./venueSlice";

export interface ClientState {
  client: Client | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  client: null,
  token: null,
  loading: false,
  error: null,
};

export const invoiceCreated = createAction<Invoice>("client/invoiceCreated");

export const login = createAsyncThunk(
  "login",
  async (credentials: LoginUserDto, thunkAPI) => {
    try {
      const response = await ClientAPI.login(credentials);
      console.log("response", response);
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error);
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (userData: SignupUserDto, thunkAPI) => {
    try {
      const response = ClientAPI.signup(userData);
      // console.log("userSlice", response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const getProfile = createAsyncThunk(
  "profile",
  async (token: string, thunkAPI) => {
    try {
      const response = ClientAPI.getProfile(token);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const logout = createAsyncThunk('logout', async () => {
  await SecureStore.deleteItemAsync('token');
});

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload.client;
        state.token = action.payload.token;
        console.log("state fullfilled", state);
        SecureStore.setItemAsync("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("state", state);
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload.client;
        state.token = action.payload.token;
        SecureStore.setItemAsync("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(invoiceCreated, (state, action) => {
        // Update the reward_points_balance
        console.log("update client", action.payload);
        if (state.client && action.payload.client !== undefined) {
          state.client.reward_points_balance =
            action.payload.client.reward_points_balance;

          const newInvoice = {
            venue: action.payload.venue,
            extras: action.payload.extras,
            date: action.payload.date,
            total_amount: action.payload.total_amount,
            points_earned: action.payload.points_earned,
            washType: action.payload.washType,
            points_redeemed: action.payload.points_redeemed,
            id: action.payload.id,
          };

          // Add the new invoice to the invoices array
          state.client.invoices.push(newInvoice);
          console.log("138", action.payload.client);

          //     // Transform the response to match the shape of client.invoices

          // // Transform the response to match the shape of client.invoices
          // const newInvoice = {
          //   venue: action.payload.venue,
          //   extras: action.payload.extras,
          //   date: action.payload.date,
          //   total_amount: action.payload.total_amount,
          //   points_earned: action.payload.points_earned,
          //   washType: action.payload.washType,
          //   points_redeemed: action.payload.points_redeemed,
          //   id: action.payload.id
          // };

          // // Add the new invoice to the invoices array
          // state.client.invoices.push(newInvoice);
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = '';
        state.client = null;
      });
  },
});

export const { setToken } = clientSlice.actions;
// export const selectUser = (state: RootState) => state.user.user;
// export const selectToken = (state: RootState) => state.user.token;
// export const selectLoading = (state: RootState) => state.user.loading;
// export const selectError = (state: RootState) => state.user.error;

export default clientSlice.reducer;
