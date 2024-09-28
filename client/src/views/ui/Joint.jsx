import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const Joint = () => {
  const [joints, setJoints] = useState([]);
  const [leftJoint, setLeftJoint] = useState([]);
  const [rightJoint, setRightJoint] = useState([]);
  const [fullJoint, setFullJoint] = useState([]);
  const [totalNews, setTotalNews] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    const handleJoints = async () => {
      let response = await axios.get(
        "http://localhost:5000/news/getnewsjoints"
      );
      setJoints(response.data);

      response = await axios.get(
        "http://localhost:5000/news/getnewsleftjoints"
      );
      setLeftJoint(response.data);

      response = await axios.get(
        "http://localhost:5000/news/getnewsrightjoints"
      );
      setRightJoint(response.data);

      response = await axios.get(
        "http://localhost:5000/news/getnewsFulljoints"
      );
      setFullJoint(response.data);

      response = await axios.get("http://localhost:5000/news/getTotalNews");
      setTotalNews(response.data);

      response = await axios.get("http://localhost:5000/news/getTotalUsers");
      setTotalUsers(response.data);
    };
    handleJoints();
  }, []);

  return (
    <Row>
      <Col lg="4">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Total Users
          </CardTitle>
          <CardBody>
            <h3 style={{ color: "green" }}>
              Total News: {totalNews[0]?.count}
            </h3>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Total Users
          </CardTitle>
          <CardBody>
            <h3 style={{ color: "green" }}>
              Total Users: {totalUsers[0]?.count}
            </h3>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Avg News
          </CardTitle>
          <CardBody>
            <h3 style={{ color: "green" }}>Avg News: 55</h3>
          </CardBody>
        </Card>
      </Col>

      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Inner Joint
          </CardTitle>
          <CardBody className="">
            <div style={{ overflow: "scroll" }}>
              <Table
                bordered
                hover
                width={"100%"}
                className=" overflow-x-scroll"
              >
                <thead>
                  <tr>
                    <th>News ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Poster</th>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {joints.map((item) => {
                    return (
                      <tr>
                        <td>{item.newsId}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.poster}</td>
                        <td>{item.user}</td>
                        <td>{item.createAt}</td>
                        <td>{item.updateAt}</td>
                        <td>{item.userId}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Right Joint
          </CardTitle>
          <CardBody className="">
            <div style={{ overflow: "scroll" }}>
              <Table
                bordered
                hover
                width={"100%"}
                className=" overflow-x-scroll"
              >
                <thead>
                  <tr>
                    <th>News ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Poster</th>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {rightJoint.map((item) => {
                    return (
                      <tr>
                        <td>{item.newsId}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.poster}</td>
                        <td>{item.user}</td>
                        <td>{item.createAt}</td>
                        <td>{item.updateAt}</td>
                        <td>{item.userId}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Left Joint
          </CardTitle>
          <CardBody className="">
            <div style={{ overflow: "scroll" }}>
              <Table
                bordered
                hover
                width={"100%"}
                className=" overflow-x-scroll"
              >
                <thead>
                  <tr>
                    <th>News ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Poster</th>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {leftJoint.map((item) => {
                    return (
                      <tr>
                        <td>{item.newsId}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.poster}</td>
                        <td>{item.user}</td>
                        <td>{item.createAt}</td>
                        <td>{item.updateAt}</td>
                        <td>{item.userId}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Full Joint
          </CardTitle>
          <CardBody className="">
            <div style={{ overflow: "scroll" }}>
              <Table
                bordered
                hover
                width={"100%"}
                className=" overflow-x-scroll"
              >
                <thead>
                  <tr>
                    <th>News ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Poster</th>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {fullJoint.map((item) => {
                    return (
                      <tr>
                        <td>{item.newsId}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.poster}</td>
                        <td>{item.user}</td>
                        <td>{item.createAt}</td>
                        <td>{item.updateAt}</td>
                        <td>{item.userId}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Joint;
