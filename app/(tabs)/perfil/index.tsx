import ChangeImg from "@/components/ChangeImg";
import { useAuth } from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const PerfilScreen = () => {
  const { logout } = useAuth();
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderColor: "#DADCE0",
              borderWidth: 1,
            }}
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg",
            }}
          />
        </View>
        <Text>Perfil</Text>
      </View>

      <View>
        <ChangeImg />
        <Pressable
          onPress={() => {}}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: "#DADCE0",
            borderWidth: 1,
            backgroundColor: "#FFF",
          }}
        >
          <Text>Cambiar foto de perfil</Text>
          <FontAwesome size={18} name="chevron-right" color={"#1A73E8"} />
        </Pressable>
        <Pressable
          onPress={() => {
            logout();
          }}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#FFF",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: "#DADCE0",
            borderWidth: 1,
          }}
        >
          <Text>Salir</Text>
          <FontAwesome size={18} name="chevron-right" color={"#1A73E8"} />
        </Pressable>
      </View>
    </View>
  );
};

export default PerfilScreen;
