import React from "react";
import { StyleSheet, View } from "react-native";
import generalStyles from "../utils/styles";
import Text from "./Text";

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

const Header = ({ children, title }: HeaderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      {title && (
        <Text variant="title" style={styles.title}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    backgroundColor: "blue",
    alignItems: "center",
    ...generalStyles.elevation,
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Header;
