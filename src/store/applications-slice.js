import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentRegistrationApplications: []
};

const applicationsSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        setStudentApplications(state, action) {
            state.studentRegistrationApplications = action.payload.applications;
        },
        reset() {
            return initialState;
        },
    },
});

export const applicationActions = applicationsSlice.actions;

export default applicationsSlice.reducer;
