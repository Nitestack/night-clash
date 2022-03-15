import errorSlicer from "@actions/error";
import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "@actions/loading";

export const store = configureStore({
    devTools: process.env.NODE_ENV == "development" ? true : false,
    reducer: {
        error: errorSlicer.reducer,
        loading: loadingSlice.reducer
    }
});

export const actions = {
    ...errorSlicer.actions,
    ...loadingSlice.actions
};