import { gql } from "apollo-server-express";

export const stores = gql`

  type Store {
    id: ID!;
    name: string;
    ownerId: ID!
  }

  type Query {
    stores: [Store]
  }

  input AddStore {
    name: String!
    ownerId: ID!
  }

  type Mutation {
    addStore(store: AddStore!): Store
  }
`