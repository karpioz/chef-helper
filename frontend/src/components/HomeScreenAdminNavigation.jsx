import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../utilities/authUtilities";
import { withRouter } from "react-router-dom";

function HomeScreenAdminNavigation({ history }) {
  return (
    <Nav className="justify-content-center" activeKey="/home">
      <LinkContainer to={"/admin/users"}>
        <Nav.Link className="text-dark">
          <i
            class="fas fa-users-cog fa-2x text-warning"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,.85)" }}
          ></i>{" "}
          <strong>Users</strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/admin/recipe"}>
        <Nav.Link className="text-dark">
          <i
            className="fas fa-utensils fa-2x text-warning"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,.85)" }}
          ></i>{" "}
          <strong>Recipes</strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/admin/rota"}>
        <Nav.Link className="text-dark">
          <i
            className="far fa-calendar-alt fa-2x text-warning"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,.85)" }}
          ></i>{" "}
          <strong>Rota</strong>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to={"/admin"}>
        <Nav.Link className="text-dark">
          <i
            className="fas fa-clipboard-list fa-2x text-warning"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,.85)" }}
          ></i>{" "}
          <strong>Tasks | Pantry</strong>
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
          <i
            class="fas fa-sign-out-alt fa-2x"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,.85)" }}
          ></i>{" "}
          <strong className="ml-1">Logout</strong>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default withRouter(HomeScreenAdminNavigation);
