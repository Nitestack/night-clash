import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "night-clash.vercel.app",
    cache: new InMemoryCache(),
});