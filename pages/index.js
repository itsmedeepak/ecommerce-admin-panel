import Head from "next/head";
import {
  Button,
  Col,
  Form,
  Row,
  Alert,
  Container,
  Card,
} from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import favicon from "../public/assets/img/brand/favicon.ico";
import { useState } from "react";
import Link from "next/link";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

// import Dashboard from "../pages/components/dashboard/dashboard"
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
// import Router, { useRouter } from "next/router";

//Images
import logolight from "../public/assets/img/brand/logo-light.png";
import user from "../public/assets/img/svgs/user.svg";
import logo from "../public/assets/img/brand/logo.png";
import Image from "next/image";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "admin@testing.com",
    password: "Patalgo123",
  });
  const { email, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  let navigate = useRouter();
  const routeChange = (permission) => {
    let path = permission == 'agent'? `/components/ecommerce/chart/`:`/components/ecommerce/dashboard/`;
    navigate.push(path);
  };

  const Login = async (e) => {
    setOpen(true);
    const email = data.email;
    const pwd = data.password;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pwd,
      }),
    });

    const response = await res.json();
    console.log(response);
    // const secret = process.env.SECRETKEY;
    if (response.success) {
      var permission = email.split("@");
      permission = permission[0];
      setCookie(
        "authToken",
        "jjhkcdbkbjkcbaewfbjavhvwvbec7giL1W4FhhZjhTVXRu7eNuwC3tv9N0mePcIo2pBQkiwc7giL1W4FhhZjhTVXRu7c7giL1W4FhhZjhTVXRu7eNuwC3tv9N0mePcIo2pBQkiddcvndcvmxmc7giL1W4FhhZjhTVXRu7eNuwC3tv9N0mePcIo2pBQki",
        {
          path: "/",
          maxAge: 504000, // Expires after one week
          sameSite: true,
        }
      );
      setCookie("id", permission, {
        path: "/",
        maxAge: 504000, // Expires after one week
        sameSite: true,
      });

      localStorage.setItem(
        "authToken",
        "jjhkcdbkbjkcbaewfbjavhvwvbec7giL1W4FhhZjhTVXRu7eNuwC3tv9N0mePcIo2pBQkiwc7giL1W4FhhZjhTVXRu7c7giL1W4FhhZjhTVXRu7eNuwC3tv9N0mePcIo2pBQkiddcvndcvmxmc7giL1W4FhhZjhTVXRu7eNuwC3tv9N0mePcIo2pBQki"
      );
      localStorage.setItem("id", permission);
      routeChange(permission);
    } else {
      setError("The Auction details did not Match");
    }
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>PatAlgo | Admin</title>
        <meta name="description" content="Patalgo" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <div className="page main-signin-wrapper">
        <Backdrop
          sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>
        <Row className="signpages text-center">
          <Col md={12} style={{maxWidth:"500px", margin:"0 auto"}}>
            <Card>
              <Row className="row-sm">
                <Col lg={12} xl={12} xs={12} sm={12} className="login_form ">
                  <Container fluid>
                    <Row className="row-sm">
                      <Card.Body className="mt-2 mb-2 ">
                        <div className="clearfix"></div>
                        {err && <Alert variant="danger">{err}</Alert>}
                        <Form>
                          <h5 className="text-start mb-2">
                            Sign in to Your Account
                          </h5>
                          <p className="mb-4 text-muted tx-13 ms-0 text-start">
                            This section is dedicated to the administrator of
                            PatAlgo customers please register through Homepage
                          </p>
                          <Form.Group
                            className="text-start form-group"
                            controlId="formEmail"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter your email"
                              name="email"
                              type="text"
                              value={data.email}
                              onChange={changeHandler}
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className="text-start form-group"
                            controlId="formpassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter your password"
                              name="password"
                              type="password"
                              value={data.password}
                              onChange={changeHandler}
                              required
                            />
                          </Form.Group>
                          <Button
                            onClick={Login}
                            className="btn ripple btn-main-primary btn-block mt-2"
                          >
                            Sign In
                          </Button>
                        </Form>
                      </Card.Body>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
Home.layout = "Authenticationlayout";

export default Home;
