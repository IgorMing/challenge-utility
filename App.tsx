import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/Home";

const client = new ApolloClient({
  uri: "https://racing-server.herokuapp.com/graphql/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar style="auto" />
      <HomeScreen />
    </ApolloProvider>
  );
}
