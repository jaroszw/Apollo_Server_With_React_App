import React, { useEffect } from 'react';
import MainHero from '../components/MainHero/MainHero';
import CategoryDisplay from '../components/CategoryDisplay/CategoryDisplay';
import CardDisplay from '../components/CardDisplay/CardDisplay';
import { useQuery, gql, useMutation } from '@apollo/client';

const FETCH_MAIN_CARDS = gql`
  {
    animals {
      id
      image
      price
      slug
      title
    }
  }
`;

const ADD_ANIMAL_MUTATION = gql`
  mutation (
    $image: String!
    $category: String!
    $title: String!
    $stock: Int!
    $price: String!
    $description: [String!]!
    $rating: Float
    $slug: String!
  ) {
    addAnimal(
      image: $image
      category: $category
      title: $title
      stock: $stock
      price: $price
      description: $description
      rating: $rating
      slug: $slug
    ) {
      id
    }
  }
`;

function LandingPage() {
  const {
    data: { animals },
    loading,
    error,
  } = useQuery(FETCH_MAIN_CARDS);

  const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <MainHero />
      <CategoryDisplay />
      <CardDisplay animals={animals} />
      <button
        onClick={() =>
          addAnimal({
            variables: {
              image: 'ostrich',
              category: '1',
              title: 'This is a reeally cool ostrich',
              stock: 13,
              price: '32.22',
              description: [
                'Nice ostrich',
                'What the fuck is ostrich',
                'Wana buty ostrich buy ostrich',
              ],
              rating: 3.5,
              slug: 'ostrich',
            },
          })
        }
      >
        Add an ostritch
      </button>
    </div>
  );
}

export default LandingPage;
