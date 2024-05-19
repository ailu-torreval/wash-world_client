import { Appearance, LogBox, StyleSheet } from "react-native";
import { Colors, ThemeProvider, createTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppDispatch, store } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { Role } from "./entities/role";
import AdminNavigation from "./navigation/AdminNavigation";
import MainNavigation from "./navigation/MainNavigation";
import LoginNavigation from "./navigation/LoginNavigation";
import { getProfile, setToken } from "./store/clientSlice";

const theme = createTheme({
  darkColors: {
    primary: "#0DCC70",
    secondary: "#0CEF78",
    success: "#0DCC70",
    warning: "#FFA726",
    background: "#121212"

  },
  lightColors: {
    primary: "#0DCC70",
    secondary: "#0CEF78",
    success: "#0DCC70",
    warning: "#FFA726",
  },
  mode: "dark",
});


const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  console.log(isLogged);


  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const role = await SecureStore.getItemAsync("role");
        console.log(role)
        dispatch(setToken(token));
        dispatch(getProfile(token));
        role === Role.Admin && setIsAdmin(true);
        setIsLogged(true);
      }
    }
    readFromSecureStore();
  }, []);

  return(<>
  {isLogged ? (
    isAdmin ? (
      <AdminNavigation />
    ) : (
      <MainNavigation />
    )
  ) : (
    <LoginNavigation />
  )}
  </>)
}
