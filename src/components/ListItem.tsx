import React, { useContext, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { RaceContext } from "../utils/RaceContext";
import { showStatusByKey } from "../utils/texts";
import { RacerColor } from "../__generated__/graphql";
import Text from "./Text";

interface ListItemProps {
  color: RacerColor;
  title: string;
}

const ListItem = ({ color, title }: ListItemProps) => {
  const formattedColor = useMemo(() => color.toLocaleLowerCase(), [color]);
  const { status } = useContext(RaceContext);

  useEffect(() => {
    console.log({ status });
  }, [status]);

  return (
    <View style={styles.container}>
      <View style={styles.contentBlock}>
        <View style={[styles.square, { backgroundColor: formattedColor }]} />
        <Text>{title}</Text>
      </View>
      <View style={styles.contentBlock}>
        <Text>{showStatusByKey(status)}</Text>
        {/* <Text>Odds</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentBlock: {
    alignItems: "center",
    flexDirection: "row",
  },
  square: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
});

export default ListItem;
