import React from "react";
import { Card, Button, Badge, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function RecipeComponent({ recipe }) {
  const getImageURL = (path) => {
    let url;
    if (path.startsWith("uploads/")) {
      url = `http://localhost:8000/${path}`;
    } else {
      url = `${path}`;
    }

    return url;
  };
  return (
    <Card className={"my-3 rounded"}>
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.label}</Card.Title>
        <Card.Text>
          {recipe.healthLabels.map((label, i) => (
            <Badge key={i} variant="success" className="m-1">
              {label}
            </Badge>
          ))}
        </Card.Text>
        <Card.Text>
          <ListGroup>
            {recipe.ingredients.map((ingr, i) => (
              <ListGroup.Item key={i}>{ingr.text}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>

        <LinkContainer to={`recipes/${recipe._id}`}>
          <Button variant="warning">View Details</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default RecipeComponent;
