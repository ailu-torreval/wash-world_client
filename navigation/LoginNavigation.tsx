import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { Button, useTheme, useThemeMode } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type LoginStackParamList = {
  main: undefined;
  login: undefined;
  signup: undefined;
};

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

const LoginNavigation: React.FC = () => {
  const { theme } = useTheme();

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
      <LoginStack.Navigator>
        <LoginStack.Screen
          name="main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <LoginStack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerTitle: "" }}
        />
        <LoginStack.Screen
          name="signup"
          component={SignupScreen}
          options={{ headerTitle: "" }}
        />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;

type Props = NativeStackScreenProps<LoginStackParamList, "main">;

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>LOGIN</Text>
      <Button
        title="Login"
        size="lg"
        onPress={() => navigation.navigate("login")}
      />
      <Button
        title="Signup"
        type="clear"
        size="lg"
        onPress={() => navigation.navigate("signup")}
      />
    </View>
  );
};
