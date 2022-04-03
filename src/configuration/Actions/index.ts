import modeSlice from "@actions/mode";
import layoutSlice from "@actions/layout";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    devTools: process.env.NODE_ENV == "development" ? true : false,
    reducer: {
        mode: modeSlice.reducer,
        layout: layoutSlice.reducer
    }
});



export const actions = {
    ...modeSlice.actions,
    ...layoutSlice.actions
};