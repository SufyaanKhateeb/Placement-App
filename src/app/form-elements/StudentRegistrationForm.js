import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function StudentRegister() {
    
    const [values, setValues] = useState({ userType: "student", ID: "", password: "" });
   
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/student-application",
                {
                    ...values,
                }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
        } catch (err) {
            console.log(err);
        }
    }

        function handleChange(e) {
            setValues({ ...values, [e.target.name]: e.target.value });
            // console.log(values);
        }


        return (
            <div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            
                            <form className="form-sample" onSubmit={(e)=> handleSubmit(e) }>
                                <p className="card-description">
                                    {" "}
                                    Personal info{" "}
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Name
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" name="name" onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Branch
                                            </label>
                                            <div className="col-sm-9">
                                                <select className="form-control" name="branch" onChange={(e) => handleChange(e)}>
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
                                    {/* <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Last Name
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Father's Name
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Mother's Name
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text"  />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label" >
                                                Email id
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" name="email" onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Alternate Email
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
                                            <label className="col-sm-3 col-form-label" >
                                                Phone No
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" name="phone" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Alternate No
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
                                            <label className="col-sm-3 col-form-label" >
                                                Gender
                                            </label>
                                            <div className="col-sm-9">
                                                <select className="form-control" name="gender" onChange={(e) => handleChange(e)}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label" >
                                                Date of birth
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" name="date" onChange={(e) => handleChange(e)} />
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
                                                <select className="form-control">
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
                                                <Form.Control type="text" />
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
                                {/* <p className="card-description">  </p> */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Address 
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                State 
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
                                                Aggregate CGPA
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" name="cgpa" onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Active Backlogs
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
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
                                <button type="submit" className="btn btn-primary btn-fw" align="right">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

