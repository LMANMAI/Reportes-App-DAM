import { useAuth } from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const PerfilScreen = () => {
  const { logout } = useAuth();
  const [profileImage, setProfileImage] = useState('https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg');

  const takePhoto = async () => {
    //Se usa ImagePicker pero lanzando directo la cámara, para no tener que elegir de la galería.
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //Recorte desactivado, a elección.
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      //Si el usuario no canceló el proceso, agarramos el URI generado y lo seteamos como pfp.
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    //Convertir la imagen de perfil en un pressable.
    <View style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Pressable onLongPress={takePhoto}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderColor: "#DADCE0",
              borderWidth: 1,
            }}

            //Tomamos el uri, ya sea el default (la url del veectezy) o el que seteó el usuario.
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