import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import * as SecureStore from "expo-secure-store";
import { Client } from "../entities/Client";
import { LoginUserDto } from "../entities/LoginUserDTO";
import { ClientAPI } from "../api/clientAPI";
import { SignupUserDto } from "../entities/SignupUserDTO";

interface ClientState {
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
  "auth/signup",
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
    "auth/profile",
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

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "";
      console.log("test");

      SecureStore.deleteItemAsync("token");
      SecureStore.deleteItemAsync("role");
    },
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
        SecureStore.setItemAsync("token", action.payload.token);
        SecureStore.setItemAsync("role", action.payload.client.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
        SecureStore.setItemAsync("role", action.payload.client.role);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout } = clientSlice.actions;
// export const selectUser = (state: RootState) => state.user.user;
// export const selectToken = (state: RootState) => state.user.token;
// export const selectLoading = (state: RootState) => state.user.loading;
// export const selectError = (state: RootState) => state.user.error;

export default clientSlice.reducer;
