import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user-slice";
import loginReducer from "./login-slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
    },
});

export default store;
