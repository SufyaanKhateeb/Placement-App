import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";

import { withTranslation } from "react-i18next";
import Login from "./app/user-pages/Login";

import AdminMain from "./components/AdminMain";
import StudentMain from "./components/StudentMain";
import CompanyMain from "./components/CompanyMain";

class App extends Component {
    state = {
        loggedIn: true,
        userType: 'admin'
    };
    componentDidMount() {
        this.onRouteChanged();
    }
    render() {
        return this.state.loggedIn ? (
            <>
                {this.state.userType === 'admin' && <AdminMain isFullPageLayout={this.state.isFullPageLayout} />}
                {this.state.userType === 'student' && <StudentMain isFullPageLayout={this.state.isFullPageLayout} />}
                {this.state.userType === 'company' && <CompanyMain isFullPageLayout={this.state.isFullPageLayout} />}
            </>
        ) : (
            <Login></Login>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        console.log("ROUTE CHANGED");
        // const { i18n } = this.props;
        const body = document.querySelector("body");
        if (this.props.location.pathname === "/layout/RtlLayout") {
            body.classList.add("rtl");
            // i18n.changeLanguage('ar');
        } else {
            body.classList.remove("rtl");
            // i18n.changeLanguage('en');
        }
        window.scrollTo(0, 0);
        const fullPageLayoutRoutes = [
            "/user-pages/login-1",
            "/user-pages/login-2",
            "/user-pages/register-1",
            "/user-pages/register-2",
            "/user-pages/lockscreen",
            "/error-pages/error-404",
            "/error-pages/error-500",
            "/general-pages/landing-page",
        ];
        if (this.state.loggedIn) {
            for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
                if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
                    this.setState({
                        isFullPageLayout: true,
                    });
                    document
                        .querySelector(".page-body-wrapper")
                        .classList.add("full-page-wrapper");
                    break;
                } else {
                    this.setState({
                        isFullPageLayout: false,
                    });
                    document
                        .querySelector(".page-body-wrapper")
                        .classList.remove("full-page-wrapper");
                }
            }
        }
    }
}

export default withTranslation()(withRouter(App));
