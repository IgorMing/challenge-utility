import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

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
  const [getRacers, { loading, error, data }] = useLazyQuery(GET_RACERS);

  console.log(data);
  return (
    <SafeAreaView>
      <Text>Racers</Text>
      <Button title="Fetch racers" onPress={() => getRacers()} />
    </SafeAreaView>
  );
};

export default HomeScreen;
