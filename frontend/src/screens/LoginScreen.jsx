import React from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email"></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
