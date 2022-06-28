import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import StudentModal from "./StudentModal";

import face1 from "../../assets/images/faces/face1.jpg";
import face2 from "../../assets/images/faces/face2.jpg";
import face3 from "../../assets/images/faces/face3.jpg";
import face4 from "../../assets/images/faces/face4.jpg";
import face5 from "../../assets/images/faces/face5.jpg";
import face6 from "../../assets/images/faces/face6.jpg";
import face7 from "../../assets/images/faces/face7.jpg";
import face8 from "../../assets/images/faces/face8.jpg";
import face9 from "../../assets/images/faces/face9.jpg";

export class StudentTable extends Component {
    constructor() {
        super();
        this.state = {
            dummydata: [
                {
                    usn: "123",
                    name: "Henry Klein",
                    date: "04 Dec 2019",
                    status: "Pending",
                    tempStatus: "Pending",
                    img: face1,
                },
                {
                    usn: "456",
                    name: "Estella Bryan",
                    date: "11 Dec 2019",
                    status: "Approved",
                    tempStatus: "Approved",
                    img: face2,
                },
                {
                    usn: "789",
                    name: "Lucy Abbott",
                    date: "08 Dec 2019",
                    status: "Rejected",
                    tempStatus: "Rejected",
                    img: face3,
                },
                {
                    usn: "321",
                    name: "Peter Gill",
                    date: "01 Dec 2019",
                    status: "Pending",
                    tempStatus: "Pending",
                    img: face4,
                },
                {
                    usn: "654",
                    name: "Sallie Rayes",
                    date: "24 Dec 2019",
                    status: "Pending",
                    tempStatus: "Pending",
                    img: face5,
                },
                {
                    usn: "987",
                    name: "Rahul Kumar",
                    date: "19 Dec 2019",
                    status: "Pending",
                    tempStatus: "Pending",
                    img: face6,
                },
                {
                    usn: "368",
                    name: "Pawan Kumar",
                    date: "09 Dec 2019",
                    status: "Approved",
                    tempStatus: "Approved",
                    img: face7,
                },
                {
                    usn: "125",
                    name: "Prakhar Gupta",
                    date: "10 Dec 2019",
                    status: "Rejected",
                    tempStatus: "Rejected",
                    img: face8,
                },
                {
                    usn: "709",
                    name: "Shubham Yadav",
                    date: "05 Dec 2019",
                    status: "Rejected",
                    tempStatus: "Rejected",
                    img: face9,
                },
            ],
            showStudentModal: false,
            studentModalInfo: {
                usn: "",
                name: "",
            },
        };
    }
    approveApplication(usn) {
        const userIndex = this.state.dummydata.findIndex(
            (element) => element.usn === usn
        );
        if (userIndex !== -1) {
            let newData = this.state.dummydata;
            newData[userIndex].tempStatus = "Approved";
            this.setState({
                dummydata: newData,
            });
        }
    }
    rejectApplication(usn) {
        const userIndex = this.state.dummydata.findIndex(
            (element) => element.usn === usn
        );
        if (userIndex !== -1) {
            let newData = this.state.dummydata;
            newData[userIndex].tempStatus = "Rejected";
            this.setState({
                dummydata: newData,
            });
        }
    }
    pendingApplication(usn) {
        const userIndex = this.state.dummydata.findIndex(
            (element) => element.usn === usn
        );
        if (userIndex !== -1) {
            let newData = this.state.dummydata;
            newData[userIndex].tempStatus = "Pending";
            this.setState({
                dummydata: newData,
            });
        }
    }

    finalize(usn) {
        const userIndex = this.state.dummydata.findIndex(
            (element) => element.usn === usn
        );
        if (userIndex !== -1) {
            let newData = this.state.dummydata;
            if (
                newData[userIndex].tempStatus === "Approved" ||
                newData[userIndex].tempStatus === "Rejected"
            ) {
                newData[userIndex].status = newData[userIndex].tempStatus;
                this.setState({
                    dummydata: newData,
                });
            }
        }
    }

    finalizeAll() {
        const isAllFinalizable = this.state.dummydata.every(
            (userData) => userData.tempStatus !== "Pending"
        );
        if (isAllFinalizable) {
            this.setState({
                dummydata: this.state.dummydata.map((userData) => {
                    userData.status = userData.tempStatus;
                    return userData;
                }),
            });
        } else {
            console.log("Not finalizable");
        }
    }

    setShowStudentModal(userData, show) {
        if (show == false) {
            this.setState({
                showStudentModal: show,
                studentModalInfo: {
                    usn: "",
                    name: "",
                },
            });
        } else {
            this.setState({
                showStudentModal: show,
                studentModalInfo: {
                    usn: userData.usn,
                    name: userData.name,
                },
            });
        }
    }

