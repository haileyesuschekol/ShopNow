import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { logout } from "../slices/authSlice"
import { useLogoutMutation } from "../slices/usersApiSlice"
import logo from "../assets/img/shopnowlogo.png"
import SearchBox from "./SearchBox"

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
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
              <SearchBox />
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

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ marginTop: "9px" }}
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <Nav.Link href="/login">
                    <FaUser style={{ marginRight: "5px" }} />
                    Sign-in
                  </Nav.Link>
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Dashboard"
                  id="username"
                  style={{ marginTop: "9px" }}
                >
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Products
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
