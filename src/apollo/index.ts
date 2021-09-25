import { mergeTypeDefs } from "@graphql-tools/merge";
import { ApolloServer, gql } from "apollo-server-express";
import { AuthAPI } from "../firebase/models/AuthAPI";
import { userMutation } from "../users/resolvers/mutations";
import { userQuery } from "../users/resolvers/query";
import { usersSchema } from "../users/schema/users.schema";
import express from "express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
const resolvers = [userQuery, userMutation];
const typeDefs = mergeTypeDefs([usersSchema]);

const context = {
  authAPI: new AuthAPI(),
};

export type IContext = typeof context;

async function start() {
  const app = express();
  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start()
  server.applyMiddleware({app, path:'/'})
  await new Promise(resolve => httpServer.listen({port: 4000}, () => resolve(null)))
  console.log('Server running at port ', 4000, server.graphqlPath);
  
}

start();