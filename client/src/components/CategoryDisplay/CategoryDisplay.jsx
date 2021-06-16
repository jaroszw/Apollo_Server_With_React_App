import React, { useState } from "react";
import "./CategoryDisplay.css";
import { Container } from "react-bootstrap";
import animals from "../../assets/images";

import { Link } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const FETCH_CATEGORIES = gql`
  {
    categories {
      id
      image
      category
      slug
    }
  }
`;

function CategoryDisplay() {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div className="CategoryDisplay">
      <Container className="CategoryDisplay-container">
        {data.categories.map((category) => {
          return (
            <Link
              to={`/products/${category.slug}`}
              className="CategoryDisplay-card-container"
            >
              <div className="CategoryDisplay-card">
                <img src={animals[category.image]} />
              </div>
              <h3>{category.category}</h3>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}

export default CategoryDisplay;
