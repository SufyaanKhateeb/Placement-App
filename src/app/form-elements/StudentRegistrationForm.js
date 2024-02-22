import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { Spinner } from "react-bootstrap";
import ApplicationForm from "./ApplicationForm";
import VerficationPendingForm from "./VerificationPendingForm";

const refNames = ["fatherName", "motherName", "email", "alternateEmail", "phone", "alternatePhone", "gender", "dob", "diploma", "nationality", "address", "state", "city", "country", "pincode", "cgpa", "backlogs"];

export default function StudentRegister() {
	const [hasApplied, setHasApplied] = useState(false);
	const [values, setValues] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchApplicationDetails = async () => {
			try {
				const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student-application`, {
					withCredentials: true,
				});
				setIsLoading(false);
				if (data) {
					if (data.hasApplied) {
						setHasApplied(data.hasApplied);
						const temp = {};
						for (let refName of refNames) {
							let value = data.application[refName];
							if (refName === "dob") {
								value = value.split("T")[0];
							}
							temp[refName] = value;
						}
						setValues(temp);
						if (data.application.isVerified) {
							dispatch(userActions.setIsVerified(true));
						}
					}
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchApplicationDetails();
	}, [hasApplied, setIsLoading]);

	if (isLoading) return <Spinner animation="border" variant="light" />;

	return hasApplied ? isEditing ? <ApplicationForm refNames={refNames} setHasApplied={setHasApplied} isEditing={isEditing} setIsEditing={setIsEditing} values={values} setValues={setValues} /> : <VerficationPendingForm setIsEditing={setIsEditing} values={values} /> : <ApplicationForm refNames={refNames} setHasApplied={setHasApplied} isEditing={isEditing} setIsEditing={setIsEditing} values={values} setValues={setValues} />;
}
