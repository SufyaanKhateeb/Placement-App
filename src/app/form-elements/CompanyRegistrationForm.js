import React, { Component } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";

export class CompanyRegistrationForm extends Component {
    state = {
        startDate: new Date(),
    };

    handleChange = (date) => {
        this.setState({
            startDate: date,
        });
    };

    componentDidMount() {
        bsCustomFileInput.init();
    }

    render() {
        return (
            <div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">
                                Horizontal Two column
                            </h4>
                            <form className="form-sample">
                                <p className="card-description">
                                    {" "}
                                    Personal info{" "}
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                First Name
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Last Name
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
                                                Gender
                                            </label>
                                            <div className="col-sm-9">
                                                <select className="form-control">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Date of Birth
                                            </label>
                                            <div className="col-sm-9">
                                                <DatePicker
                                                    className="form-control w-100"
                                                    selected={
                                                        this.state.startDate
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
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
                                                        s Science and
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
                                                Membership
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
                                                        Free
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
                                                        Proffessional
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <p className="card-description"> Address </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Address 1
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                State 1
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
                                                Address 2
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
                                                Cirt
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control type="text" />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Country
                                            </label>
                                            <div className="col-sm-9">
                                                <select className="form-control">
                                                    <option>America</option>
                                                    <option>Italy</option>
                                                    <option>Russia</option>
                                                    <option>Britain</option>
                                                </select>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyRegistrationForm;
