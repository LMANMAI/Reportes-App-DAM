import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
  //   return <Stack />;
};

export default _layout;
