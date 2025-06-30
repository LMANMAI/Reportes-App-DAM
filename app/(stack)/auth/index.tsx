import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const AuthScreen = () => {
  return (
    <View>
      <Text>AuthScreen</Text>
      <Pressable
        onPress={() => {
          router.push("/(tabs)/home");
          //navigation.navigate("Home");
        }}
      >
        Entrar
      </Pressable>
    </View>
  );
};

export default AuthScreen;
