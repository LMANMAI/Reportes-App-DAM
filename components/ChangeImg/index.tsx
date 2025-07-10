// import { FontAwesome } from "@expo/vector-icons";
// import axios from "axios";
// import * as ImagePicker from "expo-image-picker";
// import { addDoc, collection } from "firebase/firestore";
// import React from "react";
// import { Pressable, Text, View } from "react-native";
// import { db } from "../../config/config";

// export const guardarEnFirestore = async (imageUrl: string) => {
//   try {
//     await addDoc(collection(db, "imagenes"), {
//       url: imageUrl,
//       fecha: new Date(),
//     });
//     console.log("Imagen guardada en Firestore!");
//   } catch (error) {
//     console.error("Error al guardar en Firestore", error);
//   }
// };
// export const uploadToCloudinary = async (imageUri: any) => {
//   const response = await fetch(imageUri);
//   const blob = await response.blob();

//   const data = new FormData();
//   data.append("file", blob);
//   data.append("upload_preset", "react_native_upload");
//   data.append("cloud_name", "Tdr0zsc99c");
//   try {
//     const res = await axios.post(
//       "https://api.cloudinary.com/v1_1/dr0zsc99c/image/upload",
//       data,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return res.data.secure_url;
//   } catch (err) {
//     console.error("Error subiendo a Cloudinary", err);
//     throw err;
//   }
// };

// const handleCambiarFoto = async () => {
//   try {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;

//       const imageUrl = await uploadToCloudinary(uri);

//       await guardarEnFirestore(imageUrl);

//       alert("Foto actualizada con éxito!");
//     }
//   } catch (error) {
//     console.error("Error al cambiar la foto de perfil:", error);
//     alert("Hubo un problema al cambiar la foto");
//   }
// };

// const ChangeImg = () => {
//   return (
//     <View>
//       <Pressable
//         onPress={handleCambiarFoto}
//         style={{
//           paddingHorizontal: 15,
//           paddingVertical: 10,
//           borderTopLeftRadius: 10,
//           borderTopRightRadius: 10,
//           flexDirection: "row",
//           justifyContent: "space-between",
//           borderColor: "#DADCE0",
//           borderWidth: 1,
//           backgroundColor: "#FFF",
//         }}
//       >
//         <Text>Cambiar foto de perfil</Text>
//         <FontAwesome size={18} name="chevron-right" color={"#1A73E8"} />
//       </Pressable>
//     </View>
//   );
// };

// export default ChangeImg;
