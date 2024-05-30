import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import React from "react";
import AdminProfileScreen from "../screens/AdminProfileScreen";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";


const Tab = createBottomTabNavigator();

const AdminNavigation: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Venues") {
            iconName = "garage-variant";
          } else if (route.name === "Services") {
            iconName = "car-wash";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          // You can return any component that you like here!
          return  <MaterialIcon  name={iconName || "map"} size={size +8} color={color} />;
        },
        tabBarActiveTintColor: "#0DCC70",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 100 },
        tabBarItemStyle: { paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Venues" component={AdminHomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Settings" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
};

export default AdminNavigation;
