import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      height="5rem"
      width="5rem"
      display="block"
      color="green"
      margin="auto"
    ></Spinner>
  )
}

export default Loader
