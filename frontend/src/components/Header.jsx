import { Navbar, Nav, Container } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import logo from "../assets/img/shopnowlogo.png"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="logo"
                width="70rem"
                height="75rem"
                style={{ marginLeft: "3px" }}
              />
              ShopNow
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <Nav.Link>
                  <FaShoppingCart style={{ marginRight: "5px" }} />
                  Cart
                </Nav.Link>
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <Nav.Link href="/login">
                  <FaUser style={{ marginRight: "5px" }} />
                  Signin
                </Nav.Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
