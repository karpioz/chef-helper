import React from "react";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { isAuth, logout } from "../utilities/authUtilities";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                height={"50px"}
                className="mr-2"
                src="/images/chef_hat.png"
              />
              <span className="logo__text-chef">Chef</span>{" "}
              <span className="text-warning logo__text-helper ml-2">
                Helper
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/recipes">
                <Nav.Link>
                  <i className="fas fa-utensils"></i> Recipes
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/tasks">
                <Nav.Link>
                  <i className="fas fa-clipboard-list"></i> Tasks
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/rota">
                <Nav.Link>
                  <i className="far fa-calendar-alt"></i> Rota
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/pantry">
                <Nav.Link>
                  <i className="fas fa-clipboard"></i> Pantry
                </Nav.Link>
              </LinkContainer>
              {isAuth() ? (
                <NavDropdown title={isAuth().name} id="username">
                  <LinkContainer
                    to={isAuth().role === "admin" ? "/admin" : "/profile"}
                  >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => {
                      logout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default withRouter(Header);
