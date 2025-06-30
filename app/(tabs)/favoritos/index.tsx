import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const FavoritosScreen = () => {
  return (
    <View>
      <Text>FavoritosScreen</Text>
      <Pressable
        onPress={() => {
          router.push("/(stack)/auth");
        }}
      >
        Salir
      </Pressable>
    </View>
  );
};

export default FavoritosScreen;
