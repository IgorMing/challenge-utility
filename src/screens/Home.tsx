import { gql, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { showStatusByKey } from "../utils/format";
import { RaceContext } from "../utils/RaceContext";
import {
  CompleteRacer,
  GeneralStatus,
  RaceContextProps,
  RacerStatus,
} from "../utils/types";

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

interface FinisherState {
  title: string;
  likelihood: number;
}

const HomeScreen = (): JSX.Element => {
  const [getRacers, { loading, data }] = useLazyQuery(GET_RACERS);
  const [status, setStatus] = useState<GeneralStatus>(GeneralStatus.NOT_YET);
  const initialRacers = useMemo<CompleteRacer[]>(() => {
    if (!data || !data.racers) return [];
    return data.racers.map((each: CompleteRacer) => ({
      ...each,
      status:
        status === GeneralStatus.IN_PROGRESS
          ? RacerStatus.IN_PROGRESS
          : RacerStatus.NOT_YET,
    }));
  }, [data, status]);
  const isEmpty = useMemo(() => !data, [data]);
  const [finishers, setFinishers] = useState<FinisherState[]>([]);
  const orderedFinishers = useMemo(
    () => finishers.sort((a, b) => (a.likelihood > b.likelihood ? -1 : 1)),
    [finishers]
  );
  const orderedRacers: CompleteRacer[] = useMemo(() => {
    if (!initialRacers) {
      return [];
    }

    // order racers by finishers name (already sorted)
    const orderedFinishersInstance: CompleteRacer[] =
      orderedFinishers.map<CompleteRacer>((each) => {
        const found = initialRacers.find((racer) => racer.name === each.title);
        return {
          ...found,
          status: RacerStatus.CALCULATED,
          winLikelihood: each.likelihood,
        };
      });

    // filter out already finishers. Keep others still running...
    const stillRunning: CompleteRacer[] = initialRacers.filter((racer) => {
      const found = orderedFinishersInstance.find(
        (each) => racer.name === each.name
      );
      return !found;
    });

    return [...orderedFinishersInstance, ...stillRunning];
  }, [initialRacers, orderedFinishers]);

  const contextValues = useMemo<RaceContextProps>(
    () => ({
      status,
    }),
    [status]
  );

  // when everyone finish it, set the race to `ALL_CALCULATED`
  useEffect(() => {
    if (finishers.length > 0 && finishers.length === initialRacers.length) {
      setStatus(GeneralStatus.ALL_CALCULATED);
    }
  }, [finishers.length, initialRacers.length]);

  const onComplete = useCallback((title: string, likelihood: number) => {
    setFinishers((prev) => [...prev, { title, likelihood }]);
  }, []);

  const renderItem: ListRenderItem<CompleteRacer> = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        color={item.color}
        likelihood={item.winLikelihood}
        onComplete={onComplete}
        status={showStatusByKey(item.status)}
        weight={item.weight}
      />
    );
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
              disabled={status !== GeneralStatus.NOT_YET}
              title="Start race!"
              onPress={() => {
                setStatus(GeneralStatus.IN_PROGRESS);
              }}
            />
          )}
        </View>
        {loading && <ActivityIndicator style={styles.activity} size="large" />}
        <View style={styles.container}>
          <FlatList data={orderedRacers} renderItem={renderItem} />
        </View>
      </RaceContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activity: {
    paddingTop: 52,
  },
  container: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingTop: 22,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default HomeScreen;
