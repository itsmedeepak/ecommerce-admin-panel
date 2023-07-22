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
            name: "INVOICE",
            selector: row => [row.number],
            cell: row =>
                <div className="font-weight-bold">
                    {row.number}
                </div>,
            sortable: true
        },
        {

            name: "NAME",
            selector: row => [row.name],
            sortable: true,
            cell: row =>
                <div>
                    {getName(row.user_id)}
                </div>
        },
        {
            name: "EMAIL",
            selector: row => [row.customer_email],
            sortable: true,
            cell: row =>
                <div>
                    {row.customer_email}
                </div>
        },


        {
            name: "TRADING VIEW",
            selector: row => [row.user_id],
            sortable: true,
            cell: row =>
                <div>
                    {getTrading(row.user_id)}
                </div>
        },
        {
            name: "TELIGRAM",
            selector: row => [row.user_id],
            cell: row =>
                <div className="d-flex my-auto">
                    {getTelegram(row.user_id)}
                </div>,
            sortable: true,

        },
        {
            name: "DISCORD",
            selector: row => [row.user_id],
            sortable: true,
            cell: row =>
                <div className="font-weight-semibold">
                    {getDiscord(row.user_id)}
                </div>

        },
        {
            name: "WHATSAPP",
            selector: row => [row.user_id],
            sortable: true,
            cell: row =>
                <div className="font-weight-semibold">
                    {getWhatsapp(row.user_id)}
                </div>

        },
        {
            name: "Purchase Data",
            selector: row => [row.purchase_date],
            sortable: true,
            cell: row =>
                <div className="font-weight-semibold">
                    {row.purchase_date}
                </div>

        },
        {
            name: "Expiry Data",
            selector: row => [row.expiry_date],
            sortable: true,
            cell: row =>
                <div className="font-weight-semibold">
                    {row.expiry_date}
                </div>

        },
        {
            name: "STATUS",
            selector: row => [],
            sortable: true,
            cell: row =>
                <div>
                    {
                        !added_by_admin(row.number) && <div>
                            <span className={`status bg-danger`}></span>
                            Not Added
                        </div>
                    }
                    {
                        added_by_admin(row.number) && <div>
                            <span className={`status bg-success`}></span>
                            Added
                        </div>
                    }

                </div>
        },

        // {
        //     name: "ACTIONS",
        //     selector: row => [row.ACTIONS],
        //     sortable: true,
        //     cell: row =>
        //         <div className="button-list" >

        //             <OverlayTrigger
        //                 placement={row.Placement}
        //                 overlay={<Tooltip>ADD</Tooltip>}
        //             >
        //                 <i className="ti ti-files btn"></i>
        //             </OverlayTrigger>
        //             <OverlayTrigger
        //                 placement={row.Placement}
        //                 overlay={<Tooltip> Edit</Tooltip>}
        //             >
        //                 <i className="ti ti-pencil btn"></i>
        //             </OverlayTrigger>

        //         </div>
        // },
        {
            name: "ACTION",
            selector: row => [],
            sortable: true,
            cell: row =>

                <div>
                    {

                        !added_by_admin(row.number) && <div className="button-list text-center" id={row.number} onClick={handleClick} style={{ backgroundColor: "blue", padding: "5px", borderRadius: "5px", color: "white", width: "50px", cursor: "pointer" }}>
                            ADD
                        </div>

                    }
                    {

                        added_by_admin(row.number) && <div className="button-list text-center" id={row.number} onClick={handleRemove} style={{ backgroundColor: "red", padding: "5px", borderRadius: "3px", color: "white", cursor: "pointer" }}>
                            Remove
                        </div>

                    }

                </div>

        },
    ];

    let [data, setData] = useState(props.product)
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

            <PageHeader title="Recently Purchased User" item="Ecommerce" active_item="Users" />

            <div>
                {/* <!-- Row --> */}
                <Row className="row-sm">
                    <Col md={12} lg={12}>
                        <Card className=" custom-card">
                            <Card.Header className=" border-bottom-0 pb-0">
                                <div>
                                    <div className="d-flex">
                                        <label className="main-content-label my-auto pt-2">
                                        Recently Purchased User
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

    // let name, email, item, teligram, whatsapp, discord, tradingView;

    const data = []

    return {
        props: {
            product: JSON.parse(JSON.stringify(orders)),
            form: JSON.parse(JSON.stringify(form)),
            user: JSON.parse(JSON.stringify(user))
        }
    }
}

Orders.layout = "Contentlayout"


export default Orders