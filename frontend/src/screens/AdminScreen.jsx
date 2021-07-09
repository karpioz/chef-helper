import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { setPriorityColour } from "../utilities/stylingUtilities";
import { getCookie } from "../utilities/authUtilities.js";

const AdminScreen = () => {
  // state with useState hook
  const [taskPriority, setTaskPriority] = useState("select");
  const [taskFormData, setTaskFormData] = useState({
    taskName: "",
    assignedTo: "",
    priority: "low",
  });
  const [users, setUsers] = useState([]);
  const [productsFormData, setProductsFormData] = useState({
    name: "",
    countInStock: "",
    price: "",
    defaultWeightInGrams: "",
  });
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  const [products, setProducts] = useState([]);

  const [uploading, setUploading] = useState(false);

  // destructuring state
  const { name, countInStock, price, defaultWeightInGrams } = productsFormData;
  const { taskName, assignedTo, priority } = taskFormData;

  // handling Product form changes
  const handleProductInputChange = (name) => (event) => {
    console.log(event.target.value);
    // getting existing state and update the key with same name as function argument
    setProductsFormData({ ...productsFormData, [name]: event.target.value });
  };
  // handling Tasks form changes
  const handleTaskInputChange = (name) => (event) => {
    console.log(event.target.value);
    // getting existing state and update the key with same name as function argument
    setTaskFormData({ ...taskFormData, [name]: event.target.value });
    console.log(taskFormData);
  };

  // submiting the Product form
  const handleProductSubmit = (event) => {
    event.preventDefault();
    setProductsFormData({ ...productsFormData });
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/products/`,
      data: { name, countInStock, price, defaultWeightInGrams },
    })
      .then((response) => {
        setProductsFormData({
          ...productsFormData,
          name: "",
          countInStock: "",
          price: "",
          defaultWeightInGrams: "",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("PRODUCT CREATE ERROR", error.response.data);
        setProductsFormData({ ...productsFormData });
        toast.error(error.response.data.error);
      });
  };

  const changePriority = (event) => {
    setTaskPriority(event.target.value);
    setTaskFormData({ ...taskFormData, priority: event.target.value });
  };

  const changeAssignedTo = (event) => {
    setTaskFormData({ ...taskFormData, assignedTo: event.target.value });
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    setTaskFormData({ ...taskFormData, name: taskName });
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/tasks`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: { taskName, assignedTo, priority },
    })
      .then((response) => {
        setTaskFormData({
          ...taskFormData,
          taskName: "",
          assignedTo: "",
          priority: "",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("TASK CREATE ERROR", error.response.data);
        setTaskFormData({ ...taskFormData });
        toast.error(error.response.data.error);
      });
  };

  /* // uploading image file
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
  }; */

  // fetching users on load
  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/names`
    );
    //console.log(response);
    if (response) {
      setUsers(response.data);
      setIsFetchingProducts(false);
    } else {
      console.log("something went wrong when fetching users...");
    }
  };
  // fetching products on load
  const fetchProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/products`);
    //console.log(response);
    if (response) {
      setProducts(response.data);
    } else {
      console.log("something went wrong when fetching products...");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    return () => {
      setUsers([]);
      setProducts([]);
    };
  }, []);

  return (
    <>
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Stock and Task Management</h1>
        </Col>
      </Row>
      <Row>
        <Col className="my-3" md={6} sm={12} xl={6}>
          <h2 className="my-3">Pantry Management</h2>
          <Form onSubmit={handleProductSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                onChange={handleProductInputChange("name")}
                value={name}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Quantity"
                onChange={handleProductInputChange("countInStock")}
                value={countInStock}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Price"
                onChange={handleProductInputChange("price")}
                value={price}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Weight"
                onChange={handleProductInputChange("defaultWeightInGrams")}
                value={defaultWeightInGrams}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Add Product
            </Button>
          </Form>
        </Col>
        <Col className="my-3" md={6} sm={12} xl={6}>
          <h2 className="my-3">Tasks Assignement</h2>
          <Form onSubmit={handleTaskSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Job to do</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Name"
                onChange={handleTaskInputChange("taskName")}
                value={taskName}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>

              <Form.Control
                as="select"
                onChange={changePriority}
                value={priority}
                className={`bg-${setPriorityColour(priority)} text-light`}
              >
                <option className="bg-info" value="low">
                  Low
                </option>
                <option className="bg-warning" value="medium">
                  Medium
                </option>
                <option className="bg-danger" value="high">
                  High
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="assignedTo">
              <Form.Label>Assign Task to:</Form.Label>
              <Form.Control as="select" onChange={changeAssignedTo} required>
                <option>Select user</option>
                {users.length !== 0 ? (
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <option className="bg-danger text-light">
                    Error fetching users
                  </option>
                )}
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="warning">
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AdminScreen;
