import { gql } from "apollo-server-express";

export const storesSchema = gql`

  type Store {
    id: ID!
    name: String
    ownerId: ID!
  }

  type Query {
    stores: [Store]
  }

  input AddStore {
    name: String!
  }

  type Mutation {
    addStore(store: AddStore!): Store
  }
`