import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
// importing css file
import "./App.css";

// layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RecipesScreen from "./screens/RecipesScreen";
import RecipeScreen from "./screens/RecipeScreen";
import RotaScreen from "./screens/RotaScreen";
import PantryScreen from "./screens/PantryScreen";
import TasksScreen from "./screens/TasksScreen";
import ActivateAccountScreen from "./screens/ActivateAccountScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import AdminUsersScreen from "./screens/AdminUsersScreen";
import AdminRotaCreatorScreen from "./screens/AdminRotaCreatorScreen";
import AdminRecipeCreatorScreen from "./screens/AdminRecipeCreatorScreen";
import AdminRotaEditScreen from "./screens/AdminRotaEditScreen";

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
          <Route path="/recipes/:id" component={RecipeScreen} exact />
          <Route path="/rota" component={RotaScreen} exact />
          <Route path="/pantry" component={PantryScreen} exact />
          <Route path="/tasks" component={TasksScreen} exact />
          <Route
            path="/auth/activate/:token"
            component={ActivateAccountScreen}
            exact
          />
          <ProtectedUserRoute path="/profile" exact component={ProfileScreen} />

          <ProtectedAdminRoute
            path="/admin/users"
            exact
            component={AdminUsersScreen}
          />
          <ProtectedAdminRoute
            path="/admin/rota"
            exact
            component={AdminRotaCreatorScreen}
          />
          <ProtectedAdminRoute
            path="/admin/recipe"
            exact
            component={AdminRecipeCreatorScreen}
          />
          <ProtectedAdminRoute
            path="/rota/:id/edit"
            exact
            component={AdminRotaEditScreen}
          />
          <ProtectedAdminRoute path="/admin" exact component={AdminScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
