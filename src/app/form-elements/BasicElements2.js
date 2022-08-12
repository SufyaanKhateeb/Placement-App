import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';

export class BasicElements extends Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Form elements </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Forms</a></li>
              <li className="breadcrumb-item active" aria-current="page">Feedback</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Basic form elements</h4>
                <p className="card-description"> Basic form elements </p>
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Name</label>
                    <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputEmail3">Email address</label>
                    <Form.Control type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputPassword4">Password</label>
                    <Form.Control type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleSelectGender">Location</label>
                    <select className="form-control" id="exampleSelectGender">
                      <option>IND</option>
                      <option>ABROAD</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label>File upload</label>
                    <div className="custom-file">
                      <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                      <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputCity1">City</label>
                    <Form.Control type="text" className="form-control" id="exampleInputCity1" placeholder="Location" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleTextarea1">Textarea</label>
                    <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                  </Form.Group>
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button className="btn btn-dark">Cancel</button>
                </form>
              </div>
            </div>
          </div>
                    </div>
        </div>
      
    )
  }
}

export default BasicElements
