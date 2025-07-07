import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="auth/index" options={{ headerShown: false }} />

      <Stack.Screen
        name="negocio/[id]"
        options={{
          title: "Detalle del negocio",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
