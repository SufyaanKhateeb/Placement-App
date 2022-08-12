import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function JobPosting () {

    const [values, setValues] = useState({
        company: "",
        location: "",
        desc: "",
        role: "",
        link: "",
        deadline: "",
        eligiblity: "",
        ctc:""
     });


    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(values);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/jobpost",
                {
                    ...values,
                }, {
                withCredentials: true,
            });
        }catch (err) {
                console.log(err);
            }
    }   
        return (
            <div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Job Post Template</h4>
                            {/* <p className="card-description"> </p> */}
                            <form className="forms-sample" onSubmit={(e)=>handleSubmit(e)}>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" >Company</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputUsername2" name="company" placeholder="Company Name" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label"  >Job Location</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputConfirmPassword2" placeholder="Location" name="location" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label"  >Description</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputEmail2" placeholder="Description" name="desc" onChange={(e) => handleChange(e)}></Form.Control>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label"  >Role</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputMobile" placeholder="Role" name="role" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label"  >Link</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputPassword2" placeholder="link" name="link" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label"  >Deadline</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputConfirmPassword2" placeholder="Deadline" name="deadline" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label"  >Eligibility</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputConfirmPassword2" placeholder="Eligibility" name="eligibility" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label" >CTC</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputConfirmPassword2" placeholder="CTC" name="ctc" onChange={(e) => handleChange(e)} />
                                    </div>
                                </Form.Group>
                                <button type="submit" className="btn btn-primary mr-2">Add Job Posting</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
// export default JobPosting
