import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userType: "",
    userObj: {},
    isVerified: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserObj(state, action) {
            state.userObj = action.payload.user;
            state.userType = action.payload.userType;
        },
        setIsVerified(state, action) {
            state.isVerified = action.payload;
        },
        reset() {
            return initialState;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
