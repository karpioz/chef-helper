import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge, ListGroup } from "react-bootstrap";
import axios from "axios";

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/recipes`);
    console.log(data);
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h1>Recipes</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {recipes.map((recipe) => (
            <Card key={recipe._id} style={{ width: "18rem" }}>
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
                    {recipe.ingredientLines.map((ingr) => (
                      <ListGroup.Item>{ingr}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Text>
                <Button variant="warning">View Details</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default RecipesScreen;
