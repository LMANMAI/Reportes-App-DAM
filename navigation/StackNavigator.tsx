import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthScreen, HomeScreen } from "../containers";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  console.log("desde el navigatiton");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
