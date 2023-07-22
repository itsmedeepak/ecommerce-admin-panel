import React, { useState } from "react";
import PageHeader from "../../../shared/layout-components/page-header/page-header";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Button,
  Table,
  Dropdown,
  Pagination,
  FormGroup,
  Form,
} from "react-bootstrap";
import user1 from "../../../public/assets/img/users/1.jpg";
import user2 from "../../../public/assets/img/users/2.jpg";
import user3 from "../../../public/assets/img/users/3.jpg";
import user4 from "../../../public/assets/img/users/4.jpg";
import user5 from "../../../public/assets/img/users/5.jpg";
import user6 from "../../../public/assets/img/users/6.jpg";
import user7 from "../../../public/assets/img/users/7.jpg";
import user9 from "../../../public/assets/img/users/9.jpg";
import user12 from "../../../public/assets/img/users/12.jpg";
import user11 from "../../../public/assets/img/users/11.jpg";
import Link from "next/link";
import Seo from "../../../shared/layout-components/seo/seo";

import FormSchema from "../../../models/formSchema";
import User from "../../../models/userSchema";
import Payment from "../../../models/paymentSchema";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useEffect } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";

const Userlist = (props) => {
  const UserlistData = props.user;
  const Router = useRouter() 
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [teligram, setTeligram] = useState("");
  const [discord, setDiscord] = useState("");
  const [tradingview, setTradingview] = useState("");
  const [id, setId] = useState("");
  const helper = (email) => {
    const user = props.user;
    for (var i = 0; i < user.length; i++) {
      if (email == user[i].email) {
        setName(user[i].name);
        setEmail(user[i].email);
        setPhone(user[i].phone);
        setId(user[i]._id);
        return user[i]._id;
      }
    }
  };
  const helper2 = (id) => {

    







    
    const form = props.form;
    for (var i = 0; i < form.length; i++) {
      if (id == form[i].user_id) {
        setTradingview(form[i].tradingView);
        setWhatsapp(form[i].whatsapp);
        setTeligram(form[i].teligram);
        setDiscord(form[i].discord);
        return;
      }
    }
    setTradingview("");
    setWhatsapp("");
    setTeligram("");
    setDiscord("");
  };
  const postUpdate = (e) => {
    setUpdate(true);
    const email = e.target.id;

    console.log(email);
    console.log(props.form);
    const id = helper(email);
    helper2(id);
    window.scroll(0, 0);
  };

  const handleDiscord = (e) => {
    setDiscord(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleTeligram = (e) => {
    setTeligram(e.target.value);
  };
  const handleTradingView = (e) => {
    setTradingview(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleWhatsapp = (e) => {
    setWhatsapp(e.target.value);
  };

  const postUpdateSend = async () => {
    setOpen(true);

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phone,
        name,
        whatsapp,
        teligram,
        tradingview,
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
    Router.reload()
    return;
  };
  const postDelete = async (e) => {
    setOpen(true);
    const email = e.target.id;
    console.log(e.target.id);
    const res = await fetch("/api/user/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
    router.reload();
    return;
  };
  const [data, setdata] = useState(props.user);
  
  const n = data.length-1;
  const pageno = n/10;
  const numbers = [];
  for (let i = 0; i <= pageno; i++) {
    numbers.push(i+1);
  }
  const ed = n<10?n%10:10;
  const [pagedata, setPagedata] = useState(data.slice(0, ed))
  const handlepage = (e)=>{
    const i = e.target.id;
    console.log(e.target.id)
    const st_idx = (i-1)*10;
    const ed = (st_idx+10)<10?(st_idx+10)%10:(st_idx+10);
    setPagedata(data.slice(st_idx, ed))
  }



  
  return (
    <>
      <Seo title="User List" />

      <PageHeader title="UserList" item="AdvancedUI" active_item="UserList" />

      {/* <!--Row--> */}
      {update && (
        <Row className="row-sm">
          <Col lg={12} md={12}>
            <Card className="custom-card">
              <Card.Body>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">
                    {" "}
                    Selected User Email
                  </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="email"
                    disabled={true}
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter email"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Name</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleName}
                    placeholder="Enter name"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Phone no</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={handlePhone}
                    placeholder="Enter phone no"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Trading View</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="tradingview"
                    value={tradingview}
                    onChange={handleTradingView}
                    placeholder="Enter tradingview username"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Teligram</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="teligram"
                    value={teligram}
                    onChange={handleTeligram}
                    placeholder="Enter teligram username"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium"> Discord </Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="discord"
                    value={discord}
                    onChange={handleDiscord}
                    placeholder="Enter discord username"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label className="tx-medium">Whatsapp</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="whatsapp"
                    value={whatsapp}
                    //   height="60px"
                    onChange={handleWhatsapp}
                    placeholder="Enter whatsapp no"
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
                {/* {add && (
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
              )}*/}
                {update && (
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
                    onClick={postUpdateSend}
                  >
                    Update
                  </div>
                )}

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
                  onClick={() => setUpdate(false)}
                >
                  Cancel
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
      <Row className=" row-sm">
        <Col sm={12} md={12} xl={12} lg={12} className="grid-margin">
          <Card className="custom-card">
            <Card.Header className="border-bottom-0 pb-0">
              <div className="d-flex justify-content-between">
                <label className="main-content-label mb-0 pt-1">
                  User Table
                </label>
                <div className="ms-auto float-end">
                  <Dropdown>
                    <Dropdown.Toggle
                      href="#"
                      className="option-dots"
                      variant="default"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-horizontal"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu-end"
                      style={{ marginTop: "0px" }}
                    >
                      <Dropdown.Item href="#">Today</Dropdown.Item>
                      <Dropdown.Item href="#">Last Week</Dropdown.Item>
                      <Dropdown.Item href="#">Last Month</Dropdown.Item>
                      <Dropdown.Item href="#">Last Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive border userlist-table">
                <Table
                  responsive
                  className="card-table table-striped table-vcenter text-nowrap mb-0"
                >
                  <thead>
                    <tr>
                      <th className="wd-lg-8p">
                        <span>User</span>
                      </th>
                      <th className="wd-lg-20p">
                        <span>Name</span>
                      </th>
                      <th className="wd-lg-20p">
                        <span>Phone</span>
                      </th>
                      <th className="wd-lg-20p">
                        <span>Activated</span>
                      </th>
                      <th className="wd-lg-20p">
                        <span>Email</span>
                      </th>
                      <th className="wd-lg-20p">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedata.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            className="rounded-circle avatar-md me-2"
                            alt="avatar"
                            src={"/usr.png"}
                            style={{ backgroundColor: "blue" }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td className="text-center">
                          <span
                            className={`label text-${
                              item.activated ? "active" : "active"
                            } d-flex`}
                          >
                            <span
                            //   className={`dot-label bg-${item.activated?"active":"active"} me-1- 300`}
                            ></span>
                            {item.activated ? "True" : "False"}
                          </span>
                        </td>
                        <td>
                          <Link href="#">{item.email}</Link>
                        </td>
                        <td>
                          <p
                            className="btn btn-sm btn-info me-1"
                            onClick={postUpdate}
                            id={item.email}
                          >
                            <i onClick={postUpdate}
                            id={item.email} className="fe fe-edit-2" ></i>
                          </p>

                          <p
                            className="btn btn-sm btn-danger me-1"
                            onClick={postDelete}
                             id={item.email}
                          >
                            <i onClick={postDelete}
                             id={item.email} className="fe fe-trash"></i>
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* <userlist.PositioningActionsColumn/> */}
              </div>
              <div className="mt-5">

                
                     <Pagination className="mb-0 flex justify-content-end">
                    {
                  numbers.map((i, idx)=>{

                    return <div key = {idx} style={{padding:"10px", cursor:"pointer"}} onClick={handlepage} >
                    
                    <Pagination.Item id = {idx+1}  className="page-item" active>
                        {idx+1}
                      </Pagination.Item>
                      </div>
                    
                  })
                }</Pagination>
                
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- COL END --> */}
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
      {/* <!-- row closed  --> */}
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  if (mongoose.connections[0].readyState) {
  } else {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");
  }
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
  const orders = await Payment.find();
  const user = await User.find();
  const form = await FormSchema.find();

  const data = [];

  return {
    props: {
      isLoggedin: isLoggedin,
      product: JSON.parse(JSON.stringify(orders)),
      form: JSON.parse(JSON.stringify(form)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

Userlist.layout = "Contentlayout";

export default Userlist;
