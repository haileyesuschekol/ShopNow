import { FaTrash, FaEdit } from "react-icons/fa"

import { Table, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductsQuery } from "../../slices/productsApi"

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const deleteHandler = () => {
    console.log("delete")
  }

  return (
    <>
      <Row>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3">Create Product</Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATAGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link as={Link} to={`/admin/product/${product._id}/edit`}>
                      <Button
                        className="btn-sm variant='success"
                        variant="light"
                      >
                        <FaEdit />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      style={{ marginLeft: "10px" }}
                      className="btn-sm variant='success"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
