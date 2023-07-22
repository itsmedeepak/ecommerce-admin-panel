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
import Image from "next/image";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import mongoose from "mongoose";
import Chart from "../../../models/manage/chartSchema";




const AddProduct = (props) => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(true);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [script, setScript] = useState("");
  const [type, setType]= useState("");
  const [trend, setTrend]= useState("");

  const handleFile = (event) => {
    setImg(event.target.files[0]);
  };

  const handleDelete = async (e) => {
    setOpen(true);
    const url = e.target.id;
    const res = await fetch("/api/chart/remove", {
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
        setType(data[i].type)
        setTrend(data[i].trend)
        setScript(data[i].script)
      }
    }
  };
  const handleUpdate = async (e) => {
    const url = e.target.id;
    window.scroll(0,0)
    helper(props.strategy, url);
  };

  const postUpdate = async (e) => {
    setOpen(true)
    
    const imgForm = new FormData();
    imgForm.append("file", img);
    imgForm.append("upload_preset", "patalgo");
    imgForm.append("cloud_name", "dczgaxjjv");

    console.log(1);
    const res1 = await fetch(
      "https://api.cloudinary.com/v1_1/dczgaxjjv/image/upload",
      {
        method: "POST",
        body: imgForm,
      }
    );
    const data1 = await res1.json();
    console.log(data1)
    const img1 = data1.secure_url;


    const res = await fetch("/api/chart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url:img1,
        title,
        script,
        type,
        trend,
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

  const columns = [
    {
      name: "IMAGE",
      selector: (row) => [row.url],
      cell: (row) => <div className="font-weight-bold" style={{padding:"10px"}}>{
        <Image src = {row.url} alt="img" width={200} height={120} />
      }</div>,
      sortable: true,
    },
    {
      name: "TITLE",
      selector: (row) => [row.title],
      sortable: true,
      cell: (row) => <div style={{padding:"10px"}}>{row.title}</div>,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => [row.description],
      sortable: true,
      cell: (row) => <div style={{padding:"10px"}}>{row.description.substring(0, 250)}</div>,
    },
    {
      name: "ACTION",
      selector: (row) => [],
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex" }} >
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

    
    if(!img && !title && !description){
        setOpen(false)
       return toast("🦄 Fill all details!", {
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
    const imgForm = new FormData();
    imgForm.append("file", img);
    imgForm.append("upload_preset", "patalgo");
    imgForm.append("cloud_name", "dczgaxjjv");

    console.log(1);
    const res1 = await fetch(
      "https://api.cloudinary.com/v1_1/dczgaxjjv/image/upload",
      {
        method: "POST",
        body: imgForm,
      }
    );
    const data1 = await res1.json();
    console.log(data1)
    const img1 = data1.secure_url;
    // setUrl(img1)

    const res = await fetch("/api/chart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url:img1,
        title,
        script,
        type,
        trend,
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
      <Seo title="Manage Chart" />

      <PageHeader
        title="Manage Chart"
        item="Ecommerce"
        active_item="Chart"
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
                  <Form.Label className="tx-medium"> Chart Title </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={handletitle}
                    placeholder="Enter Chart Title"
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
                    style={{ height: "100px" }}
                    onChange={handledescription}
                    placeholder="Enter Chart Description"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                  Script Name
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="script"
                    value={script}
                    onChange={(e)=> setScript(e.target.value)}
                  >
                    <option label="Choose one"></option>
                    <option value="Nifty">Nifty</option>
                    <option value="BankNifty">BankNifty</option>
                    <option value="FinNifty">FinNifty</option>
                    <option value="Stock">Stocks</option>
                  </select>
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                  Type
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="type"
                    value={type}
                    onChange={(e)=> setType(e.target.value)}
                  >
                    <option label="Choose one"></option>
                    <option value="Index">Index</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Commodity">Commodity</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Forex">Forex</option>
                  </select>
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                  Trend
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="trend"
                    value={trend}
                    onChange={(e)=> setTrend(e.target.value)}
                  >
                    <option label="Choose one"></option>
                    <option value="Up">Up</option>
                    <option value="Down">Down</option>
                    
                  </select>
                </FormGroup>
                <FormGroup className="form-group">
                  <div
                    className="p-4 border rounded-6 mb-0 form-group "
                    style={{ display: "flex" }}
                  >
                    <input
                      className="form-control"
                      type="file"
                      name="f5_img"
                      accept="image/*"
                      onChange={handleFile}
                    />
                  </div>
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
                      Patalgo Chart
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

  const strategy = await Chart.find();
const reversedStrategy = strategy.reverse();
  console.log(strategy);
  return {
    props: {
      strategy: JSON.parse(JSON.stringify(reversedStrategy)),
    },
  };
}

export default AddProduct;
