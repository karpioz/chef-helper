import React from "react";
import { Container } from "react-bootstrap";
import { isAuth } from "../utilities/authUtilities";

const HomeScreen = () => {
  let name = isAuth() ? isAuth().name.split(" ") : [];

  return (
    <Container>
      <h1 className="my-4 text-center">
        Welcome{" "}
        {isAuth() ? (
          <span className="text-warning">{name[0]} </span>
        ) : (
          <span className="text-danger">Stranger </span>
        )}
        to Chef Helper App
      </h1>
    </Container>
  );
};

export default HomeScreen;
