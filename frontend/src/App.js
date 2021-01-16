import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

// layout components
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <h1>Chef Helper Landing Page</h1>
      </Container>
    </Router>
  );
};

export default App;
