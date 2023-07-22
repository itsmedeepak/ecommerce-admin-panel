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
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const postData =  () => {
    setOpen(true);
    console.log("hello")

    setTimeout(() => {
        router.push("/components/ecommerce/dashboard")
      }, 5000);

    setOpen(false);
    
    return;
  };
  return (
    <>
      <Seo title="PatAlgo Report" />

      <PageHeader
        title="Download Report"
        item="Ecommerce"
        active_item="Report"
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
              <Link href="/api/downloadExcel">
                <div
                  className="card-footer"
                  style={{
                    display: "flex",
                    //   width: "300px",
                    justifyContent: "center",
                    height: "500px",
                    alignItems: "center",
                    
                  }}
                  onClick={postData}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: "blue",
                      borderRadius: "8px",
                      padding: "8px",
                      width: "250px",
                      color: "white",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    
                  >
                    Download Report
                  </div>
                </div>
              </Link>
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
