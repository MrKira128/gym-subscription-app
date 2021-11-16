import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { theme, colorScheme } from "./../config/Theme";
import { MainScreen } from "./../screens/MainScreen";
import { SettingsScreen } from "./../screens/SettingsScreen";


const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "المشتركون") {
            iconName = "person";
          } else if (route.name === "الاعدادات") {
            iconName = "settings";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colorScheme.primary,
        tabBarInactiveTintColor: colorScheme.secondary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="المشتركون" component={MainScreen} />
      <Tab.Screen name="الاعدادات" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
