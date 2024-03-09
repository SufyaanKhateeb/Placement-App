import Alert from "react-bootstrap/Alert";
import React from "react";
import { useSelector } from "react-redux";

export default function StudentNotRegistered() {
	const applicationStatus = useSelector((state) => state.applications.currentStudentApplication.status || "");

	return (
		<>
			{applicationStatus === "rejected" ? (
				<Alert variant={"danger"}>
					<h3>Application has been rejected please contact admin for further processing</h3>
				</Alert>
			) : (
				<Alert variant={"info"}>
					<h3>
						Please register first by visiting the register page. After the registration is complete and verified by the admin, additional
						functionality will be available for use.
					</h3>
				</Alert>
			)}
		</>
	);
}
