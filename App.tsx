import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/Home";

const client = new ApolloClient({
  uri: "https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/graphql",
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
