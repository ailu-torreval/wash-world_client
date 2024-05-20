import { Appearance, LogBox, StyleSheet } from "react-native";
import { Colors, ThemeProvider, createTheme, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppDispatch, store } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { Role } from "./entities/role";
import AdminNavigation from "./navigation/AdminNavigation";
import MainNavigation from "./navigation/MainNavigation";
import LoginNavigation from "./navigation/LoginNavigation";
import { getProfile, setToken } from "./store/clientSlice";
import { NavigationContainer } from "@react-navigation/native";
import { Extra, Venue, WashType } from "./entities/Interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const theme = createTheme({
  darkColors: {
    primary: "#0DCC70",
    secondary: "#0CEF78",
    success: "#0DCC70",
    warning: "#FFA726",
    background: "#121212",
  },
  lightColors: {
    primary: "#0DCC70",
    secondary: "#0CEF78",
    success: "#0DCC70",
    warning: "#FFA726",
  },
  mode: "dark",
});

export type RootStackParamList = {
  main: undefined;
  login: undefined;
  signup: undefined;
  home: undefined;
  chooseVenue: undefined;
  chooseWashType: { venue: Venue };
  chooseExtras: { venue: Venue; washType: WashType };
  checkout: { venue: Venue; washType: WashType; extras: Extra[] };
  stores: undefined;
  rewards: undefined;
  profile: undefined;
  mainNav: undefined;
  homescreen: undefined;
};

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
  const client = useSelector((state: any) => state.client);

  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  console.log("jdjddko");
useEffect(() => {
  LogBox.ignoreLogs([
    "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
  ]);
  async function readFromSecureStore() {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      await dispatch(setToken(token));
      await dispatch(getProfile(token));
    }
  }
  console.log(client)
  readFromSecureStore();
}, []);

useEffect(() => {
  if (client && client.role === Role.Admin) {
    setIsAdmin(true);
  }
  console.log(client)
  setIsLogged(true);
}, [client]);

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.white,
          text: theme.colors.black,
          border: "",
          notification: "",
        },
        dark: theme.mode === "dark",
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogged ? (
          isAdmin ? (
            <Stack.Group>
              <Stack.Screen name="AdminNav" component={AdminNavigation} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="mainNav" component={MainNavigation} />
            </Stack.Group>
          )
        ) : (
          <Stack.Group>
            <Stack.Screen name="LoginNav">
              {(props: any) => (
                <LoginNavigation
                  {...props}
                  setIsLogged={setIsLogged}
                  setIsAdmin={setIsAdmin}
                />
              )}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
