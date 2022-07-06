import React from "react";

import AppRoutes from "../AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./sidebar/StudentSidebar";
import Footer from "./shared/Footer";

const AdminMain = (props) => {
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
