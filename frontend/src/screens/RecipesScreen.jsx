import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import RecipeComponent from "../components/RecipeComponent";

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/recipes`);
    setRecipes(data);
  };

  // search for recipes functionality
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    let storedRecipes = recipes.filter((recipe) => {
      return recipe.label.match(searchInput);
    });
    setFilteredRecipes(storedRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {}, [filteredRecipes, searchInput, recipes]);

  return (
    <>
      <Row>
        <Col>
          {filteredRecipes.length !== 0 ? (
            <h1>All Recipes ({filteredRecipes.length})</h1>
          ) : (
            <h1>All Recipes ({recipes.length})</h1>
          )}
          {recipes.length === 0 && (
            <h1 className="text-info">Please wait... loading recipes data</h1>
          )}
        </Col>
        <Col>
          <InputGroup className="mt-2">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <i class="fas fa-search"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search for recipes..."
              aria-label="Recipe name"
              aria-describedby="basic-addon1"
              onChange={handleSearchInputChange}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {recipes.length !== 0 && filteredRecipes.length === 0 ? (
          <>
            {recipes.map((recipe) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <RecipeComponent key={recipe._id} recipe={recipe} />
              </Col>
            ))}
          </>
        ) : null}
        {searchInput.length > 0
          ? filteredRecipes.map((recipe, index) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <RecipeComponent recipe={recipe} key={recipe._id} />
              </Col>
            ))
          : recipes.map((recipe) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <RecipeComponent key={recipe._id} recipe={recipe} />
              </Col>
            ))}
        {recipes.length === 0 && (
          <p className="text-danger">
            <strong>Ooops!!!</strong> Something went wrong... No Recipes found!
          </p>
        )}
      </Row>
    </>
  );
};

export default RecipesScreen;
