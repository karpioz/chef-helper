import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie, updateUserLocalStorage } from "../utilities/authUtilities";
import axios from "axios";

const ProfileScreen = () => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Update",
  });
  // destructuring state
  const { _id, name, email, password, confirmPassword, buttonText } = formData;

  const token = `Bearer ${getCookie("token")}`;

  // fetching users on load
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  };

  const fetchUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/profile`,
      config
    );
    //console.log(response);
    if (response) {
      setFormData({
        ...formData,
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        buttonText: "Update",
      });
      setIsFetchingUser(false);
    } else {
      console.log("oops! something went wrong...");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // submiting the form
  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    if (password !== confirmPassword)
      return toast.error("Both passwords don't match");

    setFormData({ ...formData, buttonText: "Submitting" });
    // axios to connect with backend
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/users/profile/`,
      data: { name, email, password },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("UPDATE PROFILE SUCCESSFUL");
        updateUserLocalStorage(response, () => {
          toast.success(response.data.message);
          setFormData({
            ...formData,
            buttonText: "Updated",
          });
        });
      })
      .catch((error) => {
        console.log("UPDATE PROFILE ERROR", error.response.data);
        toast.error(error.response.data.error);
      });
  };

  // handling input changes
  const handleInputChange = (name) => (event) => {
    console.log(event.target.value);
    // getting existing state and update the key with same name as function argument
    setFormData({ ...formData, [name]: event.target.value });
  };

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col>
          <h1 className="my-4">User Profile</h1>
          <h4>
            You can <strong className="text-warning">update</strong> your login
            details
          </h4>
        </Col>
      </Row>
      <Row className="text-center text-info font-weight-bold">
        <Form
          onSubmit={handleSubmitUpdate}
          className="border border-secondary p-3 my-4 rounded"
        >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleInputChange("name")}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleInputChange("email")}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handleInputChange("password")}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleInputChange("confirmPassword")}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="warning">
            {buttonText}
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
