import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetUserQuery } from "../../slices/usersApiSlice"

const UserScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUserQuery()

  const deleteHandler = () => {
    console.log("delete")
  }

  if (isLoading) return <Loader />
  if (error) return <Message variant="danger">Something went wrong!</Message>
  return (
    <>
      <h2>Users</h2>
      <Table striped hover responsive className="table-sm">
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Link as={Link} to={`/order/${user._id}/edit`}>
                    <Button className="btn-sm variant='success">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    className="btn-sm variant='danger'"
                    onClick={() => deleteHandler(user._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default UserScreen
