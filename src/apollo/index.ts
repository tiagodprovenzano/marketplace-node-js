import { mergeTypeDefs } from "@graphql-tools/merge";
import { ApolloServer, gql } from "apollo-server-express";
import { AuthAPI } from "../firebase/models/AuthAPI";
import { userMutation } from "../users/resolvers/mutations";
import { userQuery } from "../users/resolvers/query";
import { usersSchema } from "../users/schema/users.schema";
import express from "express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { IUser } from "../users/types/IUser";
import { StoreAPI } from "../stores/data/StoreApi";
const resolvers = [userQuery, userMutation];
const typeDefs = mergeTypeDefs([usersSchema]);

export type IContext = {
  authAPI: AuthAPI,
  user?: IUser | null,
  storeApi: StoreAPI
};

async function start() {
  const app = express();
  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const context: IContext = {
          authAPI: new AuthAPI(),
          storeApi: new StoreAPI(),
          user: null
        };
        if(req.headers.token){
            console.log('tem token');
            
            let user = await context.authAPI.checkToken(req.headers.token as string)
            if(user){
                context.user = user as any
            } else {
              context.user = null
            }
        }else{
          console.log('sem token', context);
          
        }
        return context
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start()
  server.applyMiddleware({app, path:'/'})
  await new Promise(resolve => httpServer.listen({port: 4000}, () => resolve(null)))
  console.log('Server running at port ', 4000, server.graphqlPath);
  
}

start();