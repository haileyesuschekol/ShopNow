import { Col, Row } from "react-bootstrap"
import axios from "axios"
import Product from "../components/Product"
import { useState, useEffect } from "react"
const HomeScreen = () => {
  const [product, setProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("http://localhost:8000/api/products")
      setProducts(data)
    }
    fetchProduct()
  }, [])
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
