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
  const [text, onChangeText] = React.useState<string>("");
  const [password, onChangePassword] = React.useState<string>("");

  const { register, login } = useAuth();
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get("window");

  const handleSingUp = async () => {
    try {
      console.log("result", register);
      const result = await register(text, password);

      if (result?.user) {
        console.log("Usuario registrado:", result.user.email);
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
      console.log("result", register);
      const result = await login(text, password);

      if (result?.user) {
        console.log("Usuario registrado:", result.user.email);
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
      ]}
    >
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
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
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            borderColor: "red",
            borderWidth: 1,
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
        >
          <Text>tenes cuenta?</Text>
          <Pressable
            onPress={() => {
              //setRegisterPage(false);
              toggleView(false);
            }}
          >
            <Text> Iniciar sesion</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
          />
          <Pressable
            onPress={() => {
              handleSingIn();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            borderColor: "red",
            borderWidth: 1,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        >
          <Text>Registrarse</Text>
          <Pressable
            onPress={() => {
              // setRegisterPage(true);
              toggleView(true);
            }}
          >
            <Text>Registrar</Text>
          </Pressable>
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
    paddingTop: 175,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
