import { Link, useParams } from "react-router-dom"
import products from "../products"
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from "react-bootstrap"
import Rating from "../components/Rating"
const ProductScreen = () => {
  const { id: productId } = useParams()
  const product = products.find((p) => p._id === productId)

  const inStock = product.countInStock
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
              text={`${product.numReviews} reviews`}
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

              <ListGroup.Item>
                {inStock ? (
                  <Button
                    style={{
                      background: "Green",
                      color: "white",
                      border: "none",
                    }}
                    className="btn-block"
                    type="button"
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
