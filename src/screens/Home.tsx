import { gql, useLazyQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import {
  GeneralStatus,
  RaceContext,
  RaceContextProps,
  RacersState,
} from "../utils/RaceContext";
import { Racer } from "../__generated__/graphql";

const GET_RACERS = gql`
  query {
    racers {
      name
      length
      color
      weight
    }
  }
`;

const HomeScreen = (): JSX.Element => {
  const [getRacers, { loading, data }] = useLazyQuery(GET_RACERS);
  const isEmpty = useMemo(() => !data, [data]);
  const [status, setStatus] = useState<GeneralStatus>(GeneralStatus.NOT_YET);
  const [racersMap, setRacers] = useState<RacersState>(null);
  // const sortedRacers = useMemo(() => {
  //   if (!racersMap) {
  //     return;
  //   }

  //   return Object.values(racersMap).sort((a, b) =>
  //     a.winLikelihood > b.winLikelihood ? 1 : -1
  //   );
  // }, [racersMap]);

  const contextValues = useMemo<RaceContextProps>(
    () => ({
      status,
      setRacers,
      racersMap,
    }),
    [racersMap, status]
  );

  const renderItem: ListRenderItem<Racer> = ({ item }) => {
    return <ListItem title={item.name} color={item.color} />;
  };

  return (
    <SafeAreaView>
      <Header title="Racers" />
      <RaceContext.Provider value={contextValues}>
        <View style={styles.buttonContainer}>
          {isEmpty ? (
            <Button
              title="Get Racers"
              onPress={() => {
                getRacers();
              }}
            />
          ) : (
            <Button
              disabled={status === GeneralStatus.IN_PROGRESS}
              title="Start race!"
              onPress={() => {
                setStatus(GeneralStatus.IN_PROGRESS);
              }}
            />
          )}
        </View>
        {loading && (
          <ActivityIndicator style={{ paddingTop: 52 }} size="large" />
        )}
        <FlatList data={data?.racers} renderItem={renderItem} />
      </RaceContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 22,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default HomeScreen;
