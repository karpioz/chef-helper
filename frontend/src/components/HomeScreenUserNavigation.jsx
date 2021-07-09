import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../utilities/authUtilities";
import { withRouter } from "react-router-dom";

function HomeScreenUserNavigation({ history }) {
  return (
    <Nav className="justify-content-center" activeKey="/home">
      <LinkContainer to={"/profile"}>
        <Nav.Link className="text-info">
          <i class="fas fa-users-cog fa-2x"></i> Profile
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

export default withRouter(HomeScreenUserNavigation);
