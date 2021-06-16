import React from "react";
import MainHero from "../components/MainHero/MainHero";
import CategoryDisplay from "../components/CategoryDisplay/CategoryDisplay";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, gql } from "@apollo/client";

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

function LandingPage() {
  const { data, loading, error } = useQuery(FETCH_MAIN_CARDS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <MainHero />
      <CategoryDisplay />
      <CardDisplay animals={data.animals} />
    </div>
  );
}

export default LandingPage;
