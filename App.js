// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import PocketsScreen from "./src/screens/PocketsScreen";
import LearnScreen from "./src/screens/LearnScreen";
import StreaksScreen from "./src/screens/StreaksScreen";
import { colors } from "./src/theme/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#020617",
            borderTopColor: "#111827",
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarIcon: ({ color, size }) => {
            let iconName = "home-outline";

            if (route.name === "Home") iconName = "home-outline";
            if (route.name === "Pockets") iconName = "wallet-outline";
            if (route.name === "Learn") iconName = "book-outline";
            if (route.name === "Streaks") iconName = "people-circle-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pockets" component={PocketsScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Streaks" component={StreaksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
