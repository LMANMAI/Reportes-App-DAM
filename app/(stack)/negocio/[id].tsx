import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../../../config/config";

const NegocioDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [negocio, setNegocio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNegocio = async () => {
      const ref = doc(db, "negocios", String(id));
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setNegocio(snapshot.data());
      }
      setLoading(false);
    };

    fetchNegocio();
  }, [id]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detalle del negocio",
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ paddingHorizontal: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!negocio?.ubicacion) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró ubicación.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{negocio.title}</Text>
        <Text style={styles.description}>{negocio.description}</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: negocio.ubicacion.latitude,
          longitude: negocio.ubicacion.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: negocio.ubicacion.latitude,
            longitude: negocio.ubicacion.longitude,
          }}
          title={negocio.titulo}
          description={negocio.descripcion}
        />
      </MapView>
    </SafeAreaView>
  );
};

export default NegocioDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
