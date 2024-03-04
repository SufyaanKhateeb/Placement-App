import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import StudentModal from "./StudentModal";
import axios from "axios";

import face1 from "../../assets/images/faces/face1.jpg";
import face2 from "../../assets/images/faces/face2.jpg";
import face3 from "../../assets/images/faces/face3.jpg";
import face4 from "../../assets/images/faces/face4.jpg";
import face5 from "../../assets/images/faces/face5.jpg";
import face6 from "../../assets/images/faces/face6.jpg";
import face7 from "../../assets/images/faces/face7.jpg";
import face8 from "../../assets/images/faces/face8.jpg";
import face9 from "../../assets/images/faces/face9.jpg";

const StudentTable = () => {
	const [data, setData] = useState([
		{
			usn: "123",
			name: "Henry Klein",
			date: "04 Dec 2019",
			status: "Pending",
			tempStatus: "Pending",
			img: face1,
		},
	]);
	const [loading, setLoading] = useState(true);
	const [showStudentModal, setShowStudentModal] = useState(false);
	const [studentModalInfo, setStudentModalInfo] = useState(null);

	const approveApplication = (usn) => {
		const userIndex = data.findIndex((element) => element.usn === usn);
		if (userIndex !== -1) {
			setData((prevData) => {
				let newData = [...prevData];
				newData[userIndex].tempStatus = "Approved";
				return newData;
			});
		}
	};
	const rejectApplication = (usn) => {
		const userIndex = data.findIndex((element) => element.usn === usn);
		if (userIndex !== -1) {
			setData((prevData) => {
				let newData = [...prevData];
				newData[userIndex].tempStatus = "Rejected";
				return newData;
			});
		}
	};
	const pendingApplication = (usn) => {
		const userIndex = data.findIndex((element) => element.usn === usn);
		if (userIndex !== -1) {
			setData((prevData) => {
				let newData = [...prevData];
				newData[userIndex].tempStatus = "Pending";
				return newData;
			});
		}
	};

	const finalize = (usn) => {
		const userIndex = data.findIndex((element) => element.usn === usn);
		if (userIndex !== -1) {
			if (data[userIndex].tempStatus === "Approved" || data[userIndex].tempStatus === "Rejected") {
				setData((prevData) => {
					let newData = [...prevData];
					newData[userIndex].status = newData[userIndex].tempStatus;
					return newData;
				});
			}
		}
	};

	const finalizeAll = () => {
		const isAllFinalizable = data.every((userData) => userData.tempStatus !== "Pending");
		if (isAllFinalizable) {
			setData((prevData) => {
				const newData = prevData.map((userData) => {
					userData.status = userData.tempStatus;
					return userData;
				});
				return newData;
			});
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student-applications`, {
					withCredentials: true,
				});
				// const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/application-comments`,{
                //     params: {
                //         studentId: data.applications[0]._id,
                //     },
                //     withCredentials: true,
                // });
				if (data && data?.applications) {
					const applications = data.applications;
					setData(
						applications.map((application) => {
							return {
								...application,
								status: application?.isVerified ? "Approved" : "Pending",
							};
						})
					);
				}
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		setLoading(true);
		fetchData();
	}, []);

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
								<Button
									style={{
										width: "16%",
										marginRight: "25px",
									}}
									variant="success"
									className="badge badge-success"
									size="lg"
                                    disabled={data.every((userData) => userData.tempStatus !== "Pending")}
									onClick={finalizeAll}
								>
									Finalize All
								</Button>
							</div>
							<table className="table table-hover">
								<thead>
									<tr>
										<th> USN </th>
										<th> Name </th>
										<th> Application Date</th>
										<th> Status </th>
										<th> Set Status </th>
										<th> Finalize </th>
									</tr>
								</thead>
								<tbody>
									{data
										.filter((u) => u.status === "Pending")
										.map((userData) => {
											return (
												<tr key={userData.usn}>
													<td>{userData.usn}</td>
													<td>
														<div className="d-flex" onClick={onShowStudentModal.bind(this, userData)}>
															<img src={userData.img} alt="face" />
															<span className="pl-2">{userData.name}</span>
														</div>
													</td>
													<td>{userData.date}</td>
													<td>
														<div
															className={`badge badge-outline-${userData.tempStatus === "Pending" ? "warning" : ""}${
																userData.tempStatus === "Approved" ? "success" : ""
															}${userData.tempStatus === "Rejected" ? "danger" : ""}`}
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
														<Button variant="success" onClick={finalize.bind(this, userData.usn)}>
															Finalize
														</Button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
						{data.every((userData) => userData.status !== "Pending") ? (
							<span style={{ margin: "auto auto 25px auto" }}>No Pending Application</span>
						) : (
							""
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
									<th>Application Date</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{data
									.filter((u) => u.status === "Approved")
									.map((userData) => {
										return (
											<tr key={userData.usn}>
												<td>{userData.usn}</td>
												<td>{userData.name}</td>
												<td>{userData.date}</td>
												<td>
													<label className="badge badge-success">Approved</label>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					{data.every((userData) => userData.status !== "Approved") ? (
						<span style={{ margin: "auto auto 25px auto" }}>No Approved Application</span>
					) : (
						""
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
										<th>Application Date</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{data
										.filter((u) => u.status === "Rejected")
										.map((userData) => {
											return (
												<tr key={userData.usn}>
													<td>{userData.usn}</td>
													<td>{userData.name}</td>
													<td>{userData.date}</td>
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
					{data.every((userData) => userData.status !== "Rejected") ? (
						<span style={{ margin: "auto auto 25px auto" }}>No Rejected Application</span>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};
export default StudentTable;
