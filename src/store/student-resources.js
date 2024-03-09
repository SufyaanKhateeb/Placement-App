import axios from "axios";

export const getStudentDetails = async () => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student-application`, {
			withCredentials: true,
		});
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getApplicationComments = async (studentId) => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/application-comments`, {
			withCredentials: true,
			params: {
				studentId: studentId,
			},
		});

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getPolling = (resourceFunction, onDataFunction, options = { delay: 5000 }) => {
	let interval = null;
	const { delay } = options;
	const getResources = (...params) => {
		resourceFunction(...params)
			.then((data) => onDataFunction(data))
			.catch((e) => {
				console.log(e);
			});
	};
	return {
		start: (...params) => {
			getResources(...params);
			interval = setInterval(() => getResources(...params), delay);
		},
		stop: () => {
			clearInterval(interval);
		},
	};
};
