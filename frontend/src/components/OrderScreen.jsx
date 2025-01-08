import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap"
import { toast } from "react-toastify"
import { format } from "date-fns"
import { useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  useGetOrderDetailQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/orderApiSlice"

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailQuery(orderId)

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery()
  const { userInfo } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        })
        paypalDispatch({ type: "setLoadingStatus", value: "pending" })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript()
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success("Payment successful")
      } catch (error) {
        toast.error(`Error, please try again!`)
        toast.error(error?.message || error?.data?.message)
      }
    })
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } })
    refetch()
    toast.success("Payment successful")
  }

  const onError = (error) => {
    toast.error(error.message)
  }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId
      })
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success("Order delivered")
    } catch (error) {
      toast.error("Something went wrong")
      toast.error(error.message)
    }
  }

  if (isLoading) return <Loader />
  if (error) return <Message variant="danger">Error while processing</Message>

  const paidAtFormmated = order.paidAt
    ? format(new Date(order.paidAt), "yyyy-MM-dd HH:mm")
    : "Not Paid"

  const deliveredAtFormatted = order.deliveredAt
    ? format(new Date(order.deliveredAt), "yyyy-MM-dd HH:mm")
    : "Not Paid"
  return (
    <>
      <h1>Order Number: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message>Deliverd on {deliveredAtFormatted}</Message>
              ) : (
                <Message variant="danger">Not Deliverd</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {paidAtFormmated}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        {console.log(item)}
                      </Col>
                      <Col md={4}>
                        {item.quantity} X ${item.price} = $
                        {item.quantity * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            }
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark As Deliverd
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
