import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";

interface ListItemInfoProps {
  label: string;
  value: string | number;
}

const ListItemInfo = ({ label, value }: ListItemInfoProps): JSX.Element => {
  return (
    <Text>
      <Text style={styles.bold}>{label}:</Text> {value}
    </Text>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "500",
  },
});

export default ListItemInfo;
