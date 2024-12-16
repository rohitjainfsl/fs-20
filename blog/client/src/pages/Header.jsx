import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";
import { useEffect, useState } from "react";
import instance from "../axiosConfig";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    try {
      const response = await instance.get("/auth/check");
      console.log(response);
      if (response.status === 200) {
        setIsAuthenticated(response.data.isAuthenticated);
        setAuthenticatedUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  }

  async function logout() {
    try {
      const response = await instance.post("/user/logout");
      console.log(response);
      if (response.status === 200) {
        setIsAuthenticated(false);
        setAuthenticatedUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Bookstore
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                {" "}
                {/* Aligns navigation items to the right */}
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </Nav.Item>
                {isAuthenticated ? (
                  <>
                    <Nav.Item>Welcome {authenticatedUser.username}</Nav.Item>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/profile">
                        My Profile
                      </Nav.Link>
                    </Nav.Item>
                    <button onClick={logout}>Logout</button>
                  </>
                ) : (
                  <Nav.Item>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link as={Link} to="/blog">
                    Blog
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
