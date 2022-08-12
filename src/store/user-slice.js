import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userType: "student",
        userObj: {},
        isVerified: true,
    },
    reducers: {
        login(state, action) {
            state.userType = action.payload.userType;
        },
        setUserObj(state, action) {
            state.userObj = action.payload;
        },
        setisVerified(state,action){
            state.isVerified = action.payload.isVerified;
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;