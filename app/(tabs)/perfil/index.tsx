import { useAuth } from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { db } from "../../../config/config";

const PerfilScreen = () => {
  const { logout } = useAuth();
  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
  );

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso requerido",
          "Se necesita acceso a la cámara para usar esta función."
        );
      }
    })();
  }, []);

  const guardarEnFirestore = async (imageUrl: string) => {
    try {
      await addDoc(collection(db, "imagenes"), {
        url: imageUrl,
        fecha: new Date(),
      });
      console.log("Imagen guardada en Firestore!");
    } catch (error) {
      console.error("Error al guardar en Firestore", error);
    }
  };
  const uploadToCloudinary = async (imageUri: any) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const data = new FormData();
    data.append("file", blob);
    data.append("upload_preset", "react_native_upload");
    data.append("cloud_name", "Tdr0zsc99c");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dr0zsc99c/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.secure_url;
    } catch (err) {
      console.error("Error subiendo a Cloudinary", err);
      throw err;
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.getCameraPermissionsAsync();
    if (!permission.granted) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se puede acceder a la cámara.");
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      const uri = result.assets[0].uri;
      const imageUrl = await uploadToCloudinary(uri);
      await guardarEnFirestore(imageUrl);
      alert("Foto actualizada con éxito!");
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
