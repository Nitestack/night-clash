import modeSlice from "@actions/mode";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@actions/user";

export const store = configureStore({
    devTools: process.env.NODE_ENV == "development" ? true : false,
    reducer: {
        user: userSlice.reducer,
        mode: modeSlice.reducer
    }
});



export const actions = {
    ...userSlice.actions,
    ...modeSlice.actions
};