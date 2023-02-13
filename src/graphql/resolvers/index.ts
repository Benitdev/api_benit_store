import productResolver from "./productResolver"

const resolvers = {
  Query: {
    ...productResolver,
  },
}

export default resolvers
