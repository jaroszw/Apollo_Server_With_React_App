import React from "react";
import { Container } from "react-bootstrap";
import animals from "../../assets/images";
import star from "../../assets/svg/star.svg";
import "./AnimalPage.css";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const ANIMAL_QUERY = gql`
  query getSingleAnimal($slug: String!) {
    animal(slug: $slug) {
      id
      image
      title
      rating
      price
      description
      slug
      stock
      onSale
    }
  }
`;

function AnimalPage() {
  const { slug } = useParams();

  const { loading, data, error } = useQuery(ANIMAL_QUERY, {
    variables: { slug: slug },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  const { animal } = data;

  return (
    <div className="py-5">
      <Container>
        <div className="d-flex">
          <img
            src={animals[animal.image]}
            className="product-img"
            style={{ marginRight: "1rem" }}
          />
          <div className="text-container">
            <h1>{animal.title}</h1>
            <div className="star-container">
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <div className="rating-stock-container">
                <p>1402 rating</p>
                <p>{animal.stock} in stock</p>
              </div>
            </div>
            <div className="about-container">
              <h4>About this Animal</h4>
              {animal.description.map((desc) => {
                return <li>{desc}</li>;
              })}
            </div>
          </div>
          <div className="cart-container border">
            <p className="price">
              <span>CAD$ {animal.price}</span>
            </p>
            <p className="delivery-time">
              FREE delivery: Thursday, Feb 25 Details
              <button className="buy-now-btn" style={{ marginTop: "2rem" }}>
                Add to Cart
              </button>
              <button>Buy Now</button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AnimalPage;
