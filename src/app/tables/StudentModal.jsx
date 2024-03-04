import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./StudentModal.scss";
import axios from "axios";

const StudentModal = (props) => {
	const { showStudentModal, studentModalInfo, onClose } = props;
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
					id: studentModalInfo._id,
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
					studentId: studentModalInfo._id,
				},
			});
			setComments(data.comments);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}, [studentModalInfo]);

	useEffect(() => {
		if (showStudentModal) {
			getComments();
		}
	}, [showStudentModal, getComments]);

	useEffect(() => {
		// Scroll to the last comment when the component mounts or when new comments are added
		if (lastCommentRef.current) {
			lastCommentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [comments]);

	if (!showStudentModal) return <></>;

	return (
		<Modal
			show={showStudentModal}
			size="lg"
			contentClassName="studentDialog"
			onHide={() => {
				onClose();
			}}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Modal of {studentModalInfo?.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body className="modalBody">
				<h4>Centered Modal</h4>
				<p className="studentInfo">
					His usn is {studentModalInfo?.usn}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere est quidem velit quaerat ipsam
					iure ipsum, veritatis dicta, veniam sit nobis eaque magni dolorum nulla vero, quae delectus facilis architecto. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Corrupti, corporis nam blanditiis praesentium animi nisi numquam. Voluptate, possimus
					maxime, molestiae ea doloribus et pariatur sit soluta aliquid dolorum, rem reiciendis. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Eum voluptates labore distinctio, iure, ratione quod et voluptatem recusandae amet sint at laudantium nesciunt
				</p>
				<div className="commentsContainer">
					<h4 style={{ padding: "0px 4px" }}>Comments</h4>
					<div style={{ display: "flex", flexDirection: "column", overflowY: "auto", gap: 5 }}>
						{loading && "Loading..."}
                        {!comments.length && <p>No comments ☁️</p>}
						{comments.map((c, ind) => {
							return (
								<Card id={c._id} ref={ind === comments.length - 1 ? lastCommentRef : null}>
									<div className="commentCard">
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
			</Modal.Body>
		</Modal>
	);
};

export default StudentModal;
