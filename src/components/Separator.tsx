import React from "react";
import { StyleSheet, View } from "react-native";

const Separator = (): JSX.Element => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Separator;
