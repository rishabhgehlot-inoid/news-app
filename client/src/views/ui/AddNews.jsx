import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  ToastHeader,
} from "reactstrap";

const AddNews = () => {
  const instance = axios.create({
    headers: { token: localStorage.getItem("token") },
  });
  const [news, setNews] = useState({
    title: "",
    description: "",
    poster: "",
  });
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  async function handleSubmit() {
    const url = "http://localhost:5000/news";
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
      await instance.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
      setNews({ title: "", description: "", poster: "" });
      setAlertMessage({
        message: "News successfully created",
        type: "success",
      });
      setAlertShow(true);
    } catch (error) {
      // console.log(error.response.data.errors[0].msg);
      // toast.error(error.response.data.errors[0].msg, {
      //   position: "bottom-right",
      // });
      toast.error(error.response.data.error[0].message, {
        position: "bottom-right",
      });
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
      <ToastHeader />
    </Row>
  );
};

export default AddNews;
