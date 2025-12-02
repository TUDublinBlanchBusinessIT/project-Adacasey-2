// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const colors = {
  background: "#050816",
  text: "#F9FAFB",
  textMuted: "#9CA3AF",
  primary: "#6366F1",
};

// Simple screens just to get it running
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Wealth Wise</Text>
      <Text style={styles.subtitle}>
        Save smarter. Learn better. Build money habits that last.
      </Text>
    </View>
  );
}

function PocketsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Pockets</Text>
      <Text style={styles.subtitle}>
        Manage Savings, Expenses and Travel pockets here.
      </Text>
    </View>
  );
}

function LearnScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>
        Short lessons to improve your financial literacy.
      </Text>
    </View>
  );
}

function StreaksScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Streaks</Text>
      <Text style={styles.subtitle}>
        Track streaks with friends and family for saving and learning.
      </Text>
    </View>
  );
}

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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: "center",
  },
});
