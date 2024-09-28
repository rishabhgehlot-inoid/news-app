import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
} from "reactstrap";
import "./index.css";

const Blog = (props) => {
  const instance = axios.create({
    headers: { token: localStorage.getItem("token") },
  });
  const navigation = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await instance.delete(
        `http://localhost:5000/news/delete/${props.delete}`
      );
      console.log(response);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="blog-card shadow-sm border-0 rounded-lg">
      <CardImg
        alt="Card image cap"
        src={props.image}
        className="img-fluid blog-image"
      />
      <CardBody className="p-4">
        <CardTitle tag="h5" className="text-truncate blog-title mb-2">
          {props.title}
        </CardTitle>
        <CardSubtitle className="text-muted mb-3"></CardSubtitle>
        <CardText className="blog-text">
          <p className="text-truncate">{props.text}</p>
        </CardText>
        <Row className="align-items-center mt-3">
          <Col>
            <Button
              className="delete-btn"
              color={props.color}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Col>
          <Col>
            <Link to={`/news/update/${props.delete}`} className="update-btn">
              Update
            </Link>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Link to={`/news/${props.delete}`} className="read-more-btn">
              Read More
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Blog;
