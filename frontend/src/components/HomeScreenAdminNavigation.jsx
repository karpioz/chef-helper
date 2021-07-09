import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../utilities/authUtilities";
import { withRouter } from "react-router-dom";

function HomeScreenAdminNavigation({ history }) {
  return (
    <Nav className="justify-content-center" activeKey="/home">
      <LinkContainer to={"/admin/users"}>
        <Nav.Link className="text-info">
          <i class="fas fa-users-cog fa-2x"></i> Users
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/admin/recipe"}>
        <Nav.Link className="text-info">
          <i className="fas fa-utensils fa-2x"></i> Recipes
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/admin/rota"}>
        <Nav.Link className="text-info">
          <i className="far fa-calendar-alt fa-2x"></i> Rota
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/admin"}>
        <Nav.Link className="text-info">
          <i className="fas fa-clipboard-list fa-2x"></i> Tasks | Pantry
        </Nav.Link>
      </LinkContainer>

      <Nav.Item
        onClick={() => {
          logout(() => {
            history.push("/");
          });
        }}
      >
        <Nav.Link className="text-danger">
          <i class="fas fa-sign-out-alt fa-2x"></i> Logout
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default withRouter(HomeScreenAdminNavigation);
