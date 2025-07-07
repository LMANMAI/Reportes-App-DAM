import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

const _layout = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <Slot />
    </AuthProvider>
  );
  //   return <Stack />;
};

export default _layout;
