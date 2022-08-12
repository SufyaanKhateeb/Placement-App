import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";

import { withTranslation } from "react-i18next";
import Login from "./components/user-pages/Login";

import AdminMain from "./components/AdminMain";
import StudentMain from "./components/StudentMain";
import CompanyMain from "./components/CompanyMain";
import {useSelector, connect} from 'react-redux'

class App extends Component {
    state = {
        loggedIn: true,
    };
    componentDidMount() {
        this.onRouteChanged();
    }
    render() {
        
        return this.state.loggedIn ? (
            <>
                {this.props.userType === 'admin' && <AdminMain isFullPageLayout={this.state.isFullPageLayout} />}
                {this.props.userType === 'student' && <StudentMain isFullPageLayout={this.state.isFullPageLayout} />}
                {this.props.userType === 'company' && <CompanyMain isFullPageLayout={this.state.isFullPageLayout} />}
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
            "/login",
            "/user-pages/login-2",
            "/register",
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

const mapStateToProps = (state) => {
    return {
        userType: state.user.userType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
    // return {
        // increment: () => dispatch({ type: "increment" }),
    // };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

// export default compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps)
//   )(App)