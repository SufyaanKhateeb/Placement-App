import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentStudentApplication: {},
	studentRegistrationApplications: [],
};

const applicationsSlice = createSlice({
	name: "applications",
	initialState,
	reducers: {
		setCurrentStudentApplication(state, action) {
			state.currentStudentApplication = action.payload.application;
		},
		setStudentApplications(state, action) {
			state.studentRegistrationApplications = action.payload.applications;
		},
		updateStatus(state, action) {
			for(const application of action.payload.applications) {
				const ind = state.studentRegistrationApplications.findIndex((element) => element._id === application._id);
				if (ind === -1) continue;
				state.studentRegistrationApplications[ind].status = application.status;
				state.studentRegistrationApplications[ind].tempStatus = application.status;
			}
		},
		updateTempStatus(state, action) {
			const ind = state.studentRegistrationApplications.findIndex((element) => element.usn === action.payload.usn);
			if (ind === -1) return;
			state.studentRegistrationApplications[ind].tempStatus = action.payload.tempStatus;
		},
		reset() {
			return initialState;
		},
	},
});

export const applicationActions = applicationsSlice.actions;

export default applicationsSlice.reducer;
