import { Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useGetProductsQuery } from "../slices/productsApi"
import Paginate from "../components/Paginate"
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })

  if (isLoading) return <Loader />
  if (error) return <Message>{error?.data?.Message || error.error}</Message>
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {data.products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ""}
      />
    </>
  )
}

export default HomeScreen
