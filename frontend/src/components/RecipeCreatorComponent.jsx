import React from "react";
import { Form, Button, Col, Spinner } from "react-bootstrap";

const RecipeCreatorComponent = ({
  handleRecipeSubmit,
  handleRecipeCreatorInputChange,
  recipeCreatorData,
  handleIngredientLines,
  handleChangeProduct,
  products,
  handleAddIngredient,
  recipeLines,
  uploadFileHandler,
  uploading,
}) => {
  const { label, healthLabels, image } = recipeCreatorData;
  const { text, weight } = recipeLines;

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
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="healthLabels">
          <Form.Label>Health Labels</Form.Label>
          <Form.Control
            type="text"
            placeholder="Health labels, separated with comma ','"
            onChange={handleRecipeCreatorInputChange("healthLabels")}
            name="healthLabels"
            value={healthLabels}
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="image">
          <Form.Label>Paste Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please paste url for image file"
            onChange={handleRecipeCreatorInputChange("image")}
            name="image"
            value={image}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="photo">
          <Form.Label>Image Upload</Form.Label>
          <Form.File
            id="image-file"
            label="Choose File"
            custom
            onChange={uploadFileHandler}
            name="image"
          ></Form.File>
          {uploading && <Spinner />}
        </Form.Group>
      </Form.Row>
      <Form.Row className="bg-light align-items-center">
        <Form.Group as={Col} xs="6">
          <Form.Label>Recipe Line Text</Form.Label>
          <Form.Control
            type="text"
            value={text}
            placeholder="Enter recipe text line"
            onChange={handleIngredientLines("text")}
            name="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="product" as={Col} xs="auto">
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
        <Form.Group as={Col} xs="auto">
          <Form.Label>Weight (g)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            placeholder="required weight"
            onChange={handleIngredientLines("weight")}
            value={weight}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} xs="auto">
          <Form.Label>&nbsp;</Form.Label>
          <Button
            block
            variant="info"
            className="my-1"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </Button>
        </Form.Group>
      </Form.Row>
      <Button variant="danger" type="submit" className="my-3">
        Add Recipe
      </Button>
    </Form>
  );
};

export default RecipeCreatorComponent;
