import { gql } from 'apollo-server-express'

export const usersSchema = gql`
    type User {
        id: String!
        name: String!
        email: String!    
    }

    type Query {
        user(id: ID!): User
    }

    type Mutation {
        signup(name: String!, email: String!, password: String!): User
    }
`