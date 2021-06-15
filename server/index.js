const { ApolloServer, gql } = require('apollo-server');
const { mainCards, animals, categories } = require('./db');

const typeDefs = gql`
  type MainCard {
    title: String!
    image: String!
  }

  type Animal {
    id: ID!
    image: String!
    title: String!
    rating: Float
    price: String!
    description: [String!]!
    slug: String!
    stock: Int!
    onSale: Boolean
    category: Category
  }

  type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal!]!
    animal(slug: String!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }
`;

const resolvers = {
  Query: {
    mainCards: () => mainCards,
    animals: () => animals,
    categories: () => categories,
    animal: (parent, args, ctx) =>
      animals.find((animal) => animal.slug === args.slug),
    category: (parent, args, ctx) =>
      categories.find((category) => category.slug === args.slug),
  },
  Category: {
    animals: (parent, args, ctx) =>
      animals.filter((animal) => animal.category === parent.id),
  },
  Animal: {
    category: (parent, args, ctx) =>
      categories.find((category) => category.id === parent.category),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
