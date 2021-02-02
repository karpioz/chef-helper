import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../utilities/authUtilities";

const LoginScreen = ({ location, history }) => {
  // state with useState hook
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    buttonText: "Login",
  });
  // destructuring state
  const { email, password, buttonText } = formData;

  // submiting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: "Checking..." });
    // axios to connect with backend
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/login`,
      data: { email, password },
    })
      .then((response) => {
        // save the response (user and token) local storage/cookie
        authenticate(response, () => {
          // emptying the state
          setFormData({
            ...formData,
            email: "",
            password: "",
          });
          // toast message after successful login
          toast.success(`Hi ${response.data.user.name}, Welcome back!`);
        });
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
    <>
      <FormContainer>
        <ToastContainer />
        <h1 className="text-center">Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange("email")}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={handleInputChange("password")}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            {buttonText}
          </Button>
        </Form>
      </FormContainer>

      <Row className="py-3 text-center">
        <Col>
          New User? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
