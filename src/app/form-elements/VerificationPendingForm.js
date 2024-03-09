import React from "react";
import { Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function VerficationPendingForm(props) {
	const { values } = props;
	const isRejected = values["status"] === "rejected";

	return (
		<div>
			<div className="col-12 grid-margin">
				<div className="card">
					<div className="card-body">
						<form className="form-sample">
							<p className="card-description">Student Details</p>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Father's Name</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["fatherName"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Mother's Name</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["motherName"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Email</label>
										<div className="col-sm-9">
											<Form.Control type="email" value={values["email"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Alternate Email</label>
										<div className="col-sm-9">
											<Form.Control type="email" value={values["alternateEmail"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Phone No.</label>
										<div className="col-sm-9">
											<Form.Control type="tel" pattern="[0-9]{10}" value={values["phone"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Alternate Phone No.</label>
										<div className="col-sm-9">
											<Form.Control type="tel" pattern="[0-9]{10}" value={values["alternatePhone"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Gender</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["gender"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Date of birth</label>
										<div className="col-sm-9">
											<Form.Control type="date" value={values["dob"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Diploma</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["diploma"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Nationality</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["nationality"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Aggregate CGPA</label>
										<div className="col-sm-9">
											<Form.Control type="number" step={0.01} value={values["cgpa"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Active Backlogs</label>
										<div className="col-sm-9">
											<Form.Control type="number" value={values["backlogs"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<p className="card-description">Address Details</p>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Address</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["address"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">City</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["city"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">State</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["state"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Country</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["country"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
								<div className="col-md-6">
									<Form.Group className="row">
										<label className="col-sm-3 col-form-label">Pincode</label>
										<div className="col-sm-9">
											<Form.Control type="text" value={values["pincode"] || ""} disabled />
										</div>
									</Form.Group>
								</div>
							</div>
							{!isRejected && (
								<button
									className="btn btn-primary btn-fw"
									align="right"
									onClick={() => {
										props.setIsEditing(true);
									}}
								>
									Edit Application
								</button>
							)}
							{isRejected && (
								<OverlayTrigger
									placement="right"
									overlay={(overlayProps) => (
										<Tooltip id="overlay-example" {...overlayProps}>
											Application has been rejected. Please contact admin for further processing.
										</Tooltip>
									)}
								>
									<span>
										<button
											className="btn btn-primary btn-fw"
											align="right"
											disabled={values["status"] === "rejected"}
											onClick={() => {
												props.setIsEditing(true);
											}}
										>
											Edit Application
										</button>
									</span>
								</OverlayTrigger>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
