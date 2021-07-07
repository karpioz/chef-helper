import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  Spinner,
  Button,
  Form,
  Container,
} from "react-bootstrap";
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

  const [bookmarkUpdated, setBookmarkUpdated] = useState(false);

  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleClose = () => setShow(false);

  // Recipe starting empty state
  const [recipeCreatorData, setRecipeCreatorData] = useState({
    label: "",
    healthLabels: [],
    image: "https://dummyimage.com/125x125/ccc/000",
    ingredientLines: [],
    ingredients: [
      {
        productId: "",
        text: "",
        weight: null,
      },
    ],
  });

  // Recipe's ingredient lines array state
  const [recipeLines, setRecipeLines] = useState([
    {
      productId: "",
      text: "",
      weight: null,
    },
  ]);

  // Uploading photo state
  const [uploading, setUploading] = useState(false);

  // Destructuring recipe's state
  const { label, healthLabels, image, ingredients } = recipeCreatorData;

  // Displaying Modal Screen to delete recipe
  const handleShowRemoveModal = (id) => {
    setModalData(() => recipes.find((recipe) => recipe._id === id));
    setShowRemoveModal(true);
    setSubmitRemove(false);
    console.log(id);
  };

  // fetching products on load
  const fetchProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/products`);
    // console.log(response);
    if (response) {
      setIsFetchingProducts(false);
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

  // Fetching products on load and storing them in the state for use in the recipe creator
  useEffect(() => {
    setBookmarkUpdated(false);
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  // Fetching all recipes on first page load, after delete and after update
  useEffect(() => {
    setBookmarkUpdated(false);
    fetchRecipes();
  }, [submitRemove, setNewRecipeAdded, bookmarkUpdated]);

  // *** handling recipe creator ***
  // submiting completed recipe to database
  const handleRecipeSubmit = (e) => {
    console.log("clicked add recipe");
    e.preventDefault();
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/recipes`,
      data: { label, healthLabels, image, ingredients },
    })
      .then((response) => {
        setRecipeCreatorData({
          ...recipeCreatorData,
          label: "",
          healthLabels: [],
          image: "https://dummyimage.com/125x125/ccc/000",
          ingredients: [],
        });
        setRecipeLines([
          {
            productId: "",
            text: "",
            weight: null,
          },
        ]);
        setPreviewSource("");
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

  // uploading image file and store on the server - not used anymore due to change for storage images in the cloudinary service
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

  // uploading image file to Cloudinary
  const [photoInput, setPhotoInput] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  // image file type validation function
  const isImage = (file) => {
    return !!file.type.match("image.*");
  };

  const handlePhotoInputChange = (e) => {
    const photo = e.target.files[0];
    // previewing uploaded photo
    previewPhoto(photo);
  };

  const previewPhoto = (photo) => {
    const reader = new FileReader();
    reader.readAsDataURL(photo);

    // validation by checking file type of uploaded file
    if (!isImage(photo)) {
      toast.error("Please choose image / photo file");
    } else {
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        uploadRecipePhoto(reader.result);
      };
    }
  };

  const uploadRecipePhoto = async (base64EncodedImage) => {
    //
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API}/upload/cloudinary`,
        {
          method: "POST",
          body: JSON.stringify({ data: base64EncodedImage }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
      toast.success(response.msg);
      console.log(response.imgData);

      setRecipeCreatorData({
        ...recipeCreatorData,
        image: response.imgData.secure_url,
      });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // remove photo from Cloudinary
  const deleteRecipePhoto = async () => {
    // extracting public id of the photo to delete from the url address stored in the state
    if (
      !recipeCreatorData.image.includes(
        "https://res.cloudinary.com/uws-student/image/upload/"
      )
    ) {
      toast.error(
        "Image file is just link from internet. Cannot delete that. Please insert new link or upload photo."
      );
      return;
    }

    let public_id = recipeCreatorData.image.split("/");
    public_id = public_id[7].substring(0, 20);

    console.log(public_id);
    //
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API}/upload/cloudinary/destroy`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id }),
        }
      );
      const response = await data.json();
      setPreviewSource("");
      toast.success(response.msg);

      setRecipeCreatorData({
        ...recipeCreatorData,
        image: "https://dummyimage.com/125x125/ccc/000",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ***** TESTING NEW RECIPE CREATOR ****

  const handleIngredientLineChangeNew = (e, i) => {
    //
    const { name, value } = e.target;
    const ingrArray = [...recipeCreatorData.ingredients];
    ingrArray[i][name] = value;
    setRecipeCreatorData({ ...recipeCreatorData, ingredients: ingrArray });
  };

  const handleAddIngredientNew = (i) => {
    //
    const recipeCreatorFormIngrArray = [...recipeCreatorData.ingredients];
    const recipeCreatorTextLines = [...recipeCreatorData.ingredientLines];
    const recipeTextLine = recipeCreatorData.ingredients.map((x) => x.text);
    recipeCreatorTextLines.push(recipeTextLine);

    recipeCreatorFormIngrArray.push({ productId: "", text: "", weight: 0 });

    setRecipeCreatorData({
      ...recipeCreatorData,
      ingredientLines: recipeCreatorTextLines,
      ingredients: recipeCreatorFormIngrArray,
    });
  };

  // storing product id in recipeLines state
  const handleChangeProductNew = (e, i) => {
    const ingrArray = [...recipeCreatorData.ingredients];
    ingrArray[i]["productId"] = e.target.value;

    setRecipeCreatorData({
      ...recipeCreatorData,
      ingredients: ingrArray,
    });
  };

  // removing ingredient input from the recipe's creator
  const handleRemoveIngredient = (index) => {
    const ingrArray = [...recipeCreatorData.ingredients];
    ingrArray.splice(index, 1);
    //console.log(`ingr Array after splice - ${ingrArray}`);
    setRecipeCreatorData({
      ...recipeCreatorData,
      ingredients: ingrArray,
    });
  };

  // Bookmarking Recipes
  const handleClickBookmark = (id) => {
    //
    // finding exact recipe by id
    let bookmarked = recipes.filter((r) => r._id === id);
    // toggling bookmarke flag true/false or false/true
    bookmarked = !bookmarked[0].bookmarked;

    // updating it in MongoDB
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/recipes/update/bookmark/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { bookmarked },
    }).then((response) => {
      toast.success(`Recipe's bookmark has changed `);
      setBookmarkUpdated(true);
    });
  };

  // ***** TESTING NEW RECIPE CREATOR ****
  //-----------------------------------------------
  //

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
    //closing modal window
    handleCloseRemoveModal();
  };

  // RECIPE UPDATE
  const [isUpdatingRecipe, setIsUpdatingRecipe] = useState(false);
  const [recipeToUpdateData, setRecipeToUpdateData] = useState("");
  const [recipeIdToUpdate, setRecipeIdToUpdate] = useState("");
  // fetching single recipe with id from url
  const fetchRecipeToUpdate = async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/recipes/update/${id}`
    );
    // storing fetched recipe data in the state
    setRecipeToUpdateData(data);

    // copying that data to recipe creator state to populate it in the form
    const recipeCreatorFormIngrArray = await [...data.ingredients];
    setRecipeLines(recipeCreatorFormIngrArray);

    const recipeCreatorDataToUpdate = await {
      label: data.label,
      healthLabels: [...data.healthLabels],
      image: data.image,
      ingredientLines: [...data.ingredientLines],
      ingredients: [...data.ingredients],
    };

    setRecipeCreatorData(recipeCreatorDataToUpdate);
  };
  // update recipe after click on it
  const handleClickUpdate = (id) => {
    //
    console.log(id);
    fetchRecipeToUpdate(id);
    setIsUpdatingRecipe(true);
    setRecipeIdToUpdate(id);
  };

  // submit updated recipe
  const handleRecipeUpdateSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/recipes/update/${recipeIdToUpdate}`,
      { label, healthLabels, image, ingredients },
      {
        headers: {
          "Content-Type": "application/json",
          /* Authorization: `Bearer ${getCookie("token")}`, */
        },
      }
    );
    if (response) {
      toast.success(response.data.message);
      setPreviewSource("");
      setRecipeCreatorData({
        label: "",
        healthLabels: [],
        image: "https://dummyimage.com/125x125/ccc/000",
        ingredientLines: [],
        ingredients: [
          {
            productId: "",
            text: "",
            weight: null,
          },
        ],
      });
      setIsUpdatingRecipe(false);
      console.log("recipe update submitted");
    } else {
      //console.log("RECIPE UPDATE ERROR", error.response.data);
      toast.error(response.data.error);
    }
  };

  // realtime recipe creator inputs feedback

  useEffect(() => {}, [isUpdatingRecipe, recipeCreatorData, bookmarkUpdated]);

  return (
    <>
      <Container>
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
              handleClickUpdate={handleClickUpdate}
              handleClickBookmark={handleClickBookmark}
            />
          )}
        </Row>
        <Row>
          <Col>
            <h2 className="my-3 text-center">Recipe Creator</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {isFetchingProducts ? (
              <Spinner />
            ) : (
              <RecipeCreatorComponent
                handleRecipeSubmit={handleRecipeSubmit}
                handleRecipeCreatorInputChange={handleRecipeCreatorInputChange}
                recipeCreatorData={recipeCreatorData}
                products={products}
                handleChangeProductNew={handleChangeProductNew}
                handleAddIngredientNew={handleAddIngredientNew}
                recipeLines={recipeLines}
                setRecipeLines={setRecipeLines}
                uploading={uploading}
                uploadFileHandler={uploadFileHandler}
                handleIngredientLineChangeNew={handleIngredientLineChangeNew}
                handleRemoveIngredient={handleRemoveIngredient}
                handlePhotoInputChange={handlePhotoInputChange}
                photoInput={photoInput}
                selectedPhoto={selectedPhoto}
                previewSource={previewSource}
                deleteRecipePhoto={deleteRecipePhoto}
                isUpdatingRecipe={isUpdatingRecipe}
                handleRecipeUpdateSubmit={handleRecipeUpdateSubmit}
              />
            )}
          </Col>
        </Row>

        <hr />
        {JSON.stringify(recipeCreatorData)}
        <hr />
        {JSON.stringify(recipeLines)}
        <hr />
        {JSON.stringify(recipeToUpdateData)}
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
      </Container>
    </>
  );
};

export default AdminRecipeCreatorScreen;
