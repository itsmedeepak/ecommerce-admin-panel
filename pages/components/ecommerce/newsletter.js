import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import PageHeader from '../../../shared/layout-components/page-header/page-header'
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
// import DataTable from "react-data-table-component";
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false })
// import DataTableExtensions from "react-data-table-component-extensions";
const DataTableExtensions = dynamic(() => import('react-data-table-component-extensions'), { ssr: false })
import "react-data-table-component-extensions/dist/index.css";
import Seo from '../../../shared/layout-components/seo/seo';
import Form from "../../../models/formSchema"
import User from '../../../models/userSchema';
import Payment from '../../../models/paymentSchema';
import NewsLetter from '../../../models/newsletter';
import mongoose from 'mongoose';
import Router from "next/router"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';





const Orders = props => {
    // console.log(props.user)

    const getName = (id) => {

        const user = props.user;
        var name;
        user.forEach((e, idx) => {
            if (e._id == id) {
                // console.log(id)
                name = e.name;

            }
        });
        return name;

    }

    const getTrading = (id) => {

        const user = props.form;
        // console.log(user)
        var name;
        for (var i = 0; i < user.length; i++) {
            const t = user[i].user_id;
            // console.log(user[i].user_id, id)

            if (t == id) {
                // console.log(user[i])
                name = user[i].tradingView;
                break;

            }
        }
        return name;

    }
    const getTelegram = (id) => {

        const user = props.form;
        // console.log(user)
        var name;
        for (var i = 0; i < user.length; i++) {
            const t = user[i].user_id;
            // console.log(user[i].user_id, id)

            if (t == id) {
                // console.log(user[i])
                name = user[i].teligram;
                break;

            }
        }
        console.log(name)
        return name;

    }

    const getDiscord = (id) => {

        const user = props.form;



        var name;
        for (var i = 0; i < user.length; i++) {
            const t = user[i].user_id;
            // console.log(user[i].user_id, id)

            if (t == id) {
                // console.log(user[i])
                name = user[i].discord;
                break;

            }
        }
        return name;

    }

    const getWhatsapp = (id) => {

        const user = props.form;
        // console.log(user)
        var name;
        for (var i = 0; i < user.length; i++) {
            const t = user[i].user_id;
            // console.log(user[i].user_id, id)

            if (t == id) {
                // console.log(user[i])
                name = user[i].whatsapp;
                break;

            }
        }
        return name;

    }

    const added_by_admin = (id) => {
        const number = id;
        const product = props.product;
        // console.log(product)
        var name;
        for (var i = 0; i < product.length; i++) {
            

            if (product[i].number == number) {
                console.log(product[i].added_by_admin)
                name = product[i].added_by_admin;
                break;
            }
        }
        return name;
    }
    const handleClick = async (e) => {
        const number = e.target.id;

        console.log(number)

        const res = await fetch("/api/addmember", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                number,
            }),
        });
        // console.log(res);
        const response = await res.json();
        Router.reload()
    }
    const handleRemove = async (e) => {
        const number = e.target.id;

        console.log(number)

        const res = await fetch("/api/removemember", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                number,
            }),
        });
        // console.log(res);
        const response = await res.json();
        Router.reload()
    }

    const columns = [
        {
            name: "EMAIL",
            selector: row => [row.email],
            cell: row =>
                <div className="font-weight-bold">
                    {row.email}
                </div>,
            sortable: true
        },
        
        
    ];

    let [data, setData] = useState(props.newsletter)
    var click = (id) => {
        let i = data.filter((e, index) => {
            return e.ID !== id
        })
        data1 = i
        setData(i)
        console.log(data1)
    }
    const tableData = {
        columns,
        data,
    };
    // console.log(props.product)
    return (
        <>
            <Seo title="Dashboard" />

            <PageHeader title="Newsletter" item="Ecommerce" active_item="newsletter" />

            <div>
                {/* <!-- Row --> */}
                <Row className="row-sm">
                    <Col md={12} lg={12}>
                        <Card className=" custom-card">
                            <Card.Header className=" border-bottom-0 pb-0">
                                <div>
                                    <div className="d-flex">
                                        <label className="main-content-label my-auto pt-2">
                                        NewsLetter
                                        </label>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Row className="table-filter">
                                    <Col lg={3}>
                                    </Col>
                                    <Col lg={9} className="d-lg-flex">
                                        <div className="d-flex ms-auto mt-4 me-4 mt-lg-0"></div>
                                        <div className="d-flex mt-4 mt-lg-0">
                                            <div className="filter-group"></div>
                                        </div>
                                    </Col>
                                </Row>

                                <DataTableExtensions {...tableData} >
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
            </div>
        </>
    )
}

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
    if (mongoose.connections[0].readyState) {

    }
    else {
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.set("strictQuery", true);
        console.log("DB Connected")
    }

    const orders = await Payment.find();
    const user = await User.find();
    const form = await Form.find();
    const newsletter = await NewsLetter.find();
// console.log(newsletter)
    // let name, email, item, teligram, whatsapp, discord, tradingView;

    const data = []

    return {
        props: {
            product: JSON.parse(JSON.stringify(orders)),
            form: JSON.parse(JSON.stringify(form)),
            user: JSON.parse(JSON.stringify(user)),
            newsletter: JSON.parse(JSON.stringify(newsletter))
        }
    }
}

Orders.layout = "Contentlayout"


export default Orders