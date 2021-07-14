import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

function EdamamRecipesComponent({ edamamRecipes }) {
  return (
    <>
      {edamamRecipes.map((recipe) => (
        <Card style={{ width: "18rem" }} className="m-1">
          <Card.Img variant="top" src={recipe.recipe.image} fluid />
          <Card.Body>
            <Card.Title>{recipe.recipe.label}</Card.Title>
            <ListGroup variant="flush">
              {recipe.recipe.ingredientLines.map((line) => (
                <ListGroup.Item>{line}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default EdamamRecipesComponent;
