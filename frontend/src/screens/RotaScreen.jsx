import React from "react";
import { Row, Col } from "react-bootstrap";
import RotaCreatorComponent from "../components/RotaCreatorComponentTwo";
import RotaDisplayComponent from "../components/RotaDisplayComponent";
import RotaDisplayComponentCards from "../components/RotaDisplayComponentCards";
import { isAuth } from "../utilities/authUtilities";

const RotaScreen = () => {
  return (
    <>
      <Row>
        {isAuth() && isAuth().role === "admin" ? (
          <>
            <h2>Rota Creator</h2>
            <RotaCreatorComponent />
          </>
        ) : (
          <RotaDisplayComponentCards />
        )}
      </Row>
    </>
  );
};

export default RotaScreen;
