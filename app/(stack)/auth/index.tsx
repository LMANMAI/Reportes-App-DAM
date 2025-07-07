import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { FirebaseError } from "firebase/app";
import React from "react";
import { Animated, Dimensions } from "react-native";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = () => {
  // Registro
  const [registerEmail, setRegisterEmail] = React.useState<string>("");
  const [registerPassword, setRegisterPassword] = React.useState<string>("");

  // Login
  const [loginEmail, setLoginEmail] = React.useState<string>("");
  const [loginPassword, setLoginPassword] = React.useState<string>("");

  const { register, login } = useAuth();
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get("window");

  const handleSingUp = async () => {
    try {
      const result = await register(registerEmail, registerPassword);
      if (result?.user) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error desconocido");
      }
    }
  };

  const handleSingIn = async () => {
    try {
      const result = await login(loginEmail, loginPassword);
      if (result?.user) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error desconocido");
      }
    }
  };

  const toggleView = (isRegister: boolean) => {
    Animated.timing(slideAnim, {
      toValue: isRegister ? 0 : -height,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {});
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
        ,
        { paddingTop: 175, paddingHorizontal: 10 },
      ]}
    >
      <Text style={{ marginVertical: 10, fontWeight: "bold", fontSize: 24 }}>
        Registrarse
      </Text>
      <View style={styles.container}>
        <View
          style={{
            padding: 10,
            borderColor: "#DADCE0",
            borderWidth: 1,
            // margin: 10,
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setRegisterEmail}
            value={registerEmail}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            onChangeText={setRegisterPassword}
            value={registerPassword}
          />
          <Pressable
            onPress={() => {
              //router.replace("/(tabs)/home");
              handleSingUp();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </Pressable>

          <View style={{ marginVertical: 10, flexDirection: "row", gap: 5 }}>
            <Text>¿Ya tenés cuenta?</Text>
            <Pressable
              onPress={() => {
                toggleView(false);
              }}
            >
              <Text style={{ color: "#1A73E8" }}>Inicia sesion</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Text style={{ marginVertical: 10, fontWeight: "bold", fontSize: 24 }}>
        Iniciar sesión
      </Text>
      <View style={styles.container}>
        <View
          style={{
            padding: 10,
            borderColor: "#DADCE0",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setLoginEmail}
            value={loginEmail}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            onChangeText={setLoginPassword}
            value={loginPassword}
          />
          <Pressable onPress={handleSingIn} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <View style={{ marginVertical: 10, flexDirection: "row", gap: 5 }}>
            <Text>¿No tenés cuenta?</Text>
            <Pressable onPress={() => toggleView(true)}>
              <Text style={{ color: "#1A73E8" }}>Registrate</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
    //paddingTop: 175,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#DADCE0",
  },
  button: {
    padding: 15,
    backgroundColor: "#1A73E8",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
