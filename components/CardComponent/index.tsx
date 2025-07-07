import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  image: string;
  title: string;
  description: string;
  onPress: () => void;
  isFavouriteButton?: boolean;
}

const CardComponent = ({
  image,
  title,
  description,
  onPress,
  isFavouriteButton,
}: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Ver más</Text>
          </Pressable>
          {/* <Pressable
            onPress={onPress}
            style={[styles.button, styles.secondaryButton]}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              {!isFavouriteButton
                ? "Agregar a favoritos"
                : "Sacar de favoritos"}
            </Text>
          </Pressable> */}
        </View>
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  description: {
    color: "#666",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1A73E8",
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: "transparent",

    borderColor: "#1A73E8",
    borderWidth: 2,
  },
  secondaryButtonText: { color: "#1A73E8" },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
