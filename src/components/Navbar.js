import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

const NavBar = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const { isLogged, logout, setToken } = useAuth();

  const handleClick = () => {
    logout();
    setToken(null);
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  return (
    <div>
      {isLogged() ? (
        <Navbar color="dark" light expand="md">
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse
            isOpen={!collapsed}
            navbar
            className="justify-content-center"
          >
            <Nav className="text-center" navbar>
              <NavItem>
                <NavLink
                  exact
                  className="nav-link text-white"
                  activeclass="active"
                  to="/"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  exact
                  className="nav-link text-white"
                  activeclass="active"
                  to="/search"
                >
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <Button className="btn btn-danger" onClick={handleClick}>
                  Logout
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : null}
    </div>
  );
};

export default NavBar;
