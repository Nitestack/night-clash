import modeSlice from "@actions/mode";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    devTools: process.env.NODE_ENV == "development" ? true : false,
    reducer: {
        mode: modeSlice.reducer
    }
});



export const actions = {
    ...modeSlice.actions
};