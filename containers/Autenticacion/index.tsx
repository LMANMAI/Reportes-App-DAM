import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>AuthScreen</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>Entrar</Pressable>
    </View>
  );
};

export default AuthScreen;
