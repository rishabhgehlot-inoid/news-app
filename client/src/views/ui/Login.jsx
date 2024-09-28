import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${url}/login`, values);
      localStorage.setItem("token", response.data.access_token);
      if (response.data.access_token) {
        navigate("/news");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error, {
        position: "bottom-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Login
          </CardTitle>
          <CardBody>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      as={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      as={Input}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                  <Link to="/auth/signup" className="px-3">
                    SignUp
                  </Link>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default Login;
