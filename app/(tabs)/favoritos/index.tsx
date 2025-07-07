import CardComponent from "@/components/CardComponent";
import React from "react";
import { ScrollView } from "react-native";

const FavoritosScreen = () => {
  return (
    <ScrollView style={{ padding: 16 }}>
      {/* <Text>FavoritosScreen</Text> */}
      <CardComponent
        image="https://images.unsplash.com/photo-1749740559443-4ecd3538c31b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Ferretería El Tornillo"
        description="Todo lo que necesitás para el hogar y la construcción. Atendida por sus dueños."
        onPress={() => console.log("Card 3")}
        isFavouriteButton={true}
      />
    </ScrollView>
  );
};

export default FavoritosScreen;
