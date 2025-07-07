import { router } from "expo-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React from "react";
import { ScrollView } from "react-native";
import CardComponent from "../../../components/CardComponent";
import { app } from "../../../config/config";

const HomeScreen = () => {
  const [negocios, setNegocios] = React.useState<any[]>([]);

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
      } catch (error) {
        console.error("Error al obtener los negocios:", error);
      }
    };

    fetchNegocios();
  }, []);
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
              pathname: "/negocio/[id]",
              params: { id: negocio.id },
            })
          }
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
