import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, gql } from "@apollo/client";

const CATEGORY_QUERY = gql`
  query getcategory($slug: String!) {
    category(slug: $slug) {
      id
      image
      category
      slug
      animals {
        id
        title
        price
        image
      }
    }
  }
`;

function CategoryPage() {
  const { slug } = useParams();
  const { data, loading, error } = useQuery(CATEGORY_QUERY, {
    variables: { slug: slug },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { category } = data;

  return (
    <div className="py-5">
      <Container>
        <h1 className="text-capitalize">
          {category.title}
          <CardDisplay animals={category.animals} />
        </h1>
      </Container>
    </div>
  );
}

export default CategoryPage;
