import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "../Features/Todo/todoSlice";
import userSlice from "../Features/User/userSlice";

export default configureStore({
    reducer: {
        todos:todoSlice,
        user:userSlice
    }
})