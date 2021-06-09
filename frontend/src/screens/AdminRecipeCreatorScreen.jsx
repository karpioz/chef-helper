import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Spinner, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AllRecipesTableComponent from "../components/AllRecipesTableComponent";
import RecipeCreatorComponent from "../components/RecipeCreatorComponentThree";
import { getCookie } from "../utilities/authUtilities";

const AdminRecipeCreatorScreen = () => {
  // state with useState hook
  const [recipes, setRecipes] = useState([]);
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(true);
  const [newRecipeAdded, setNewRecipeAdded] = useState(false);

  const [products, setProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  const [modalData, setModalData] = useState([]);
  const [show, setShow] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [submitRemove, setSubmitRemove] = useState(false);

  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleClose = () => setShow(false);

  const [recipeCreatorData, setRecipeCreatorData] = useState({
    label: "",
    healthLabels: [],
    image: "",
    ingredientLines: [],
    ingredients: [
      {
        productId: "Sample Id",
        text: "Sample Description",
        weight: "0",
      },
    ],
  });

  const [recipeLines, setRecipeLines] = useState({
    productId: "Sample Id",
    text: "Sample Description",
    weight: "0",
  });

  const [uploading, setUploading] = useState(false);

  // Destructuring State
  const { label, healthLabels, image, ingredientLines, ingredients } =
    recipeCreatorData;

  const handleShowRemoveModal = (id) => {
    setModalData(() => recipes.find((recipe) => recipe._id === id));
    setShowRemoveModal(true);
    setSubmitRemove(false);
    console.log(id);
  };

  // fetching products on load
  const fetchProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/products`);
    console.log(response);
    if (response) {
      setProducts(response.data);
    } else {
      console.log("something went wrong when fetching products...");
    }
  };

  // fetching recipes on load
  const fetchRecipes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/recipes`);
    //console.log(response);
    if (response) {
      setRecipes(response.data);
      setIsFetchingRecipes(false);
    } else {
      console.log("something went wrong when fetching recipes...");
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [submitRemove, setNewRecipeAdded]);

  // *** handling recipe creator ***
  // submiting completed recipe to database
  const handleRecipeSubmit = (e) => {
    e.preventDefault();
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/recipes`,
      data: { label, healthLabels, image, ingredientLines, ingredients },
    })
      .then((response) => {
        setRecipeCreatorData({
          ...recipeCreatorData,
          label: "",
          healthLabels: [],
          image: "",
          ingredientLines: [],
          ingredients: [],
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("RECIPE CREATE ERROR", error.response.data);
        setRecipeCreatorData({ ...recipeCreatorData });
        toast.error(error.response.data.error);
      });
    console.log(recipeCreatorData);
    console.log("Recipe submitted");
  };

  // handling Recipe Inputs name, healthLabels, image link
  const handleRecipeCreatorInputChange = (name) => (event) => {
    // getting existing state and update the key with same name as function argument
    if (name === "healthLabels") {
      let healthLabArr = event.target.value.split(",");
      setRecipeCreatorData({
        ...recipeCreatorData,
        healthLabels: healthLabArr,
      });
    } else {
      setRecipeCreatorData({
        ...recipeCreatorData,
        [name]: event.target.value,
      });
    }
  };

  const handleIngredientLines = (name) => (event) => {
    console.log(event.target.value);
    // getting existing state and update the key with same name as function argument
    setRecipeLines((recipeLines) => ({
      ...recipeLines,
      [name]: event.target.value,
    }));
    console.log(recipeLines);
  };

  // storing product id in recipeLines state
  const handleChangeProduct = (event) => {
    setRecipeLines((recipeLines) => ({
      ...recipeLines,
      productId: event.target.value,
    }));
  };

  // uploading image file
  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/upload`,
        formData,
        config
      );
      setRecipeCreatorData({ ...recipeCreatorData, image: data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // realtime recipe creator inputs feedback

  useEffect(() => {
    console.log(recipeLines);
  }, [recipeLines]);

  useEffect(() => {
    console.log(recipeCreatorData);
  }, [recipeCreatorData]);

  // adding ingredient object to the recipe's ingredients array
  const handleAddIngredient = () => {
    let recipeIngrArray = [...recipeCreatorData.ingredients];
    let ingredientLines = [...recipeCreatorData.ingredientLines];
    recipeIngrArray.push(recipeLines);
    ingredientLines.push(recipeLines.text);
    setRecipeCreatorData({
      ...recipeCreatorData,
      ingredientLines,
      ingredients: recipeIngrArray,
    });
    //
    console.log(recipeLines);
    console.log("Line added");
    setRecipeLines({ productId: "", text: "", weight: "" });
    console.log(recipeCreatorData);
  };

  // delete recipe function
  const handleDeleteRecipe = (e) => {
    const { _id } = modalData;
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/recipes/${modalData._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { _id },
    }).then((response) => {
      toast.success(`Recipe has been deleted`);
      setRecipes(recipes.filter((recipe) => recipe._id !== _id));
      setSubmitRemove(true);
    });
    //closing modal
    handleCloseRemoveModal();
  };

  return (
    <>
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Recipes Management</h1>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center my-3">All Recipes</h2>
        {isFetchingRecipes ? (
          <Spinner />
        ) : (
          <AllRecipesTableComponent
            recipes={recipes}
            handleShowRemoveModal={handleShowRemoveModal}
          />
        )}
      </Row>
      <Row>
        <h2 className="text-center my-3">Recipe Creator</h2>
        {isFetchingProducts ? (
          <Spinner />
        ) : (
          <RecipeCreatorComponent
            handleRecipeSubmit={handleRecipeSubmit}
            handleRecipeCreatorInputChange={handleRecipeCreatorInputChange}
            recipeCreatorData={recipeCreatorData}
            handleIngredientLines={handleIngredientLines}
            products={products}
            handleChangeProduct={handleChangeProduct}
            handleAddIngredient={handleAddIngredient}
            recipeLines={recipeLines}
            setRecipeLines={setRecipeLines}
            uploading={uploading}
            uploadFileHandler={uploadFileHandler}
          />
        )}
      </Row>
      {/* Remove Recipe Modal */}
      {
        <Modal show={showRemoveModal} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Please Confirm Removal</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleDeleteRecipe}>
            <Modal.Body>
              <h3>
                Recipe for{" "}
                <span className="text-danger">{modalData.label}</span>
              </h3>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleCloseRemoveModal}>
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                Delete
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      }
    </>
  );
};

export default AdminRecipeCreatorScreen;
