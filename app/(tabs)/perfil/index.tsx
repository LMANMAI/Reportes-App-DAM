import ChangeImg from "@/components/ChangeImg";
import { useAuth } from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const PerfilScreen = () => {
  const { logout } = useAuth();
  const [profileImage, setProfileImage] = useState('https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg');

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Pressable onPress={takePhoto}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderColor: "#DADCE0",
              borderWidth: 1,
            }}
            source={{ uri: profileImage }}
          />
        </Pressable>
        <Text>Perfil</Text>
      </View>

      <View>
        <Pressable
          onPress={logout}
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