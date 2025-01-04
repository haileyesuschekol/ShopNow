import { FaTimes } from "react-icons/fa"
import { format } from "date-fns"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetOrdersQuery } from "../../slices/orderApiSlice"
import { Link } from "react-router-dom"
import { Table, Nav, Button } from "react-bootstrap"

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()
  console.log(orders)

  if (isLoading) return <Loader />
  if (error) return <Message variant="danger">Something went wrong!</Message>
  return (
    <>
      <h2>Orders</h2>
      <Table striped hover responsive className="table-sm">
        <thead>
          <th>ID</th>
          <th>USER</th>
          <th>EMAIL</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
        </thead>
        <tbody>
          {orders.map((order) => {
            const paidAtFormatted = order.paidAt
              ? format(new Date(order.paidAt), "yyyy-MM-dd HH:mm")
              : order.paidAt.toLocalString()

            const createdAtFormatted = order.createdAt
              ? format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")
              : order.createdAt.toLocalString()

            const deliveredAtFormatted = order.deliveredAt ? (
              format(new Date(order.deliveredAt), "yyyy-MM-dd HH:mm")
            ) : (
              <FaTimes style={{ color: "red" }} />
            )
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.user && order.user.email}</td>
                <td>{createdAtFormatted}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    paidAtFormatted
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>{deliveredAtFormatted}</td>
                <td>
                  <Nav as={Link} to={`/order/${order._id}`}>
                    <Button className="btn-sm variant='success">Details</Button>
                  </Nav>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default OrderListScreen
