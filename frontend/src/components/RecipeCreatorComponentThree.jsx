import React from "react";
import {
  Form,
  Button,
  Col,
  Spinner,
  Row,
  Container,
  Image,
  Badge,
} from "react-bootstrap";

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
  handleRemoveIngredient,
  handlePhotoInputChange,
  photoInput,
  selectedPhoto,
  previewSource,
  deleteRecipePhoto,
  isUpdatingRecipe,
  handleRecipeUpdateSubmit,
}) => {
  const { label, healthLabels, image, ingredientLines, ingredients } =
    recipeCreatorData;
  // geting product name for display during edit mode

  const getProductName = (productId) => {
    let name = "Choose Product";

    if (!productId) return name;

    if (products) {
      const productName = products.filter(
        (product) => product._id === productId
      );
      let name = productName[0].name;
      console.log(name);
      return name;
    }

    const checkIfImageUploadedByUser = (path) =>
      path.contains("https://res.cloudinary.com/uws-student/image/upload/")
        ? true
        : false;
  };

  return (
    <Form
      onSubmit={
        !isUpdatingRecipe ? handleRecipeSubmit : handleRecipeUpdateSubmit
      }
      className="p-3"
      style={{ backgroundColor: "#F2F2F2" }}
    >
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
        <Col xs="auto">
          <Form.Group controlId="image">
            <Form.Label>Paste Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please paste url for image file"
              onChange={handleRecipeCreatorInputChange("image")}
              name="image"
              value={image}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="photo">
            <Form.Label>Photo Upload</Form.Label>
            <Form.File
              id="image-file"
              label="Choose File"
              type="file"
              custom
              onChange={handlePhotoInputChange}
              name="image"
              value={photoInput}
            ></Form.File>
            {uploading && <Spinner />}
          </Form.Group>
        </Col>

        <Col xs="auto">
          <Image
            src={previewSource ? `${previewSource}` : image}
            thumbnail
            style={{ height: "125px", width: "125px" }}
          />
          {previewSource || isUpdatingRecipe ? (
            <Badge
              className="img-upload-delete-badge p-1"
              pill
              variant="danger"
              onClick={deleteRecipePhoto}
            >
              <i className="fas fa-trash"></i>
            </Badge>
          ) : null}
        </Col>
      </Form.Row>
      <Container className="bg-light p-3 align-items-center my-3 border border-info rounded">
        {recipeCreatorData.ingredients.map((line, i) => (
          <Form.Row key={i}>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                value={line.text}
                onChange={(e) => handleIngredientLineChangeNew(e, i)}
                name="text"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="product">
              <Form.Control
                as="select"
                onChange={(e) => handleChangeProductNew(e, i)}
              >
                {isUpdatingRecipe && products.length !== 0 ? (
                  <option value={line.productId}>
                    {getProductName(line.productId)}
                  </option>
                ) : (
                  <option>Choose Product:</option>
                )}

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
                onChange={(e) => handleIngredientLineChangeNew(e, i)}
                value={line.weight}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button
                variant="dark"
                className="mx-1"
                disabled={
                  line.text.length == 0 ||
                  line.weight == null ||
                  line.productId == undefined
                    ? true
                    : false
                }
                onClick={handleAddIngredientNew}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Form.Group>
            <Form.Group>
              <Button
                className="mx-1"
                disabled={
                  recipeCreatorData.ingredients.length === 1 ? true : false
                }
                onClick={() => handleRemoveIngredient(i)}
                variant="danger"
              >
                <i className="fas fa-minus"></i>
              </Button>
            </Form.Group>
          </Form.Row>
        ))}
        <hr />
        {isUpdatingRecipe ? (
          <Button variant="warning" type="submit" className="m-2">
            Update Recipe
          </Button>
        ) : (
          <Button variant="success" type="submit" className="m-2">
            Add Recipe
          </Button>
        )}
      </Container>
    </Form>
  );
};

export default RecipeCreatorComponent;
