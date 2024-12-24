import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap"
import { useDispatch } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useGetProductDetailsQuery } from "../slices/productsApi"
import { addToCart } from "../slices/cartSlice"
import Rating from "../components/Rating"

const ProductScreen = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }))
    navigate("/cart")
  }

  if (isLoading) return <Loader />
  if (error)
    return (
      <Message variant="danger">{error?.data?.Message || error.error}</Message>
    )
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroupItem varient="flush" style={{ marginBottom: "1rem" }}>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <Rating
              value={product.rating}
              text={`${product.numOfReviews} reviews`}
            />
          </ListGroupItem>
          <ListGroup style={{ marginBottom: "1rem" }}>
            <ListGroup.Item>price: {product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <Row>
                  <Col>price:</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In stock" : "Out Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {product.countInStock ? (
                  <Button
                    style={{
                      background: "Green",
                      color: "white",
                      border: "none",
                    }}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                ) : (
                  <Button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                    }}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Out of stock!
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
