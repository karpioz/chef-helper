import React from "react";
import { Form } from "react-bootstrap";

const RotaCreatorComponent = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Select week ending</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => console.log(e.target.value)}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
};

export default RotaCreatorComponent;
