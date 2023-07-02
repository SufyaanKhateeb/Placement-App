import React from "react";

import AppRoutes from "../AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./sidebar/StudentSidebar";
import Footer from "./shared/Footer";

import { Redirect } from "react-router-dom";

const StudentMain = (props) => {
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
                        <Redirect to="/student/profile" />
                    </div>
                    {/* {footerComponent} */}
                </div>
            </div>
        </div>
    );
};

export default StudentMain;
