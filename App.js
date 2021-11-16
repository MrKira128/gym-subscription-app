import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { theme } from "./src/config/Theme";
import { UserScreen } from "./src/screens/UserScreen";
import Navigator from "./src/navigation/Navigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="root" component={Navigator} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}