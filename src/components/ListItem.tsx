import React, { useContext, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { generateRacerWinLikelihoodCalculator } from "../utils";
import { formatOdds } from "../utils/format";
import { RaceContext } from "../utils/RaceContext";
import { GeneralStatus } from "../utils/types";
import { RacerColor } from "../__generated__/graphql";
import ListItemInfo from "./ListItemInfo";
import Separator from "./Separator";
import Text from "./Text";

interface ListItemProps {
  color: RacerColor;
  title: string;
  likelihood?: number;
  weight?: number;
  onComplete(title: string, likelihood: number): void;
  status: string;
}

const ListItem = ({
  color,
  likelihood,
  title,
  onComplete,
  status,
  weight,
}: ListItemProps) => {
  const formattedColor = useMemo(() => color.toLocaleLowerCase(), [color]);
  const { status: raceStatus } = useContext(RaceContext);
  const titleRef = useRef(title);

  useEffect(() => {
    const generateLikelihood = generateRacerWinLikelihoodCalculator();
    if (raceStatus === GeneralStatus.IN_PROGRESS) {
      generateLikelihood((likelihood) => {
        onComplete(titleRef.current, likelihood);
      });
    }
  }, [onComplete, raceStatus]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentBlock}>
          <View style={[styles.square, { backgroundColor: formattedColor }]} />
          <View>
            <Text bold variant="subtitle">
              {title}
            </Text>
            <ListItemInfo label="weight" value={weight} />
            <ListItemInfo label="color" value={formattedColor} />
          </View>
        </View>
        <View style={styles.contentBlock}>
          <Text>{status}</Text>
          {likelihood && <Text>({formatOdds(likelihood)}%)</Text>}
        </View>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
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
