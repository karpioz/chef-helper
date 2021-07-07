import React, { useState } from "react";
//import { Link } from 'react-router-dom'
import { Form, Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import FormContainer from "../components/FormContainer";
import axios from "axios";

const RegisterScreen = ({ location, history }) => {
  // state with useState hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Submit",
  });
  // destructuring state
  const { name, email, password, confirmPassword, buttonText } = formData;

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
    <FormContainer>
      <h1 className="text-center">Please Register</h1>

      <ToastContainer />

      <Form
        className="border border-secondary p-3 my-4 rounded"
        onSubmit={handleSubmit}
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
        <Button type="submit" variant="success">
          {buttonText}
        </Button>
      </Form>

      <Row className="py-3">
        {/* <Col>
					Already registered?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col> */}
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
