import { useAuth } from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { auth, db } from "../../../config/config";
const PerfilScreen = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(
    user?.photoURL ??
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

  const uploadToCloudinary = async (imageUri: string) => {
    const data = new FormData();

    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "foto.jpg",
    } as any);
    data.append("upload_preset", "react_native_upload");

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

      console.log("✅ URL subida:", res.data.secure_url);
      return res.data.secure_url;
    } catch (err: any) {
      if (err.response) {
        console.error("🔴 Cloudinary Error response:", err.response.data);
      } else if (err.request) {
        console.error("🟡 Sin respuesta del servidor:", err.request);
      } else {
        console.error("⚠️ Axios error:", err.message);
      }
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
      const uri = result.assets[0].uri;

      try {
        const imageUrl = await uploadToCloudinary(uri);
        await updateProfile(auth.currentUser!, { photoURL: imageUrl });
        await guardarEnFirestore(imageUrl);
        setProfileImage(imageUrl);

        alert("Foto actualizada con éxito!");
      } catch (error) {
        console.error("❌ Error al actualizar la imagen:", error);
        Alert.alert("Error", "No se pudo actualizar la imagen.");
      }
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
