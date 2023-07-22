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
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
// import DataTableExtensions from "react-data-table-component-extensions";
const DataTableExtensions = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import Strategy from "../../../models/manage/strategySchema";
import mongoose from "mongoose";

const AddProduct = (props) => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(true);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDelete = async (e) => {
    setOpen(true);
    const url = e.target.id;
    const res = await fetch("/api/strategy/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
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
    Router.reload();
    return;
  };

  const helper = (data, url) => {
    console.log(data);
    setAdd(false);
    for (var i = 0; i < data.length; i++) {
      if (url == data[i].url) {
        setTitle(data[i].title);
        setDescription(data[i].description);
        setUrl(data[i].url);
      }
    }
  };
  const handleUpdate = async (e) => {
    const url = e.target.id;
    helper(props.strategy, url);
  };

  const postUpdate = async (e)=>{
    // setOpen(true)
    const res = await fetch("/api/strategy/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        title,
        description
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
    Router.reload()
    return;

  }

  

  const columns = [
    {
      name: "URL",
      selector: (row) => [row.url],
      cell: (row) => <div className="font-weight-bold">{row.url}</div>,
      sortable: true,
    },
    {
      name: "TITLE",
      selector: (row) => [row.title],
      sortable: true,
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => [row.description],
      sortable: true,
      cell: (row) => <div style={{padding:"10px"}}>{row.description}</div>,
    },
    {
      name: "ACTION",
      selector: (row) => [],
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex" }}>
          <div
            className="button-list text-center"
            id={row.url}
            onClick={handleUpdate}
            style={{
              backgroundColor: "blue",
              padding: "5px",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
              width: "80px",
            }}
          >
            Update
          </div>

          <div
            className="button-list text-center"
            id={row.url}
            onClick={handleDelete}
            style={{
              backgroundColor: "red",
              padding: "5px",
              borderRadius: "3px",
              color: "white",
              cursor: "pointer",
              marginLeft: "10px",
              width: "80px",
            }}
          >
            Remove
          </div>
        </div>
      ),
    },
  ];

  let [data, setData] = useState(props.strategy);
  var click = (id) => {
    let i = data.filter((e, index) => {
      return e.ID !== id;
    });
    data1 = i;
    setData(i);
    console.log(data1);
  };
  const tableData = {
    columns,
    data,
  };
  const handleurl = (e) => {
    setUrl(e.target.value);
    // console.log(url)
  };

  const handletitle = (e) => {
    setTitle(e.target.value);
    // console.log(url)
  };
  const handledescription = (e) => {
    setDescription(e.target.value);
    // console.log(url)
  };

  const postData = async () => {
    setOpen(true);

    if (url.length == 0) {
      toast("Enter Url !", {
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
    const res = await fetch("/api/strategy/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        title,
        description,
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
    Router.reload();
    return;
  };
  return (
    <>
      <Seo title="Add Product" />

      <PageHeader
        title="Manage Strategy"
        item="Ecommerce"
        active_item="Add strategy video"
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
                  <Form.Label className="tx-medium">
                    {" "}
                    Strategy video url
                  </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="url"
                    value={url}
                    onChange={handleurl}
                    placeholder="Enter url"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Video title </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={handletitle}
                    placeholder="Enter Video url"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Video Description
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="description"
                    value={description}
                    height="60px"
                    onChange={handledescription}
                    placeholder="Enter Description"
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
                {add && (
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
                    Add
                  </div>
                )}
                {!add && (
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
                    onClick={postUpdate}
                  >
                    Update
                  </div>
                )}
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
        <Row className="row-sm">
          <Col md={12} lg={12}>
            <Card className=" custom-card">
              <Card.Header className=" border-bottom-0 pb-0">
                <div>
                  <div className="d-flex">
                    <label className="main-content-label my-auto pt-2">
                      Strategy Video
                    </label>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="table-filter">
                  <Col lg={3}></Col>
                  <Col lg={9} className="d-lg-flex">
                    <div className="d-flex ms-auto mt-4 me-4 mt-lg-0"></div>
                    <div className="d-flex mt-4 mt-lg-0">
                      <div className="filter-group"></div>
                    </div>
                  </Col>
                </Row>

                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    defaultSortAsc={false}
                    pagination
                  />
                </DataTableExtensions>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={postData}
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
  if (mongoose.connections[0].readyState) {
  } else {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");
  }

  const strategy = await Strategy.find();
  const reversedStrategy = strategy.reverse();
  console.log(strategy);
  return {
    props: {
      strategy: JSON.parse(JSON.stringify(reversedStrategy)),
    },
  };
}

export default AddProduct;
