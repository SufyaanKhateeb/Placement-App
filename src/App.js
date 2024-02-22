import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
import "./App.scss";

// import { withTranslation } from "react-i18next";

import AdminMain from "./components/AdminMain";
import CompanyMain from "./components/CompanyMain";
import StudentMain from "./components/StudentMain";
// import { connect } from "react-redux";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { loginActions } from "./store/login-slice";
import { userActions } from "./store/user-slice";

export default function App() {
	const userType = useSelector((state) => state.user.userType);
	const [isLoading, setIsLoading] = useState(true);
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	const isFullPageLayout = false;
	const dispatch = useDispatch();

	useEffect(() => {
		const getSession = async () => {
			try {
				const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/checkUser`, {
					withCredentials: true,
				});
				dispatch(loginActions.login());
				dispatch(userActions.setUserObj({ user: data.user, userType: data.userType }));
				toast.success("Logged in successfully", {
					position: "bottom-right",
					theme: "dark",
					autoClose: 1500,
				});
			} catch (e) {
				console.log(e);
			}
			setIsLoading(false);
		};

		getSession();
	}, [dispatch]);

	if (isLoading) return <Spinner animation="border" variant="light" />;

	return isLoggedIn ? (
		<>
			{userType === "admin" && <AdminMain isFullPageLayout={isFullPageLayout} />}
			{userType === "student" && <StudentMain isFullPageLayout={isFullPageLayout} />}
			{userType === "company" && <CompanyMain isFullPageLayout={isFullPageLayout} />}
		</>
	) : (
		<>
			<AppRoutes />
		</>
	);
}

// class App extends Component {
//     // componentDidMount() {
//     //     this.onRouteChanged();
//     // }
//     render() {
//         const isFullPageLayout = false;
//         console.log("Inside app.js:", this.props.isLoggedIn, this.props.userType);
//         return this.props.isLoggedIn ? (
//             <>
//                 {this.props.userType === "admin" && (
//                     <AdminMain isFullPageLayout />
//                 )}
//                 {this.props.userType === "student" && (
//                     <StudentMain isFullPageLayout />
//                 )}
//                 {this.props.userType === "company" && (
//                     <CompanyMain isFullPageLayout />
//                 )}
//                 {/* <AppRoutes /> */}
//             </>
//         ) : (
//             <>
//                 <AppRoutes></AppRoutes>
//                 <Redirect to="/login"></Redirect>
//             </>
//         );
//     }

//     // componentDidUpdate(prevProps) {
//     //     if (this.props.location !== prevProps.location) {
//     //         this.onRouteChanged();
//     //     }
//     // }

//     onRouteChanged() {
//         console.log("ROUTE CHANGED");
//         // const { i18n } = this.props;
//         // const body = document.querySelector("body");
//         // if (this.props.location.pathname === "/layout/RtlLayout") {
//         //     body.classList.add("rtl");
//         //     // i18n.changeLanguage('ar');
//         // } else {
//         //     body.classList.remove("rtl");
//         //     // i18n.changeLanguage('en');
//         // }
//         // window.scrollTo(0, 0);
//         // const fullPageLayoutRoutes = [
//         //     "/login",
//         //     "/user-pages/login-2",
//         //     "/register",
//         //     "/user-pages/register-2",
//         //     "/user-pages/lockscreen",
//         //     "/error-pages/error-404",
//         //     "/error-pages/error-500",
//         //     "/general-pages/landing-page",
//         // ];
//         // if (this.props.isLoggedIn) {
//         //     for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
//         //         if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
//         //             this.setState({
//         //                 isFullPageLayout: true,
//         //             });
//         //             document
//         //                 .querySelector(".page-body-wrapper")
//         //                 .classList.add("full-page-wrapper");
//         //             break;
//         //         } else {
//         //             this.setState({
//         //                 isFullPageLayout: false,
//         //             });
//         //             document
//         //                 .querySelector(".page-body-wrapper")
//         //                 .classList.remove("full-page-wrapper");
//         //         }
//         //     }
//         // }
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         userType: state.user.userType,
//         isLoggedIn: state.login.isLoggedIn,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {};
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
