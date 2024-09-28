import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Container, Row } from "reactstrap";

const DetailNews = () => {
  const instance = axios.create({
    headers: { token: localStorage.getItem("token") },
  });
  const { newsId } = useParams();
  const [news, setNews] = useState({ title: "", description: "", poster: "" });
  const fetchNews = async () => {
    const response = await instance.get(`http://localhost:5000/news/${newsId}`);
    setNews(response.data[0]);
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Card>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        {news.title}
      </CardTitle>
      <CardBody className="">
        <Container>
          <Row className="m-3" style={{ fontSize: "25px" }}>
            {news.title}
          </Row>
          <Row className="mt-3">
            <img src={`http://localhost:5000/${news.poster}`} alt="" />
          </Row>
          <Row className="m-3">{news.description}</Row>
        </Container>
      </CardBody>
    </Card>
  );
};

export default DetailNews;
