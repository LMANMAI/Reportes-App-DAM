import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="auth/index"
        //component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/index"
        // component={HomeScreen}
        options={{ headerShadowVisible: false }}
      />
    </Stack>
    //<Stack />
  );
};

export default _layout;
