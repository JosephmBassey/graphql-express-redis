const resolvers = {
  Query: {
    hello: () => 'Hello Test!',

    getData: (_,{key},{client}) => {
      try {
        return client.getAsync(key)

      } catch (error) {

        return null

      }
    }
  },
  Mutation:{
    setData: async (_,{key,value},{client})=>{
      try {
       await  client.setAsync(key,value);
        return 'set success'
      } catch (error) {
        console.log(error)
        return 'Not set'

      }
    }

  }
};
export default resolvers