    render() {
        return (
            <div>
                <StudentModal
                    showStudentModal={this.state.showStudentModal}
                    setShowStudentModal={this.setShowStudentModal.bind(
                        this,
                        {},
                        false
                    )}
                    studentModalInfo={this.state.studentModalInfo}
                ></StudentModal>
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
                                    <h4 className="card-title">
                                        Pending Verifications
                                    </h4>
                                    <Button
                                        style={{
                                            width: "16%",
                                            marginRight: "25px",
                                        }}
                                        variant="success"
                                        className="badge badge-success"
                                        size="lg"
                                        onClick={this.finalizeAll.bind(this)}
                                    >
                                        Finalize All
                                    </Button>
                                </div>
                                <div className="table-responsive">
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
                                            {this.state.dummydata.map(
                                                (userData) => {
                                                    if (
                                                        userData.status ===
                                                        "Pending"
                                                    ) {
                                                        return (
                                                            <tr
                                                                key={
                                                                    userData.usn
                                                                }
                                                            >
                                                                <td>
                                                                    {
                                                                        userData.usn
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className="d-flex"
                                                                        onClick={this.setShowStudentModal.bind(
                                                                            this,
                                                                            userData,
                                                                            true
                                                                        )}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                userData.img
                                                                            }
                                                                            alt="face"
                                                                        />
                                                                        <span className="pl-2">
                                                                            {
                                                                                userData.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        userData.date
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className={`badge badge-outline-${
                                                                            userData.tempStatus ===
                                                                            "Pending"
                                                                                ? "warning"
                                                                                : ""
                                                                        }${
                                                                            userData.tempStatus ===
                                                                            "Approved"
                                                                                ? "success"
                                                                                : ""
                                                                        }${
                                                                            userData.tempStatus ===
                                                                            "Rejected"
                                                                                ? "danger"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        {
                                                                            userData.tempStatus
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle
                                                                            id="dropdown-button-dark-example1"
                                                                            variant="dark"
                                                                        >
                                                                            {
                                                                                userData.tempStatus
                                                                            }
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu variant="dark">
                                                                            <Dropdown.Item
                                                                                onClick={this.approveApplication.bind(
                                                                                    this,
                                                                                    userData.usn
                                                                                )}
                                                                            >
                                                                                Approve
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={this.rejectApplication.bind(
                                                                                    this,
                                                                                    userData.usn
                                                                                )}
                                                                            >
                                                                                Reject
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={this.pendingApplication.bind(
                                                                                    this,
                                                                                    userData.usn
                                                                                )}
                                                                            >
                                                                                Pending
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        variant="success"
                                                                        onClick={this.finalize.bind(
                                                                            this,
                                                                            userData.usn
                                                                        )}
                                                                    >
                                                                        Finalize
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {this.state.dummydata.every(
                                (userData) => userData.status !== "Pending"
                            ) ? (
                                <span style={{ margin: "auto auto 25px auto" }}>
                                    No Pending Application
                                </span>
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
                                        {this.state.dummydata.map(
                                            (userData) => {
                                                if (
                                                    userData.status ===
                                                    "Approved"
                                                ) {
                                                    return (
                                                        <tr key={userData.usn}>
                                                            <td>
                                                                {userData.usn}
                                                            </td>
                                                            <td>
                                                                {userData.name}
                                                            </td>
                                                            <td>
                                                                {userData.date}
                                                            </td>
                                                            <td>
                                                                <label className="badge badge-success">
                                                                    Approved
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                return "";
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {this.state.dummydata.every(
                            (userData) => userData.status !== "Approved"
                        ) ? (
                            <span style={{ margin: "auto auto 25px auto" }}>
                                No Approved Application
                            </span>
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
                                        {this.state.dummydata.map(
                                            (userData) => {
                                                if (
                                                    userData.status ===
                                                    "Rejected"
                                                ) {
                                                    return (
                                                        <tr key={userData.usn}>
                                                            <td>
                                                                {userData.usn}
                                                            </td>
                                                            <td>
                                                                {userData.name}
                                                            </td>
                                                            <td>
                                                                {userData.date}
                                                            </td>
                                                            <td>
                                                                <label className="badge badge-danger">
                                                                    Rejected
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                return "";
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {this.state.dummydata.every(
                            (userData) => userData.status !== "Rejected"
                        ) ? (
                            <span style={{ margin: "auto auto 25px auto" }}>
                                No Rejected Application
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentTable;
