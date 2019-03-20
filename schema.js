import {
  gql
} from 'apollo-server-express'

const typeDefs = gql `
  type Query {
    hello: String
    getData(key:String!): String
  }

  type Mutation {
    setData(key:String!,value: String!): String
  }
`;
export default typeDefs