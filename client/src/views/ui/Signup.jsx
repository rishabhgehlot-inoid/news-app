import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const SignUp = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/register`, user);
      console.log(response);
      navigate("/auth/login");
    } catch (error) {
      console.log(error.response.data.error);
      // Express Validator
      // toast.error(error.response.data.errors[0].msg, {
      //   position: "bottom-right",
      // });
      // Joi
      // toast.error(error.response.data.error[0].message, {
      //   position: "bottom-right",
      // });
      // Yup
      toast.error(error.response.data.error, {
        position: "bottom-right",
      });
    }
  };
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            SignUp
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                />
              </FormGroup>
              <Button onClick={handleSubmit}>Submit</Button>
              <Link to="/auth/login" className=" px-3">
                Login
              </Link>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default SignUp;
