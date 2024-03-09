import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import ApplicationForm from "./ApplicationForm";
import VerficationPendingForm from "./VerificationPendingForm";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { getApplicationComments, getPolling } from "../../store/student-resources";

const refNames = [
	"fatherName",
	"motherName",
	"email",
	"alternateEmail",
	"phone",
	"alternatePhone",
	"gender",
	"dob",
	"diploma",
	"nationality",
	"address",
	"state",
	"city",
	"country",
	"pincode",
	"cgpa",
	"backlogs",
	"status",
];

function FormCommentSection(props) {
	const applicationDetails = useSelector((state) => state.applications.currentStudentApplication);
	const { _id = "", studentId = "" } = applicationDetails;

	const [loading, setLoading] = useState(false);
	const [comments, setComments] = useState([]);
	const inputRef = useRef();
	const lastCommentRef = useRef();

	const onCommentSubmit = async () => {
		if (!inputRef.current.value) return;
		try {
			setLoading(true);
			const { data } = await axios.put(
				`${process.env.REACT_APP_SERVER_URL}/application-comment`,
				{
					id: _id,
					comment: inputRef.current.value,
				},
				{
					withCredentials: true,
				}
			);
			if (data?.updatedStudentDetails?.comments) setComments(data.updatedStudentDetails.comments);
			inputRef.current.value = "";
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			onCommentSubmit();
		}
	};

	const getComments = useCallback(async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/application-comments`, {
				withCredentials: true,
				params: {
					studentId: studentId,
				},
			});
			if (data.comments) setComments(data.comments);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}, [studentId]);

	const pollComments = getPolling(
		getApplicationComments,
		(data) => {
			if (data.comments) setComments(data.comments);
		},
		{ delay: 2000 }
	);

	useEffect(() => {
		if (studentId) {
			pollComments.start(studentId);
		}
		return () => pollComments.stop();
	}, [pollComments, studentId]);

	return (
		<div className="col-12 grid-margin">
			<div className="commentsContainer">
				<h4 style={{ padding: "0px 4px" }}>Comments</h4>
				<div style={{ display: "flex", flexDirection: "column", overflowY: "auto", gap: 5 }}>
					{loading && "Loading..."}
					{!comments.length && <p>No comments ☁️</p>}
					{comments.map((c, ind) => {
						return (
							<Card id={c._id} ref={ind === comments.length - 1 ? lastCommentRef : null}>
								<div
									style={{
										padding: "10px",
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										gap: "10px",
									}}
								>
									<h6 style={{ margin: 0 }}>{c.authorName}</h6>
									<p style={{ margin: 0 }}>{c.comment}</p>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
			<div style={{ borderRadius: "4px", width: "100%", borderTop: "1px solid rgb(86, 86, 86)", paddingTop: 10, marginTop: "auto" }}>
				<Form.Group>
					<Form.Label>Add comments</Form.Label>
					<div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
						<Form.Control
							disabled={loading}
							style={{ height: "35px" }}
							ref={inputRef}
							onKeyDown={onKeyDown}
							className="commentBoxText"
							as="textarea"
						/>
						<Button
							disabled={loading}
							onClick={onCommentSubmit}
							type="submit"
							className="btn btn-primary btn-rounded btn-icon submitButton"
						>
							<span class="mdi mdi-arrow-up"></span>
						</Button>
					</div>
				</Form.Group>
			</div>
		</div>
	);
}

export default function StudentRegister() {
	const [hasApplied, setHasApplied] = useState(false);
	const application = useSelector((state) => state.applications.currentStudentApplication);
	const [values, setValues] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (Object.keys(application).length) {
			setIsLoading(false);
			setHasApplied(true);
			const temp = {};
			for (let refName of refNames) {
				let value = application[refName];
				if (refName === "dob") {
					value = value.split("T")[0];
				}
				temp[refName] = value;
			}
			setValues(temp);
		}
	}, [application]);

	if (isLoading) return <Spinner animation="border" variant="light" />;

	return (
		<div style={{ maxHeight: "80vh", overflowY: "auto" }}>
			{hasApplied ? (
				<>
					{isEditing ? (
						<ApplicationForm
							refNames={refNames}
							setHasApplied={setHasApplied}
							isEditing={isEditing}
							setIsEditing={setIsEditing}
							values={values}
							setValues={setValues}
						/>
					) : (
						<VerficationPendingForm setIsEditing={setIsEditing} values={values} />
					)}
					<FormCommentSection values={values} />
				</>
			) : (
				<ApplicationForm
					refNames={refNames}
					setHasApplied={setHasApplied}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					values={values}
					setValues={setValues}
				/>
			)}
		</div>
	);
}
