import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const RecipeCreatorComponent = ({
  handleRecipeSubmit,
  handleRecipeCreatorInputChange,
  recipeCreatorData,
}) => {
  const { label, healthLabels } = recipeCreatorData;

  return (
    <Form onSubmit={handleRecipeSubmit}>
      <Form.Group controlId="label">
        <Form.Label>Dish Name</Form.Label>
        <Form.Control
          type="text"
          onChange={handleRecipeCreatorInputChange("label")}
          placeholder="Dish Name"
          name="label"
          value={label}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="healthLabels">
        <Form.Label>Health Labels</Form.Label>
        <Form.Control
          type="text"
          placeholder="Health labels, separate by coma ','"
          onChange={handleRecipeCreatorInputChange("healthLabels")}
          name="healthLabels"
          value={healthLabels}
        ></Form.Control>
      </Form.Group>

      <Button variant="success" type="submit">
        Add Recipe
      </Button>
    </Form>
  );
};

export default RecipeCreatorComponent;
