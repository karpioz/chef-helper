import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
// importing css file
import "./App.css";

// layout components
import Header from "./components/Header";
import Footer from "./components/Footer";

// screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RecipesScreen from "./screens/RecipesScreen";
import RotaScreen from "./screens/RotaScreen";
import PantryScreen from "./screens/PantryScreen";
import TasksScreen from "./screens/TasksScreen";
import ActivateAccountScreen from "./screens/ActivateAccountScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className="my-auto">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/recipes" component={RecipesScreen} exact />
          <Route path="/rota" component={RotaScreen} exact />
          <Route path="/pantry" component={PantryScreen} exact />
          <Route path="/tasks" component={TasksScreen} exact />
          <Route
            path="/auth/activate/:token"
            component={ActivateAccountScreen}
            exact
          />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
