import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../utilities/authUtilities";
import { withRouter } from "react-router-dom";

function HomeScreenUserNavigation({ history }) {
  return (
    <Nav className="justify-content-center" activeKey="/home">
      <LinkContainer to={"/profile"}>
        <Nav.Link className="text-warning">
          <i
            class="fas fa-users-cog fa-2x"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,.85)" }}
          ></i>{" "}
          <strong className="text-dark">Profile</strong>
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
          <strong>Logout</strong>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default withRouter(HomeScreenUserNavigation);
