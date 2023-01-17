import React, { useContext, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { generateRacerWinLikelihoodCalculator } from "../utils";
import { formatOdds, showStatusByKey } from "../utils/format";
import { GeneralStatus, RaceContext, RacerStatus } from "../utils/RaceContext";
import { RacerColor } from "../__generated__/graphql";
import Text from "./Text";

interface ListItemProps {
  color: RacerColor;
  title: string;
}

const ListItem = ({ color, title }: ListItemProps) => {
  const formattedColor = useMemo(() => color.toLocaleLowerCase(), [color]);
  const { status: raceStatus, setRacers, racersMap } = useContext(RaceContext);
  const externalReference = useMemo(() => {
    if (!racersMap) {
      return null;
    }
    return racersMap[title];
  }, [racersMap, title]);

  // set the initial value for the racers
  useEffect(() => {
    setRacers((prevState) => ({
      ...prevState,
      [title]: { status: RacerStatus.NOT_YET },
    }));
  }, [setRacers, title]);

  useEffect(() => {
    if (raceStatus === GeneralStatus.IN_PROGRESS) {
      setRacers((prevState) => ({
        ...prevState,
        [title]: { status: RacerStatus.IN_PROGRESS },
      }));
      const generateLikelihood = generateRacerWinLikelihoodCalculator();
      generateLikelihood((likelihood) => {
        setRacers((prevState) => ({
          ...prevState,
          [title]: {
            status: RacerStatus.CALCULATED,
            winLikelihood: likelihood,
          },
        }));
      });
    }
  }, [raceStatus, setRacers, title]);

  return (
    <View style={styles.container}>
      <View style={styles.contentBlock}>
        <View style={[styles.square, { backgroundColor: formattedColor }]} />
        <Text>{title}</Text>
      </View>
      <View style={styles.contentBlock}>
        <Text>
          {showStatusByKey(externalReference?.status ?? RacerStatus.NOT_YET)}
        </Text>
        {externalReference?.winLikelihood && (
          <Text>({formatOdds(externalReference?.winLikelihood)}%)</Text>
        )}
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
