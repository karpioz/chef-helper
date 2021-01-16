import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// layout components
import Header from "./components/Header";
import Footer from "./components/Footer";

// screens
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <h1>Chef Helper Landing Page</h1>
          <Route path="/login" component={LoginScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
