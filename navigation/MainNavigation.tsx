import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Extra, Venue, WashType } from "../entities/Interfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChooseVenueScreen from "../screens/ChooseVenueScreen";
import WashTypeScreen from "../screens/WashTypeScreen";
import ExtrasScreen from "../screens/ExtrasScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import StoresScreen from "../screens/StoresScreen";
import RewardsScreen from "../screens/RewardsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from "../App";
import CustomHeader from "../components/CustomHeader";

const Tab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "Stores") {
            iconName = "map";
          } else if (route.name === "Rewards") {
            iconName = "star";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          // You can return any component that you like here!
          return <Icon name={iconName || "home"} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0DCC70",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 70 },
        tabBarItemStyle: { paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="home" component={HomeStackNavigator} />
      <Tab.Screen name="Stores" component={StoresScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="homescreen" component={HomeScreen}   options={{
    header: props => <CustomHeader screen="home" />,
  }} />
      <HomeStack.Screen name="chooseVenue" component={ChooseVenueScreen} options={{headerTitle: "1. Choose Venue"}} />
      <HomeStack.Screen name="chooseWashType" component={WashTypeScreen} options={{headerTitle: "2. Choose Wash Type"}} />
      <HomeStack.Screen name="chooseExtras" component={ExtrasScreen} options={{headerTitle: "3. Choose Extras"}} />
      <HomeStack.Screen name="checkout" component={CheckoutScreen} options={{headerTitle: "4. Checkout"}} />
    </HomeStack.Navigator>
  );
};
