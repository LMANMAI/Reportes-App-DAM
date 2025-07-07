import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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
  );
};

export default NegocioDetailScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
