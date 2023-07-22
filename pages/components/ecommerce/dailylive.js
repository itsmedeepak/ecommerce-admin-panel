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
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';


import Router from "next/router"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const AddProduct = () => {
  const [open, setOpen ]= useState(false)
  const [url, setUrl] = useState("");
  const handleInput = (e)=>{

    setUrl(e.target.value)
    console.log(url)
  }

  const postData = async()=>{
    setOpen(true)

    if(url.length==0){
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
setOpen(false)
return 
    }
    const res = await fetch("/api/addvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url,
        })
    })

    const data = await res.json();
    console.log(data.message);
    if(!data.success){
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
    setOpen(false)
    return 
    }
    if(data.success){
         toast.success(data.message , {
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
    setOpen(false)
    return
  }
  return (
    <>
      <Seo title="Add Product" />

      <PageHeader
        title="Daily Live Session"
        item="Ecommerce"
        active_item="Add Today's video"
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
                  <Form.Label className="tx-medium"> Todays live video url</Form.Label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    name="url"
                    value={url}
                    onChange={handleInput}
                    placeholder="Enter url"
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


export async function getServerSideProps({req, res}) {


  var isLoggedin = false;
    var token = await getCookie('authToken', { req, res })
    //console.log(token)
    if (!token) {
        return {
            redirect: {
              permanent: false,
              destination: "/"
            }
          }
      
    }
    return {
      props: {
        yes:true
      }
    }

    
}

export default AddProduct;
