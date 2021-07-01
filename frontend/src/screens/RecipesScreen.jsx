import React, { useEffect, useState } from "react";
import { Row, Col, CardDeck } from "react-bootstrap";
import axios from "axios";
import RecipeComponent from "../components/RecipeComponent";

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/recipes`);
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <Row>
        <Col>
          {recipes.length !== 0 ? (
            <h1>All Recipes ({recipes.length})</h1>
          ) : (
            <h1 className="text-info">Please wait... loading recipes data</h1>
          )}
        </Col>
      </Row>
      <Row>
        {recipes.length !== 0 ? (
          <>
            {recipes.map((recipe) => (
              <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
                <RecipeComponent recipe={recipe} />
              </Col>
            ))}
          </>
        ) : (
          <p className="text-danger">
            <strong>Ooops!!!</strong> Something went wrong... No Recipes found!
          </p>
        )}
      </Row>
    </>
  );
};

export default RecipesScreen;
