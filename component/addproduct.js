import React, { useEffect, useState } from "react";
import PageHeader from "../shared/layout-components/page-header/page-header";
import { Card, Col, FormGroup, Row, Form } from "react-bootstrap";
import Link from "next/link";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Seo from "../shared/layout-components/seo/seo";
import dynamic from "next/dynamic";
const Editer = dynamic(() => import("../shared/data/e-commerce/editer"), {
  ssr: false,
});
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const AddProduct = (props) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
    console.log(files[0]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  const [product, setProduct] = useState(props.data);

  const handleInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "file" ? target.files[0] : target.value;
    console.log(value);
    setProduct({ ...product, [name]: value });
  };

  const postData = async () => {
    // console.log(product)

    setOpen(true);
    var s = "";
    for (const property in product) {
      s += property + ", ";
    }
    console.log(s);

    if (
      !product.name ||
      !product.short_description ||
      !product.description ||
      !product.version ||
      !product.script ||
      !product.trader ||
      !product.market ||
      !product.dashboard ||
      !product.alerts ||
      !product.signal ||
      !product.monthly_price ||
      !product.monthly_price_id ||
      !product.yearly_price ||
      !product.yearly_price_id ||
      !product.lifetime_price ||
      !product.lifetime_price_id ||
      !product.f1_img ||
      !product.f2_img ||
      !product.f3_img ||
      !product.f4_img ||
      !product.f5_img ||
      !product.f1_text ||
      !product.f2_text ||
      !product.f3_text ||
      !product.f4_text ||
      !product.f5_text
    ) {
      setOpen(false);
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
    toast.info("Images starts uploading, please wait!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const imgForm = new FormData();
    imgForm.append("file", product.f1_img);
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
    const img1 = data1.secure_url;
    console.log(data1.secure_url);
    console.log(1);
    imgForm.append("file", product.f2_img);
    const res2 = await fetch(
      "https://api.cloudinary.com/v1_1/dczgaxjjv/image/upload",
      {
        method: "POST",
        body: imgForm,
      }
    );
    const data2 = await res2.json();
    const img2 = data2.secure_url;
    console.log(data2.secure_url);
    console.log(1);
    imgForm.append("file", product.f3_img);
    const res3 = await fetch(
      "https://api.cloudinary.com/v1_1/dczgaxjjv/image/upload",
      {
        method: "POST",
        body: imgForm,
      }
    );
    const data3 = await res3.json();
    const img3 = data3.secure_url;
    console.log(data3.secure_url);
    console.log(1);
    imgForm.append("file", product.f4_img);
    const res4 = await fetch(
      "https://api.cloudinary.com/v1_1/dczgaxjjv/image/upload",
      {
        method: "POST",
        body: imgForm,
      }
    );
    const data4 = await res4.json();
    const img4 = data4.secure_url;
    console.log(data4.secure_url);
    console.log(1);
    imgForm.append("file", product.f5_img);
    const res5 = await fetch(
      "https://api.cloudinary.com/v1_1/dczgaxjjv/image/upload",
      {
        method: "POST",
        body: imgForm,
      }
    );
    const data5 = await res5.json();
    const img5 = data5.secure_url;
    console.log(data5.secure_url);

    const {
      name,
      short_description,
      description,
      version,
      script,
      trader,
      market,
      dashboard,
      alerts,
      signal,
      monthly_price,
      monthly_price_id,
      yearly_price,
      yearly_price_id,
      lifetime_price,
      lifetime_price_id,
      f1_text,
      f2_text,
      f3_text,
      f4_text,
      f5_text,
    } = product;

    console.log(lifetime_price_id, "kjdfbjh");
    const res_data = await fetch("/api/product/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: props.data._id,
        name,
        short_description,
        description,
        version,
        script,
        trader,
        market,
        dashboard,
        alerts,
        signal,
        monthly_price,
        monthly_price_id,
        yearly_price,
        yearly_price_id,
        lifetime_price,
        lifetime_price_id,
        f1_text,
        f2_text,
        f3_text,
        f4_text,
        f5_text,
        img1,
        img2,
        img3,
        img4,
        img5,
      }),
    });
    // console.log(res);
    const response = await res_data.json();
    setOpen(false);
    toast.success("Product added !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    Router.reload();
  };
  const handleLoad = () => {
    Router.reload();
  };
  return (
    <>
      <Seo title="Update Product" />

      <PageHeader
        title="Update Product"
        item="Ecommerce"
        active_item="Update Product"
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
                  <Form.Label className="tx-medium">Indicator Name</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="name"
                    value={product.name}
                    onChange={handleInput}
                    placeholder="Name"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Short Description
                  </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="short_description"
                    value={product.short_description}
                    onChange={handleInput}
                    placeholder="Short Description"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Description
                  </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="description"
                    value={product.description}
                    onChange={handleInput}
                    placeholder="Description"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Version
                  </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="version"
                    value={product.version}
                    onChange={handleInput}
                    placeholder="Version"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Scripts
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="script"
                    value={product.script}
                    onChange={handleInput}
                  >
                    <option label="Choose one"></option>
                    <option value="All Scripts">All Scripts</option>
                    <option value="Index">Index</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Commodity">Commodity</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Forex">Forex</option>
                    <option value="Index/Stocls">Index/Stocls</option>
                    <option value="Index/Stocks/Commodity">
                      Index/Stocks/Commodity
                    </option>
                    <option value="Stocks/Commodity/Forex">
                      Stocks/Commodity/Forex
                    </option>
                    <option value="Stocks/Commodity/Forex/Crypto">
                      Stocks/Commodity/Forex/Crypto
                    </option>
                    <option value="Commodity/Forex">Commodity/Forex</option>
                    <option value="Commodity/Forex/Crypto">
                      Commodity/Forex/Crypto
                    </option>
                  </select>
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Trader
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="trader"
                    value={product.trader}
                    onChange={handleInput}
                  >
                    <option label="Choose one"></option>
                    <option value="Swing">Swing</option>
                    <option value="Scalp">Scalp</option>
                    <option value="Positional">Positional</option>
                    <option value="Investor">Investor</option>
                    <option value="For All">For All</option>
                  </select>
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Market
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="market"
                    value={product.market}
                    onChange={handleInput}
                  >
                    <option label="Choose one"></option>
                    <option value="All Markets">All Markets</option>
                    <option value="United States">United States</option>
                    <option value="Europe">Europe</option>
                    <option value="India">India</option>
                    <option value="Asia">Asia</option>
                  </select>
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Dashboard
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="dashboard"
                    value={product.dashboard}
                    onChange={handleInput}
                  >
                    <option label="Choose one"></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="NA">NA</option>
                  </select>
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Alerts
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="alerts"
                    value={product.alerts}
                    onChange={handleInput}
                  >
                    <option label="Choose one"></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="NA">NA</option>
                  </select>
                </FormGroup>

                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    Indicator Signals
                  </Form.Label>
                  <select
                    className="form-control select2-no-search"
                    name="signal"
                    value={product.signal}
                    onChange={handleInput}
                  >
                    <option label="Choose one"></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="NA">NA</option>
                  </select>
                </FormGroup>

                <FormGroup className="form-group" style={{ display: "flex" }}>
                  <div className="" style={{ width: "30%" }}>
                    <Form.Label className="tx-medium">Monthly price</Form.Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder="Monthly price"
                      name="monthly_price"
                      value={product.monthly_price}
                      onChange={handleInput}
                    />
                  </div>
                  <div
                    className=""
                    style={{ width: "70%", marginLeft: "10px" }}
                  >
                    <Form.Label className="tx-medium">
                      Monthly price id
                    </Form.Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      name="monthly_price_id"
                      value={product.monthly_price_id}
                      onChange={handleInput}
                      placeholder="Monthly price id"
                    />
                  </div>
                </FormGroup>

                <FormGroup className="form-group" style={{ display: "flex" }}>
                  <div className="" style={{ width: "30%" }}>
                    <Form.Label className="tx-medium">Yearly price</Form.Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder="Yearly price"
                      name="yearly_price"
                      value={product.yearly_price}
                      onChange={handleInput}
                    />
                  </div>
                  <div
                    className=""
                    style={{ width: "70%", marginLeft: "10px" }}
                  >
                    <Form.Label className="tx-medium">
                      Yearly price id
                    </Form.Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      name="yearly_price_id"
                      value={product.yearly_price_id}
                      onChange={handleInput}
                      placeholder="Yearly price id"
                    />
                  </div>
                </FormGroup>

                <FormGroup className="form-group" style={{ display: "flex" }}>
                  <div className="" style={{ width: "30%" }}>
                    <Form.Label className="tx-medium">
                      Life time price
                    </Form.Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder="Life time price"
                      name="lifetime_price"
                      value={product.lifetime_price}
                      onChange={handleInput}
                    />
                  </div>
                  <div
                    className=""
                    style={{ width: "70%", marginLeft: "10px" }}
                  >
                    <Form.Label className="tx-medium">
                      Life time price id
                    </Form.Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      name="lifeTime_price_id"
                      value={product.lifetime_price_id}
                      onChange={handleInput}
                      placeholder="Life time price id"
                    />
                  </div>
                </FormGroup>

                <Form.Label className="tx-medium">Features F1 </Form.Label>
                <div
                  className="p-4 border rounded-6 mb-0 form-group "
                  style={{ display: "flex" }}
                >
                  <input
                    className="form-control"
                    style={{ width: "30%", marginRight: "10px" }}
                    type="file"
                    name="f1_img"
                    accept="image/*"
                    onChange={handleInput}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="f1_text"
                    value={product.f1_text}
                    onChange={handleInput}
                    placeholder="F1 Text"
                  />
                </div>

                <Form.Label className="tx-medium">Features F2 </Form.Label>
                <div
                  className="p-4 border rounded-6 mb-0 form-group "
                  style={{ display: "flex" }}
                >
                  <input
                    className="form-control"
                    style={{ width: "30%", marginRight: "10px" }}
                    type="file"
                    name="f2_img"
                    accept="image/*"
                    onChange={handleInput}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="f2_text"
                    value={product.f2_text}
                    onChange={handleInput}
                    placeholder="F1 Text"
                  />
                </div>

                <Form.Label className="tx-medium">Features F3 </Form.Label>
                <div
                  className="p-4 border rounded-6 mb-0 form-group "
                  style={{ display: "flex" }}
                >
                  <input
                    className="form-control"
                    style={{ width: "30%", marginRight: "10px" }}
                    type="file"
                    name="f3_img"
                    accept="image/*"
                    onChange={handleInput}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="f3_text"
                    value={product.f3_text}
                    onChange={handleInput}
                    placeholder="F1 Text"
                  />
                </div>

                <Form.Label className="tx-medium">Features F4 </Form.Label>
                <div
                  className="p-4 border rounded-6 mb-0 form-group "
                  style={{ display: "flex" }}
                >
                  <input
                    className="form-control"
                    style={{ width: "30%", marginRight: "10px" }}
                    type="file"
                    name="f4_img"
                    accept="image/*"
                    onChange={handleInput}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="f4_text"
                    value={product.f4_text}
                    onChange={handleInput}
                    placeholder="F1 Text"
                  />
                </div>

                <Form.Label className="tx-medium">Features F5 </Form.Label>
                <div
                  className="p-4 border rounded-6 mb-0 form-group "
                  style={{ display: "flex" }}
                >
                  <input
                    className="form-control"
                    style={{ width: "30%", marginRight: "10px" }}
                    type="file"
                    name="f5_img"
                    accept="image/*"
                    onChange={handleInput}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="f5_text"
                    value={product.f5_text}
                    onChange={handleInput}
                    placeholder="F1 Text"
                  />
                </div>
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
                  Update it
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
                    onClick={handleLoad}
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
  return {
    props: {
      yes: true,
    },
  };
}

export default AddProduct;
