import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AdminScreen = () => {
  // state with useState hook
  const [taskPriority, setTaskPriority] = useState("select");
  const [users, setUsers] = useState([]);
  const [productsFormData, setProductsFormData] = useState({
    name: "",
    countInStock: "",
    price: "",
    defaultWeightInGrams: "",
  });
  // destructuring state
  const { name, countInStock, price, defaultWeightInGrams } = productsFormData;

  // handling Product form changes
  const handleProductInputChange = (name) => (event) => {
    console.log(event.target.value);
    // getting existing state and update the key with same name as function argument
    setProductsFormData({ ...productsFormData, [name]: event.target.value });
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

  // Tasks Form Handling
  // Priority Colour Styles
  const setPriorityColour = (priority) => {
    let colour;
    switch (priority) {
      case "low":
        colour = "info";
        break;
      case "medium":
        colour = "warning";
        break;
      case "high":
        colour = "danger";
        break;
      default:
        colour = "success";
    }
    return colour;
  };

  const changePriority = (event) => {
    setTaskPriority(event.target.value);
  };

  const handleTaskSubmit = (event) => {
    //
  };
  // fetching users on load
  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/names`
    );
    console.log(response);
    if (response) {
      setUsers(response.data);
    } else {
      console.log("something went wrong when fetching users...");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Row>
        <ToastContainer />
        <Col>
          <h1 className="text-center my-3">Admin Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Pantry Management</h2>
          <Form onSubmit={handleProductSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                onChange={handleProductInputChange("name")}
                value={name}
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
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              Add Product
            </Button>
          </Form>
        </Col>
        <Col>
          <h2>Task</h2>
          <Form onSubmit={handleTaskSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Job to do</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Name"
                onChange={handleProductInputChange("name")}
                value={name}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>

              <Form.Control
                as="select"
                onChange={changePriority}
                value={taskPriority}
                className={`bg-${setPriorityColour(taskPriority)} text-light`}
              >
                <option className="bg-dark" value="select">
                  Select priority
                </option>
                <option className="bg-danger" value="high">
                  High
                </option>
                <option className="bg-warning" value="medium">
                  Medium
                </option>
                <option className="bg-info" value="low">
                  Low
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="assigned">
              <Form.Label>Assign Task to:</Form.Label>
              <Form.Control as="select">
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
