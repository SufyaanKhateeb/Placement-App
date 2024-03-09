import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import StudentModal from "./StudentModal";
import axios from "axios";

import face1 from "../../assets/images/faces/face1.jpg";
import { applicationActions } from "../../store/applications-slice";
// import { ProgressBar } from "react-bootstrap";
// import face2 from "../../assets/images/faces/face2.jpg";
// import face3 from "../../assets/images/faces/face3.jpg";
// import face4 from "../../assets/images/faces/face4.jpg";
// import face5 from "../../assets/images/faces/face5.jpg";
// import face6 from "../../assets/images/faces/face6.jpg";
// import face7 from "../../assets/images/faces/face7.jpg";
// import face8 from "../../assets/images/faces/face8.jpg";
// import face9 from "../../assets/images/faces/face9.jpg";

const getFormatedDateTime = (dateString) => {
  const date = new Date(dateString);
	// Format the date components
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
	const day = date.getDate().toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	// Construct the human-readable date and time
	const humanReadableDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return humanReadableDateTime;
};

const StudentTable = () => {
	const data = useSelector((state) => state.applications.studentRegistrationApplications);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const [showStudentModal, setShowStudentModal] = useState(false);
	const [studentModalInfo, setStudentModalInfo] = useState(null);

	const approveApplication = (usn) => {
		dispatch(applicationActions.updateTempStatus({ usn, tempStatus: "approved" }));
	};
	const rejectApplication = (usn) => {
		dispatch(applicationActions.updateTempStatus({ usn, tempStatus: "rejected" }));
	};
	const pendingApplication = (usn) => {
		dispatch(applicationActions.updateTempStatus({ usn, tempStatus: "pending" }));
	};

	const finalize = async (usn) => {
		const userIndex = data.findIndex((element) => element.usn === usn);
		if (userIndex !== -1) {
			const userDetails = data[userIndex];
			if (userDetails.tempStatus === "approved" || userDetails.tempStatus === "rejected") {
				try {
					const { data } = await axios.put(
						`${process.env.REACT_APP_SERVER_URL}/student-applications`,
						{
							applications: [
								{
									id: userDetails._id,
									status: userDetails.tempStatus,
								},
							],
						},
						{
							withCredentials: true,
						}
					);
					getApplicationsData();
				} catch (err) {
					console.log(err);
				}
			}
		}
	};

	const finalizeAll = async () => {
		const details = data.filter((u) => u.status === "pending" && u.tempStatus !== "pending");
		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_SERVER_URL}/student-applications`,
				{
					applications: details.map((applicationDetails) => ({
						id: applicationDetails._id,
						status: applicationDetails.tempStatus,
					})),
				},
				{
					withCredentials: true,
				}
			);
			getApplicationsData();
		} catch (err) {
			console.log(err);
		}
	};

	const onShowStudentModal = (userData) => {
		setShowStudentModal(true);
		setStudentModalInfo(userData);
	};

	const onStudentModalClose = () => {
		setShowStudentModal(false);
		setStudentModalInfo(null);
	};

	const getApplicationsData = useCallback(
		async (initial = false) => {
			try {
				if (initial) {
					setLoading(true);
				}
				const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student-applications`, {
					withCredentials: true,
				});
				if (data && data?.applications) {
					const applications = data.applications;
					dispatch(
						applicationActions.setStudentApplications({
							applications: applications.map((application) => {
								return {
									...application,
									img: face1,
									status: application?.status,
									tempStatus: application?.status,
								};
							}),
						})
					);
				}
				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		},
		[dispatch]
	);

	useEffect(() => {
		getApplicationsData(true);
	}, [getApplicationsData]);

	const finalizeAllActive = useMemo(
		() => !data.filter((u) => u.status === "pending").some((userData) => userData.tempStatus !== "pending"),
		[data]
	);
	const finalizeAllRef = useRef();

	if (loading) return <>Loading...</>;

	return (
		<div>
			<StudentModal showStudentModal={showStudentModal} onClose={onStudentModalClose} studentModalInfo={studentModalInfo} />
			<div className="row ">
				<div className="col-12 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<div
								className="card-title-container"
								style={{
									display: "flex",
									justifyContent: "space-between",
									padding: "15px",
								}}
							>
								<h4 className="card-title">Pending Verifications</h4>
								<OverlayTrigger
									placement="bottom"
									overlay={(props) => (
										<Tooltip id="overlay-example" {...props}>
											Finalize all applications that are not pending
										</Tooltip>
									)}
								>
									<Button
										ref={finalizeAllRef}
										style={{
											width: "16%",
											marginRight: "25px",
										}}
										variant="success"
										className="badge badge-success"
										size="lg"
										disabled={finalizeAllActive}
										onClick={finalizeAll}
									>
										Finalize All
									</Button>
								</OverlayTrigger>
							</div>
							<table className="table table-hover">
								<thead>
									<tr>
										<th> USN </th>
										<th> Name </th>
										<th> Last update Date</th>
										<th> Status </th>
										<th> Set Status </th>
										<th> Finalize </th>
									</tr>
								</thead>
								<tbody>
									{data
										.filter((u) => u.status === "pending")
										.map((userData) => {
											return (
												<tr key={userData.usn}>
													<td>{userData.usn?.slice(-3)}</td>
													<td>
														<div className="d-flex align-items-center" onClick={onShowStudentModal.bind(this, userData)}>
															<img src={userData.img} alt="face" />
															<span className="pl-2">{userData.name}</span>
														</div>
													</td>
													<td>{getFormatedDateTime(userData.updatedAt)}</td>
													<td>
														<div
															className={`badge badge-outline-${userData.tempStatus === "pending" ? "warning" : ""}${
																userData.tempStatus === "approved" ? "success" : ""
															}${userData.tempStatus === "rejected" ? "danger" : ""}`}
														>
															{userData.tempStatus}
														</div>
													</td>
													<td>
														<Dropdown>
															<Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark">
																{userData.tempStatus}
															</Dropdown.Toggle>

															<Dropdown.Menu variant="dark">
																<Dropdown.Item onClick={approveApplication.bind(this, userData.usn)}>
																	Approve
																</Dropdown.Item>
																<Dropdown.Item onClick={rejectApplication.bind(this, userData.usn)}>
																	Reject
																</Dropdown.Item>
																<Dropdown.Item onClick={pendingApplication.bind(this, userData.usn)}>
																	Pending
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
													<td>
														<Button
															variant="success"
															disabled={userData.tempStatus === "pending"}
															onClick={finalize.bind(this, userData.usn)}
														>
															Finalize
														</Button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
						{data.every((userData) => userData.status !== "pending") && (
							<span style={{ margin: "auto auto 25px auto" }}>No Pending Application</span>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-13 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Approved</h4>
						{/* <p className="card-description">
                                {" "}
                                Add className <code>.table-hover</code>
                            </p> */}
						<table className="table table-hover">
							<thead>
								<tr>
									<th>USN</th>
									<th>Name</th>
									<th>Last update Date</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{data
									.filter((u) => u.status === "approved")
									.map((userData) => {
										return (
											<tr key={userData.usn}>
												<td>{userData.usn}</td>
												<td>{userData.name}</td>
												<td>{getFormatedDateTime(userData.updatedAt)}</td>
												<td>
													<label className="badge badge-success">Approved</label>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					{data.every((userData) => userData.status !== "approved") && (
						<span style={{ margin: "auto auto 25px auto" }}>No Approved Application</span>
					)}
				</div>
			</div>
			<div className="col-lg-13 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Rejected</h4>
						{/* <p className="card-description">
                                {" "}
                                Add className <code>.table-hover</code>
                            </p> */}
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>USN</th>
										<th>Name</th>
										<th>Last update Date</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{data
										.filter((u) => u.status === "rejected")
										.map((userData) => {
											return (
												<tr key={userData.usn}>
													<td>{userData.usn}</td>
													<td>{userData.name}</td>
													<td>{getFormatedDateTime(userData.updatedAt)}</td>
													<td>
														<label className="badge badge-danger">Rejected</label>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
					{data.every((userData) => userData.status !== "rejected") && (
						<span style={{ margin: "auto auto 25px auto" }}>No Rejected Application</span>
					)}
				</div>
			</div>
		</div>
	);
};
export default StudentTable;
