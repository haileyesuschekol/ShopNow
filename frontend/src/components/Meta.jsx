import { Helmet } from "react-helmet-async"

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="description" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Welcome to ShopNow",
  description: "Buy best electronic products with affordable price",
  keywords: "electronics, buy gaming pc with affordable price, ",
}

export default Meta
