import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { format } from "date-fns"
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
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApi"
import { addToCart } from "../slices/cartSlice"
import Rating from "../components/Rating"
import Meta from "../components/Meta"

const ProductScreen = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductDetailsQuery(productId)
  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }))
    navigate("/cart")
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap()
      refetch()
      toast.success("Review created successfully")
    } catch (err) {
      toast.error("something went wrong, You may review again", err)
    }
  }

  if (isLoading) return <Loader />
  if (error)
    return (
      <Message variant="danger">{error?.data?.Message || error.error}</Message>
    )
  return (
    <>
      <Meta title={product.name} />
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

      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant="flush">
            {product.reviews.map((review) => {
              const reviewCreatedFormmated = review.createdAt
                ? format(new Date(review.createdAt), "yyyy-MM-dd HH:mm")
                : review.createdAt

              return (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{reviewCreatedFormmated}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              )
            })}
            <ListGroup.Item>
              <h2>Write a Review</h2>

              {loadingReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingReview}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
