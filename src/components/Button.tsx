import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import generalStyles from "../utils/styles";

interface ButtonProps {
  onPress?(): void;
  title: string;
}

const Button = ({ onPress, title }: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 12,
    backgroundColor: "blue",
    ...generalStyles.elevation,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
});

export default Button;
