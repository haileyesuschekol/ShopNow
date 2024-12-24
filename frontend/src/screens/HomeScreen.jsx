import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import Loader from "../components/Loader"
import { useGetProductsQuery } from "../slices/productsApi"
const HomeScreen = () => {
  const { data: product, isLoading, error } = useGetProductsQuery()

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {product.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
