import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { isAuth } from "../utilities/authUtilities";
import { LinkContainer } from "react-router-bootstrap";

// importing components
import BookmarkedRecipesCarousel from "../components/BookmarkedRecipesCarousel";
import HomeScreenUserNavigation from "../components/HomeScreenUserNavigation";
import HomeScreenAdminNavigation from "../components/HomeScreenAdminNavigation";

const HomeScreen = () => {
  let name = isAuth() ? isAuth().name.split(" ") : [];

  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  const fetchBookmarkedRecipes = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/recipes/bookmarked`
    );
    setBookmarkedRecipes(data);
  };

  useEffect(() => {
    fetchBookmarkedRecipes();
  }, []);

  return (
    <>
      <Container className="my-3">
        {bookmarkedRecipes.length > 0 && (
          <BookmarkedRecipesCarousel recipes={bookmarkedRecipes} />
        )}
      </Container>
      <Container>
        <h1 className="my-4 text-center">
          Welcome{" "}
          {isAuth() ? (
            <span className="text-warning">{name[0]} </span>
          ) : (
            <span className="text-danger">Stranger </span>
          )}
        </h1>
        {isAuth() && isAuth().role === "admin" && <HomeScreenAdminNavigation />}
        {isAuth() && isAuth().role === "user" && <HomeScreenUserNavigation />}
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
      </Container>
    </>
  );
};

export default HomeScreen;
