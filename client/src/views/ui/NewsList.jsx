import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  PaginationItem,
  Pagination,
  PaginationLink,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [Search, setSearch] = useState("");
  const instance = axios.create({
    headers: { token: localStorage.getItem("token") },
  });
  const [pageNumber, setPageNumber] = useState(1);
  const fetchNews = async () => {
    try {
      const respnse = await instance.get(
        `http://localhost:5000/news?search=${Search}&page=${pageNumber}`
      );

      setNews(respnse.data);
      console.log(respnse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = setTimeout(() => {
      fetchNews();
    }, 800);
    console.log(pageNumber);
    return () => clearTimeout(getData);
  }, [Search, setSearch, setPageNumber, pageNumber]);

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          News
        </CardTitle>
        <CardBody className="">
          <Container>
            <Row className="mt-3">
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Search</Label>
                  <Input
                    id="Search"
                    name="Search"
                    placeholder="Search"
                    type="text"
                    value={Search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPageNumber(1);
                    }}
                  />
                </FormGroup>
              </Form>
            </Row>
            <Row className="mt-3">
              {news.map((item, index) => {
                return (
                  <Col sm="6" lg="6" xl="3" key={index}>
                    <Blog
                      title={item.title}
                      text={item.description}
                      delete={item.newsId}
                      image={`http://localhost:5000/${item.poster}`}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </CardBody>
      </Card>
      <Row>
        <Col lg="12" style={{ display: "flex", justifyContent: "center" }}>
          <Pagination>
            <PaginationItem>
              <PaginationLink first onClick={() => setPageNumber(1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber)
                }
                previous
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPageNumber(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPageNumber(2)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPageNumber(3)}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPageNumber(4)}>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPageNumber(5)}>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setPageNumber(pageNumber + 1)}
                next
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setPageNumber(pageNumber + 2)}
                last
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default News;
