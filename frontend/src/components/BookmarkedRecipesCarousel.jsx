import React from "react";
import { Carousel, Image, Badge, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookmarkedRecipesCarousel({ recipes }) {
  return (
    <>
      <h2 className="text-center my-3">Chef's Favourite Recipes</h2>
      <Carousel pause="hover" className="bg-dark">
        {recipes.map((recipe) => (
          <Carousel.Item key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              <Image src={recipe.image} alt={recipe.label} fluid />

              <Carousel.Caption className="carousel-caption">
                <h2 className="text-light">{recipe.label}</h2>
                {recipe.healthLabels.map((label, i) => (
                  <Badge key={i} variant="warning" className="m-2 p-1">
                    {label}
                  </Badge>
                ))}
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default BookmarkedRecipesCarousel;
