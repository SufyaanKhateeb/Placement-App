import React from "react";

import AppRoutes from "../AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./sidebar/StudentSidebar";
import Footer from "./shared/Footer";


import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AdminMain = (props) => {

    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                history.push("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:4000/student",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                if (!data.status) {
                    removeCookie("jwt");
                    history.push("/login");
                } else
                    toast(`Hi ${data.user}`, {
                        // theme: "dark",
                    });
            }
        };
        verifyUser();
    }, [cookies, history, removeCookie]);

    const logOut = () => {
        removeCookie("jwt");
        history.push("/login");
    };


    let navbarComponent = !props.isFullPageLayout ? <Navbar /> : "";
    let sidebarComponent = !props.isFullPageLayout ? <Sidebar /> : "";
    let footerComponent = !props.isFullPageLayout ? <Footer /> : "";
    return (
        <div className="container-scroller">
            {sidebarComponent}
            <div className="container-fluid page-body-wrapper">
                {navbarComponent}
                <div className="main-panel">
                    <div className="content-wrapper">
                        <AppRoutes />
                    </div>
                    {footerComponent}
                </div>
            </div>
        </div>
    );
};

export default AdminMain;
