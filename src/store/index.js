import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user-slice";
import loginReducer from "./login-slice";
import applicationReducer from "./applications-slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
        applications: applicationReducer,
    },
});

export default store;
