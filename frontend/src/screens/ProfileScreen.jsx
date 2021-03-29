import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie } from "../utilities/authUtilities";
import axios from "axios";

const ProfileScreen = () => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Update",
  });
  // destructuring state
  const { name, email, password, confirmPassword, buttonText } = formData;

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
      setUser(response.data);
      setIsFetchingUser(false);
    } else {
      console.log("something went wrong when fetching users...");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // submiting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: "Submitting" });
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          buttonText: "Submited",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data);
        setFormData({ ...formData, buttonText: "Submit" });
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
          <h1>User Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={user.name}
              onChange={handleInputChange("name")}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={user.email}
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
      {JSON.stringify(user)}
    </Container>
  );
};

export default ProfileScreen;
