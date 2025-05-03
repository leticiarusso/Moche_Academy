import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform } from "react-native";
import SettingsScreen from "../definicoes";

const Stack = createStackNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs Navigator */}
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {() => (
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: "#800077", // Active icon color
              tabBarInactiveTintColor:
                Colors[colorScheme ?? "light"].tabIconDefault, // Inactive icon color
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: {
                ...Platform.select({
                  ios: {
                    position: "absolute",
                    backgroundColor: "white",
                  },
                  android: {
                    paddingBottom: 20,
                    height: 80,
                  },
                }),
                backgroundColor: "white",
              },
            }}
          >
            <Tabs.Screen
              name="challenges"
              options={{
                title: "Challenges",
                tabBarIcon: ({ color }) => (
                  <Image
                    source={require("@/assets/images/Desafios.png")}
                    style={{ tintColor: color, width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="store"
              options={{
                title: "Store",
                tabBarIcon: ({ color }) => (
                  <Image
                    source={require("@/assets/images/loja.png")}
                    style={{ tintColor: color, width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <Image
                    source={require("@/assets/images/Moche.png")}
                    style={{ tintColor: color, width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="leaderboard"
              options={{
                title: "Leaderboard",
                tabBarIcon: ({ color }) => (
                  <Image
                    source={require("@/assets/images/board.png")}
                    style={{ tintColor: color, width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "profile",
                tabBarIcon: ({ color }) => (
                  <Image
                    source={require("@/assets/images/profile.png")}
                    style={{ tintColor: color, width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="game"
              options={{
                title: "game",
                tabBarIcon: ({ color }) => (
                  <Image
                    source={require("@/assets/images/profile.png")}
                    style={{ tintColor: color, width: 28, height: 28 }}
                  />
                ),
              }}
            />
          </Tabs>
        )}
      </Stack.Screen>

      {/* Historico Page */}
      <Stack.Screen
        name="definicoes"
        component={SettingsScreen} // Replace with your actual component
        options={{ headerShown: false }} // Remove the header for this page
      />
    </Stack.Navigator>
  );
}
