import { gql } from 'apollo-server-express'

export const usersSchema = gql`
    type User {
        id: String!
        name: String!
        email: String!    
        token: String
    }

    type Query {
        user(id: ID!): User
        logout(id: ID!): Boolean
    }

    type Mutation {
        signup(name: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
    }
`