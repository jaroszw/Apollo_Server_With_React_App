const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type MainCard {
    title: String
    image: String
  }

  type Query {
    books: [Book]
    mainCards: [MainCard]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const mainCards = [
  {
    title: "Recently reviewed",
    image: "lion",
  },
  {
    title: "Lookiong for a gift",
    image: "pinguin",
  },
  {
    title: "Best behived",
    image: "cat",
  },
];

const resolvers = {
  Query: {
    books: () => books,
    mainCards: () => mainCards,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
