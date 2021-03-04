import React from "react";
import { Form, Button, Col, FormGroup } from "react-bootstrap";

const RecipeCreatorComponent = ({
  handleRecipeSubmit,
  handleRecipeCreatorInputChange,
  recipeCreatorData,
  handleIngredientsLines,
  handleChangeProduct,
  products,
  handleAddIngredient,
}) => {
  const { label, healthLabels, image } = recipeCreatorData;

  return (
    <Form onSubmit={handleRecipeSubmit} className="bg-warning p-2">
      <Form.Row>
        <Form.Group as={Col} controlId="label">
          <Form.Label>Dish Name</Form.Label>
          <Form.Control
            type="text"
            onChange={handleRecipeCreatorInputChange("label")}
            placeholder="Dish Name"
            name="label"
            value={label}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="healthLabels">
          <Form.Label>Health Labels</Form.Label>
          <Form.Control
            type="text"
            placeholder="Health labels, separate by coma ','"
            onChange={handleRecipeCreatorInputChange("healthLabels")}
            name="healthLabels"
            value={healthLabels}
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="image">
          <Form.Label>Image Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please paste url for image file"
            onChange={handleRecipeCreatorInputChange("image")}
            name="image"
            value={image}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="photo">
          <Form.Label>Photo Upload</Form.Label>
          <Form.Control
            type="file"
            onChange={handleRecipeCreatorInputChange("image")}
            name="image"
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Recipe Line Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe text line"
            onChange={handleIngredientsLines}
            name="ingredientText"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="product" as={Col}>
          <Form.Label>Choose Product</Form.Label>
          <Form.Control as="select" onChange={handleChangeProduct}>
            <option>Available products:</option>
            {products.length !== 0 ? (
              products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))
            ) : (
              <option className="bg-danger text-light">
                Error fetching products
              </option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Weight</Form.Label>
          <Form.Control type="number"></Form.Control>
        </Form.Group>

        <Button variant="info" className="" onClick={handleAddIngredient}>
          Add Line
        </Button>
      </Form.Row>
      <Button variant="danger" type="submit">
        Add Recipe
      </Button>
    </Form>
  );
};

export default RecipeCreatorComponent;
