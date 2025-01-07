import { FaTrash, FaEdit } from "react-icons/fa"
import { Table, Button, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApi"
import Paginate from "../../components/Paginate"

const ProductListScreen = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  })
  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id)
      toast.success("Product Deleted")
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const createProductHandler = async () => {
    try {
      await createProduct()
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            Create Product
          </Button>
        </Col>
      </Row>

      {loadingProduct && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
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
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      className="btn-sm variant='success"
                      variant="light"
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                    >
                      <FaEdit />
                    </Button>

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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
