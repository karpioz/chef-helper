import React from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Image,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function SingleRecipeComponent({ recipe }) {
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
    <Container className="my-3">
      <Row>
        <Col md={4}>
          <Image src={getImageURL(recipe.image)} alt={recipe.label} fluid />
          {recipe.healthLabels.map((label, i) => (
            <Badge key={i} variant="success" className="m-1">
              {label}
            </Badge>
          ))}
        </Col>
        <Col md={4}>
          <ListGroup flush="true">
            <ListGroup.Item>
              <h3>{recipe.label}</h3>
            </ListGroup.Item>

            {recipe.ingredientLines.map((ingr, i) => (
              <ListGroup.Item key={i} variant="success">
                {ingr}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup flush="true">
            <ListGroup.Item>
              <h3>Weight / Pantry</h3>
            </ListGroup.Item>
            {recipe.ingredients.map((ing, i) => (
              <ListGroup.Item
                key={ing._id}
                variant="info"
                className="d-flex justify-content-between"
              >
                <>
                  <span>
                    <strong>product: </strong>
                    <p>{ing.productId.name}</p>
                  </span>
                  <span>
                    <strong>required: </strong>
                    <p>{ing.weight} (g)</p>
                  </span>
                  <span>
                    <strong>pantry: </strong>
                    <p>{ing.productId.countInStock}(g)</p>
                  </span>
                </>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <LinkContainer to={"/recipes"}>
            <Button variant="danger">Back</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleRecipeComponent;
