import React from "react";
import { Form, Button, Col, Spinner, Row } from "react-bootstrap";

const RecipeCreatorComponent = ({
  handleRecipeSubmit,
  handleRecipeCreatorInputChange,
  recipeCreatorData,
  handleChangeProductNew,
  products,
  handleAddIngredientNew,
  uploadFileHandler,
  uploading,
  recipeLines,
  handleIngredientLineChangeNew,
}) => {
  const { label, healthLabels, image, ingredientLines, ingredients } =
    recipeCreatorData;
  const { text, weight, productId } = recipeLines;

  return (
    <Form as={Row} onSubmit={handleRecipeSubmit} className="bg-warning p-2">
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
        <Form.Group controlId="photo">
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
      <Form.Row className="bg-light p-2 align-items-center">
        {recipeLines.map((line, i) => (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                value={text}
                placeholder="Step description"
                onChange={(e) => handleIngredientLineChangeNew(e, i)}
                name="text"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="product">
              <Form.Control
                as="select"
                onChange={(e) => handleChangeProductNew(e, i)}
              >
                <option>Choose Product:</option>
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
            <Form.Group>
              <Form.Control
                type="number"
                name="weight"
                placeholder="Weight (g)"
                onChange={(e) => handleIngredientLineChangeNew(e, i)}
                value={weight}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button
                variant="info"
                className="mx-1"
                onClick={handleAddIngredientNew}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Form.Group>
          </Form.Row>
        ))}
      </Form.Row>
      <Form.Row>
        <Form.Group>
          <Button block variant="danger" type="submit" className="my-3">
            Add Recipe
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default RecipeCreatorComponent;
