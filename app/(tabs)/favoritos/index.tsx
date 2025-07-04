import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

const FavoritosScreen = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>FavoritosScreen</Text>
      <Pressable
        onPress={() => {
          logout();
        }}
      >
        Salir
      </Pressable>
    </View>
  );
};

export default FavoritosScreen;
