import React from "react";
import "./MainHero.css";
import animals from "../../assets/images";
import { Container } from "reactstrap";
import { gql, useQuery } from "@apollo/client";

const MAIN_CARDS = gql`
  query {
    mainCards {
      title
      image
    }
  }
`;

function MainHero() {
  const { loading, error, data } = useQuery(MAIN_CARDS);

  if (loading) return <div>Data is loading...</div>;
  if (error) return <div>Error, check the query data</div>;

  return (
    <div className="MainHero">
      <Container>
        <div className="header-container">
          <h2>
            Find your <br /> new four-legged <br /> best friend
          </h2>
          <img src={animals.rhino} />
        </div>
        <div className="cards-container">
          {data.mainCards.map((card) => (
            <div className="card">
              <h3>{card.title}</h3>
              <img src={animals[card.image]} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MainHero;
