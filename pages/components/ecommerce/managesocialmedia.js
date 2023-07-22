import React, { useState } from "react";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import { Card, Col, FormGroup, Row, Form } from "react-bootstrap";
import Link from "next/link";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Seo from "../../../shared/layout-components/seo/seo";
import dynamic from "next/dynamic";
const Editer = dynamic(() => import("../../../shared/data/e-commerce/editer"), {
  ssr: false,
});
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [teligram, setTeligram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [discord, setDiscord] = useState("");

  const [aboutus, setAboutus] = useState("");
  const [tc, setTC] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [refund, setRefund] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  const handleAbout = (e) => {
    setAboutus(e.target.value);
  };
  const handleTc = (e) => {
    setTC(e.target.value);
  };
  const handlePrivacy = (e) => {
    setPrivacy(e.target.value);
  };
  const handleRefund = (e) => {
    setRefund(e.target.value);
  };
  const handleDisclaimer = (e) => {
    setDisclaimer(e.target.value);
  };

  const handleTeligram = (e) => {
    setTeligram(e.target.value);
  };
  const handleDiscord = (e) => {
    setDiscord(e.target.value);
  };
  const handleWhatsapp = (e) => {
    setWhatsapp(e.target.value);
  };

  const postData = async () => {
    setOpen(true);

    if (whatsapp.length == 0 || teligram.length == 0 || discord.length == 0) {
      toast("Please Enter all fields!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
      setOpen(false);
      return;
    }
    const res = await fetch("/api/socialaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        whatsapp,
        teligram,
        discord,
      }),
    });

    const data = await res.json();
    console.log(data.message);
    if (!data.success) {
      toast("🦄 Something went wrong!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setOpen(false);
      return;
    }
    if (data.success) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setOpen(false);
    return;
  };

  const updateData = async (e) => {
    setOpen(true);
    console.log(e.target.id);
    const option = e.target.id;

    var res;
    if (option == "aboutus") {
      if (aboutus.length==0) {
        toast("Please Enter the fields!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpen(false);
        return;
      }
      res = await fetch("/api/manage/updateaboutus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutus,
        }),
      });
    }
    if (option == "disclaimer") {
      if (disclaimer.length == 0) {
        toast("Please Enter the field!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpen(false);
        return;
      }
      res = await fetch("/api/manage/updatedisclaimer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disclaimer,
        }),
      });
    }
    if (option == "privacy") {
      if (privacy.length == 0) {
        toast("Please Enter the field!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpen(false);
        return;
      }
      res = await fetch("/api/manage/updateprivacy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privacy,
        }),
      });
    }
    if (option == "refund") {
      if (refund.length == 0) {
        toast("Please Enter the field!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpen(false);
        return;
      }
      res = await fetch("/api/manage/updaterefund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refund,
        }),
      });
    }
    if (option == "terms") {
      if (tc.length == 0) {
        toast("Please Enter the field!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpen(false);
        return;
      }
      res = await fetch("/api/manage/updateterms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          terms:tc,
        }),
      });
    }

    const data = await res.json();
    console.log(data.message);
    if (!data.success) {
      toast("🦄 Something went wrong!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setOpen(false);
      return;
    }
    if (data.success) {
      toast.success(option + " " + data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setOpen(false);
    return;
  };
  return (
    <>
      <Seo title="Manage PatAlgo" />

      <PageHeader
        title="Manage Patalgo Social Media handle"
        item="Ecommerce"
        active_item="Patalgo"
      />

      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Whastapp Url</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="whatsapp"
                    value={whatsapp}
                    onChange={handleWhatsapp}
                    placeholder="Enter Whatsapp Url"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Teligram url</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="teligram"
                    value={teligram}
                    onChange={handleTeligram}
                    placeholder="Enter Teligram Url"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Discord url</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="discord"
                    value={discord}
                    onChange={handleDiscord}
                    placeholder="Enter Discord Url"
                  />
                </FormGroup>
              </Card.Body>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100px",
                    color: "white",
                    textAlign: "center",
                  }}
                  onClick={postData}
                >
                  Update
                </div>
                <Link
                  href="/components/ecommerce/dashboard/"
                  className="btn btn-danger"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </div>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ====================== */}
        <PageHeader
          title="Patalgo About Us"
          item="Ecommerce"
          active_item="Patalgo"
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    {" "}
                    PatAlgo About Us
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="aboutus"
                    value={aboutus}
                    onChange={handleAbout}
                    placeholder="Enter Patalgo About Us"
                    style={{ height: "100px" }}
                  />
                </FormGroup>
              </Card.Body>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100px",
                    color: "white",
                    textAlign: "center",
                  }}
                  id="aboutus"
                  onClick={updateData}
                >
                  Update
                </div>
                <Link
                  href="/components/ecommerce/dashboard/"
                  className="btn btn-danger"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </div>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
        {/* ================================== */}
        <PageHeader
          title="Patalgo Terms and Conditions"
          item="Ecommerce"
          active_item="Patalgo"
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    {" "}
                    PatAlgo Terms and Conditions
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="terms"
                    value={tc}
                    onChange={handleTc}
                    placeholder="Enter Patalgo Terms and Conditions"
                    style={{ height: "100px" }}
                  />
                </FormGroup>
              </Card.Body>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100px",
                    color: "white",
                    textAlign: "center",
                  }}
                  id="terms"
                  onClick={updateData}
                >
                  Update
                </div>
                <Link
                  href="/components/ecommerce/dashboard/"
                  className="btn btn-danger"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </div>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
        {/* ================================ */}
        <PageHeader
          title="Patalgo Privacy policy"
          item="Ecommerce"
          active_item="Patalgo"
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    {" "}
                    PatAlgo Privacy policy
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="privacy"
                    value={privacy}
                    onChange={handlePrivacy}
                    placeholder="Enter Patalgo Privacy policy"
                    style={{ height: "100px" }}
                  />
                </FormGroup>
              </Card.Body>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100px",
                    color: "white",
                    textAlign: "center",
                  }}
                  id="privacy"
                  onClick={updateData}
                >
                  Update
                </div>
                <Link
                  href="/components/ecommerce/dashboard/"
                  className="btn btn-danger"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </div>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ============================ */}
        <PageHeader
          title="Patalgo Refund policy"
          item="Ecommerce"
          active_item="Patalgo"
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    {" "}
                    PatAlgo Refund policy
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="refund"
                    value={refund}
                    onChange={handleRefund}
                    placeholder="Enter Patalgo Refund policy"
                    style={{ height: "100px" }}
                  />
                </FormGroup>
              </Card.Body>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100px",
                    color: "white",
                    textAlign: "center",
                  }}
                  id="refund"
                  onClick={updateData}
                >
                  Update
                </div>
                <Link
                  href="/components/ecommerce/dashboard/"
                  className="btn btn-danger"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </div>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ======================== */}
        <PageHeader
          title="Patalgo Disclaimer"
          item="Ecommerce"
          active_item="Patalgo"
        />
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    {" "}
                    PatAlgo Disclaimer
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="disclaimer"
                    value={disclaimer}
                    onChange={handleDisclaimer}
                    placeholder="Enter Patalgo Disclaimer"
                    style={{ height: "100px" }}
                  />
                </FormGroup>
              </Card.Body>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "blue",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100px",
                    color: "white",
                    textAlign: "center",
                  }}
                  id="disclaimer"
                  onClick={updateData}
                >
                  Update
                </div>
                <Link
                  href="/components/ecommerce/dashboard/"
                  className="btn btn-danger"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "100px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </div>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Backdrop>
        {/* <!-- End Row --> */}
      </div>
    </>
  );
};

AddProduct.layout = "Contentlayout";

export async function getServerSideProps({ req, res }) {
  var isLoggedin = false;
  var token = await getCookie("authToken", { req, res });
  //console.log(token)
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      yes: true,
    },
  };
}

export default AddProduct;
