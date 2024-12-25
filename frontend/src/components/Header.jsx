import { useSelector } from "react-redux"
import { Navbar, Nav, Container, Badge } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import logo from "../assets/img/shopnowlogo.png"
import { Link } from "react-router-dom"

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
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
              <Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart style={{ marginRight: "5px" }} />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                    </Badge>
                  )}
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
