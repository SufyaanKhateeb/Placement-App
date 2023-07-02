import React, { useCallback, useRef, createRef } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function ApplicationForm(props) {
    const refs = useRef({});

    for (let refName of props.refNames) {
        refs.current[refName] = createRef();
        
    }

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            let payload = {};
            for (let refName of props.refNames) {
                payload[refName] = refs.current[refName].current?.value;
            }
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/student-application`,
                    { ...payload },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (data.errors) {
                    toast.error(data.errors.error, {
                        position: "bottom-right",
                        theme: "dark",
                        autoClose: 1500,
                    });
                    throw new Error(data.errors.error);
                }
                if (data.created) {
                    props.setHasApplied(true);
                    const temp = {};
                    for (let refName of props.refNames) {
                        let value = payload[refName];
                        if (refName === "dob") {
                            value = value.split("T")[0];
                        }
                        temp[refName] = value;
                    }
                    props.setValues(temp);
                    props.setIsEditing(false);
                }
            } catch (err) {
                console.log(err);
            }
        },
        [props]
    );
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <form
                            className="form-sample"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <p className="card-description">Student Details</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Father's Name
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["fatherName"]}
                                                defaultValue={
                                                    props.values[
                                                        "fatherName"
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Mother's Name
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["motherName"]}
                                                defaultValue={
                                                    props.values[
                                                        "motherName"
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Email
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="email"
                                                ref={refs.current["email"]}
                                                defaultValue={
                                                    props.values["email"] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Alternate Email
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="email"
                                                ref={
                                                    refs.current[
                                                        "alternateEmail"
                                                    ]
                                                }
                                                defaultValue={
                                                    props.values[
                                                        "alternateEmail"
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Phone No.
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="tel"
                                                pattern="[0-9]{10}"
                                                ref={refs.current["phone"]}
                                                defaultValue={
                                                    props.values["phone"] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Alternate Phone No.
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="tel"
                                                pattern="[0-9]{10}"
                                                ref={
                                                    refs.current[
                                                        "alternatePhone"
                                                    ]
                                                }
                                                defaultValue={
                                                    props.values[
                                                        "alternatePhone"
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Gender
                                        </label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                ref={refs.current["gender"]}
                                                defaultValue={
                                                    props.values["gender"] || ""
                                                }
                                                required
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Date of birth
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="date"
                                                ref={refs.current["dob"]}
                                                defaultValue={
                                                    props.values["dob"] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Diploma
                                        </label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                ref={refs.current["diploma"]}
                                                defaultValue={
                                                    props.values["diploma"] ||
                                                    ""
                                                }
                                                required
                                            >
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Nationality
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={
                                                    refs.current["nationality"]
                                                }
                                                defaultValue={
                                                    props.values[
                                                        "nationality"
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Aggregate CGPA
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="number"
                                                step={0.01}
                                                ref={refs.current["cgpa"]}
                                                defaultValue={
                                                    props.values["cgpa"] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Active Backlogs
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="number"
                                                ref={refs.current["backlogs"]}
                                                defaultValue={
                                                    props.values["backlogs"] ||
                                                    ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            {/* <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Branch
                                            </label>
                                            <div className="col-sm-9">
                                                <select className="form-control">
                                                    <option>
                                                        Biotech Engineering
                                                    </option>
                                                    <option>
                                                        Chemical Engineering
                                                    </option>
                                                    <option>
                                                        Computer Science and
                                                        Engineering
                                                    </option>
                                                    <option>
                                                        Civil Engineering
                                                    </option>
                                                    <option>
                                                        Electronics and
                                                        Communication
                                                    </option>
                                                    <option>
                                                        Electrical Engineering
                                                    </option>
                                                    <option>
                                                        Electronics and
                                                        Instrumentation
                                                    </option>
                                                    <option>
                                                        Electronics and
                                                        Telecommunication
                                                    </option>
                                                    <option>
                                                        Industrial and
                                                        Instrumentation
                                                    </option>
                                                    <option selected>
                                                        Information Science and
                                                        Engineering
                                                    </option>
                                                    <option>
                                                        Mechanical Engineering
                                                    </option>
                                                    <option>
                                                        Medical Electronics
                                                    </option>
                                                </select>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Multiple Attempts
                                            </label>
                                            <div className="col-sm-4">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="ExampleRadio4"
                                                            id="membershipRadios1"
                                                            defaultChecked
                                                        />{" "}
                                                        Yes
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-5">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="ExampleRadio4"
                                                            id="membershipRadios2"
                                                        />{" "}
                                                        No
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div> */}
                            <p className="card-description">Address Details</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Address
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["address"]}
                                                defaultValue={
                                                    props.values["address"] ||
                                                    ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            City
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["city"]}
                                                defaultValue={
                                                    props.values["city"] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            State
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["state"]}
                                                defaultValue={
                                                    props.values["state"] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Country
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["country"]}
                                                defaultValue={
                                                    props.values["country"] ||
                                                    ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Pincode
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                ref={refs.current["pincode"]}
                                                defaultValue={
                                                    props.values["pincode"] ||
                                                    ""
                                                }
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            {/* <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Gap in Education
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Planning for Higher Education
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div> */}
                            {/* <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Your Dream Companies
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Do you want to be an Entrepreneur
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Aadhar No.
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                PAN No.
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Quota
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Postcode
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                12th Percentage
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                10th Percentage
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div> */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-fw"
                                align="right"
                            >
                                Submit
                            </button>
                            {props.isEditing && (
                                <button
                                    className="btn btn-danger btn-fw ml-2"
                                    align="left"
                                    onClick={() => {
                                        props.setIsEditing(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
