import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

function EdamamRecipesComponent({
  edamamRecipes,
  bookmarkEdamamRecipe,
  bookmarkedEdamamRecipe,
}) {
  return (
    <>
      {edamamRecipes.map((recipe, i) => (
        <Card
          style={{ width: "18rem" }}
          className="m-1 edamam-recipe-card"
          key={i}
        >
          <Card.Img variant="top" src={recipe.recipe.image} fluid />
          <Card.Body>
            <Card.Title>{recipe.recipe.label}</Card.Title>
            <ListGroup variant="flush">
              {recipe.recipe.ingredientLines.map((line) => (
                <ListGroup.Item>{line}</ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              variant="none"
              onClick={() => bookmarkEdamamRecipe(i)}
              className="edamam-recipe-bookmark"
            >
              {bookmarkedEdamamRecipe === i ? (
                <i class="fas fa-bookmark fa-2x"></i>
              ) : (
                <i class="far fa-bookmark fa-2x"></i>
              )}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default EdamamRecipesComponent;
