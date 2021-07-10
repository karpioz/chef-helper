import React, { useState, useEffect } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { isAuth } from "../utilities/authUtilities";
import { LinkContainer } from "react-router-bootstrap";

// importing components
import BookmarkedRecipesCarousel from "../components/BookmarkedRecipesCarousel";
import HomeScreenUserNavigation from "../components/HomeScreenUserNavigation";
import HomeScreenAdminNavigation from "../components/HomeScreenAdminNavigation";
import HighPriorityTasks from "../components/HighPriorityTasks";

const HomeScreen = () => {
  let name = isAuth() ? isAuth().name.split(" ") : [];

  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);

  const fetchBookmarkedRecipes = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/recipes/bookmarked`
    );
    setBookmarkedRecipes(data);
  };

  const fetchHighPriorityTasks = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/tasks/high`);
    setHighPriorityTasks(data);
  };

  useEffect(() => {
    fetchBookmarkedRecipes();
    fetchHighPriorityTasks();
  }, []);

  return (
    <>
      <Container>
        <Alert variant="secondary" className="my-4">
          <Alert.Heading>
            <h1 className="my-4 text-center">
              Welcome{" "}
              {isAuth() ? (
                <span className="text-success">{name[0]} </span>
              ) : (
                <span className="text-danger">Stranger </span>
              )}
            </h1>
          </Alert.Heading>
          <hr />
          {!isAuth() && (
            <h3 className="text-center">
              Please{" "}
              <LinkContainer to="/login">
                <em className="text-info home-link">login</em>
              </LinkContainer>{" "}
              or{" "}
              <LinkContainer to="/register">
                <em className="text-success home-link">register</em>
              </LinkContainer>{" "}
              to fully enjoy <strong>Chef Helper</strong> App!
            </h3>
          )}
          {isAuth() && isAuth().role === "admin" && (
            <HomeScreenAdminNavigation />
          )}
          {isAuth() && isAuth().role === "user" && <HomeScreenUserNavigation />}
        </Alert>
      </Container>
      <Container className="my-3">
        {bookmarkedRecipes.length > 0 && (
          <BookmarkedRecipesCarousel recipes={bookmarkedRecipes} />
        )}
        {highPriorityTasks.length > 0 && (
          <HighPriorityTasks tasks={highPriorityTasks} />
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
