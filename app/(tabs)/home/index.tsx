import { router } from "expo-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardComponent from "../../../components/CardComponent";
import { app } from "../../../config/config";

const HomeScreen = () => {
  const [negocios, setNegocios] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNegocios = async () => {
      try {
        const db = getFirestore(app);
        const negociosRef = collection(db, "negocios");
        const snapshot = await getDocs(negociosRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNegocios(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los negocios:", error);
      }
    };

    fetchNegocios();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Obteniendo negocios.</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {negocios.map((negocio) => (
        <CardComponent
          key={negocio.id}
          image={negocio.image}
          title={negocio.title}
          description={negocio.description}
          onPress={() =>
            router.push({
              pathname: "/(stack)/negocio/[id]",
              params: { id: negocio.id },
            })
          }
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
