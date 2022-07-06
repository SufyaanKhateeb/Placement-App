import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userType: "",
        userObj: {}
    },
    reducers: {
        login(state, action) {
            state.userType = action.payload.userType
            state.userObj = action.payload.user
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;