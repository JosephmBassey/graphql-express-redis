import express from 'express'
import {
  ApolloServer
} from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'
import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  host: '127.0.0.1',
  no_ready_check:true,
  auth_pass: 'password'
});

client.on("error", (err) => {
  console.log("Error " + err);
});
client.on('connect',  ()=> {
  console.log('Redis client connected');
});



const PORT = 4000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    client
  }
});
server.applyMiddleware({
  app
});

app.listen({
    port: PORT
  }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)