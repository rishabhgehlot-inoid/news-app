import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Alert,
} from "reactstrap";

const EditNews = () => {
  const instance = axios.create({
    headers: { token: localStorage.getItem("token") },
  });
  const { newsId } = useParams();
  const [news, setNews] = useState({
    title: "",
    description: "",
    poster: "",
  });
  const fetchNews = async () => {
    const response = await instance.get(`http://localhost:5000/news/${newsId}`);
    setNews(response.data[0]);
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const navigation = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  async function handleSubmit() {
    const url = `http://localhost:5000/news/${newsId}`;
    console.log(news);
    if (!news.title) {
      setAlertMessage({ message: "Please Add Title", type: "danger" });
      setAlertShow(true);
      return;
    }
    if (!news.description) {
      setAlertMessage({ message: "Please Add description", type: "danger" });
      setAlertShow(true);
      return;
    }
    if (!news.poster) {
      setAlertMessage({ message: "Please Add Poster", type: "danger" });
      setAlertShow(true);
      return;
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("poster", news.poster);
    try {
      await instance.put(url, formData, config).then((response) => {
        console.log(response.data);
      });
      setAlertMessage({
        message: "News successfully Updated",
        type: "success",
      });
      setAlertShow(true);
      navigation("/");
    } catch (error) {
      console.log(error.message);
      setAlertMessage({
        message: error.message,
        type: "success",
      });
      setAlertShow(true);
    }
  }

  useEffect(() => {
    const handleShowUpdate = () => {
      setAlertShow(false);
    };
    setTimeout(handleShowUpdate, 2000);
  }, [alertShow]);

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add News
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  value={news.title}
                  onChange={(e) => setNews({ ...news, title: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  value={news.description}
                  onChange={(e) =>
                    setNews({ ...news, description: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="poster">Poster</Label>
                <Input
                  id="poster"
                  name="poster"
                  type="file"
                  onChange={(e) =>
                    setNews({ ...news, poster: e.target.files[0] })
                  }
                />
              </FormGroup>

              <Button onClick={handleSubmit}>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
      {alertShow && (
        <Alert color={alertMessage.type}>{alertMessage.message} </Alert>
      )}
    </Row>
  );
};

export default EditNews;
