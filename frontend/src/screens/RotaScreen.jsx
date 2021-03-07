import React from "react";
import { Row, Col } from "react-bootstrap";
import RotaCreatorComponent from "../components/RotaCreatorComponent";

const RotaScreen = () => {
  return (
    <>
      <Row>
        <Col>
          <h1>Rota</h1>
        </Col>
      </Row>
      <Row>
        <RotaCreatorComponent />
      </Row>
    </>
  );
};

export default RotaScreen;
