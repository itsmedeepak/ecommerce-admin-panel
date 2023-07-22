import Link from "next/link";
import React, { useEffect, useState } from "react";
import { server } from "../../../shared/config";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import Seo from "../../../shared/layout-components/seo/seo";
import { connect } from "react-redux";
import { AddToCart } from "../../../shared/redux/actions";
import { Productdata } from "../../../shared/data/e-commerce/productdata";
import img from "../../../public/uploads/1676529836267.png";
import data from "../../../public/assets/img/paypal.png";
import Image from "next/image";
import mongoose from "mongoose";
import Product from "../../../models/productsSchema";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { Card, Col, FormGroup, Row, Form } from "react-bootstrap";
import Updateproduct from "../../../component/updateproduct";
import { useRouter } from "next/router";
import Addproduct from "../../../component/addproduct";
const Products = (props) => {
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);

  console.log(props.product);
  const product = props.product;
  const router = useRouter();

  const handleDelete = async (e) => {
    console.log(e.target.id);
    const id = e.target.id;
    const del = await fetch("/api/product/deleteproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    router.reload();
  };

  const handleActivate = async(e) =>{
    console.log(e.target.id);
    const id = e.target.id;
    const del = await fetch("/api/product/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    router.reload();
  }
  const handleView = (id) => {
    console.log(id);
    setView(true);
    window.scroll(0, 0);
    for (var i = 0; i < product.length; i++) {
      if (id == product[i]._id) {
        setItem(product[i]);
        console.log(product[i]);
        return;
      }
    }
  };
  const handleBY = (e) => {
    console.log(e.target);
  };
  const handleUpdate = (e) => {
    console.log(e.target.id);
    setEdit(true);
    // setView(false)
  };
  const handleLoad = () => {
    router.reload();
  };

  return (
    <>
      <Seo title={"Products"} />
      {edit && <Addproduct data={item}></Addproduct>}
      {!edit && (
        <div className="">
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PageHeader
              title="Products"
              item="Ecommerce"
              active_item="Products"
            />
            {view && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                
                  <div
                    style={{
                      backgroundColor: "blue",
                      width: "100px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      ...(item.isActive ? {display: "none"} : {  })
                    }}
                    onClick={handleActivate}
                    id={item._id}
                    
                  >
                    Activate it
                  </div>
                  <div
                    style={{
                      backgroundColor: "blue",
                      width: "100px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      ...(item.isActive ? {} : { display: "none" })
                    }
                  
                  }
                    onClick={handleActivate}
                    id={item._id}
                    
                  >
                    Deactivate it
                  </div>

                
                <div
                  style={{
                    backgroundColor: "blue",
                    width: "100px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={handleUpdate}
                  id={item._id}
                >
                  Update it
                </div>
                <div
                  style={{
                    backgroundColor: "red",
                    width: "100px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={handleDelete}
                  id={item._id}
                >
                  Delete it
                </div>
              </div>
            )}
          </div>
          {/* <div onClick={handleBY} id = {"hello"}> click me</div> */}
          {view && (
            <div>
              <Row className="row-sm">
                <Col lg={12} md={12}>
                  <Card className="custom-card">
                    <Card.Body>
                      <FormGroup className="form-group">
                        Product Name: {item.name}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Short Description: {item.short_description}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Version: {item.version}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Script: {item.script}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Trader: {item.trader}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Market: {item.market}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Dashboard: {item.dashboard}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Alerts: {item.alerts}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Signal: {item.signal}
                      </FormGroup>
                      <hr></hr>
                      <FormGroup className="form-group">
                        Monthly Price: {item.monthly_price}
                      </FormGroup>

                      <FormGroup className="form-group">
                        Monthly Price ID: {item.monthly_price_id}
                      </FormGroup>
                      <hr></hr>
                      <FormGroup className="form-group">
                        Yearly Price Price: {item.yearly_price}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Yearly Price ID: {item.yearly_price_id}
                        <hr></hr>
                      </FormGroup>
                      <FormGroup className="form-group">
                        Life Time Price: {item.lifetime_price}
                      </FormGroup>
                      <FormGroup className="form-group">
                        Life Time Price ID: {item.lifetime_price_id}
                        <hr></hr>
                      </FormGroup>
                      <FormGroup className="form-group">
                        Feature 1: {item.f1_text}
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Image
                          src={item.img1}
                          alt="img"
                          height={150}
                          width={300}
                        />
                      </FormGroup>
                      <hr></hr>
                      <FormGroup className="form-group">
                        Feature 2: {item.f2_text}
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Image
                          src={item.img2}
                          alt="img"
                          height={150}
                          width={300}
                        />
                      </FormGroup>
                      <hr></hr>
                      <FormGroup className="form-group">
                        Feature 3: {item.f3_text}
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Image
                          src={item.img3}
                          alt="img"
                          height={150}
                          width={300}
                        />
                      </FormGroup>
                      <hr></hr>
                      <FormGroup className="form-group">
                        Feature 4: {item.f4_text}
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Image
                          src={item.img4}
                          alt="img"
                          height={150}
                          width={300}
                        />
                      </FormGroup>
                      <hr></hr>
                      <FormGroup className="form-group">
                        Feature 5: {item.f5_text}
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Image
                          src={item.img5}
                          alt="img"
                          height={150}
                          width={300}
                        />
                      </FormGroup>
                      <hr></hr>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          {!view && (
            <div>
              {/* <!-- Row --> */}
              <div className="row row-sm">
                <div className="">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",

                    }}
                  >
                    {product.map((ele, idx) => {
                      return (
                        <Updateproduct
                          key={idx}
                          data={ele}
                          onClick={handleView}
                          className="item"
                          
                        ></Updateproduct>
                      );
                    })}
                  </div>
                  {/* <nav>
              <ul className="pagination justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link" href="#">
                    Prev
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav> */}
                </div>
                {/* <div className="col-md-4 col-lg-3 col-xl-3">
            <div className="card custom-card">
              <div className="card-body">
                <div className="row row-sm">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                      />
                      <span className="">
                        <button
                          className="btn ripple btn-primary"
                          type="button"
                        >
                          Search
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div> */}
              </div>
              {/* <!-- End Row --> */}
            </div>
          )}
        </div>
      )}
      
    </>
  );
};

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
  // const get1 = await getorder.json()
  // console.log(get1)
  if (mongoose.connections[0].readyState) {
  } else {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");
  }

  const products = await Product.find();
  // console.log(products);
  return { props: { product: JSON.parse(JSON.stringify(products)) } };
}

Products.layout = "Contentlayout";
export default Products;
