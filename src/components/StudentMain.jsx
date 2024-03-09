import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AppRoutes from "../AppRoutes";
import Navbar from "./shared/Navbar";
import Sidebar from "./sidebar/StudentSidebar";
import Footer from "./shared/Footer";

import { Redirect } from "react-router-dom";
import { getStudentDetails } from "../store/student-resources";
import { applicationActions } from "../store/applications-slice";
import { userActions } from "../store/user-slice";

const StudentMain = (props) => {
    const [loading, setLoading] = useState(false);
	const isVerified = useSelector((state) => state.user.isVerified);
	const dispatch = useDispatch();

	let navbarComponent = !props.isFullPageLayout ? <Navbar /> : "";
	let sidebarComponent = !props.isFullPageLayout ? <Sidebar /> : "";
	let footerComponent = !props.isFullPageLayout ? <Footer /> : "";

	useEffect(() => {
		const fetchStudentDetails = async () => {
			const data = await getStudentDetails();
			dispatch(
				applicationActions.setCurrentStudentApplication({
					application: data.application,
				})
			);
            if(data.application.isVerified) {
                dispatch(userActions.setIsVerified(true))
            }
            setLoading(false);
		};
        setLoading(true);
		fetchStudentDetails();
	}, [dispatch]);

    if(loading) return <>Loading...</>

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
