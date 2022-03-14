import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoadingScreen = boolean;

const initialState: LoadingScreen = false;

const loadingSlice = createSlice({
    name: "loading",
    initialState: initialState,
    reducers: {
        showLoadingScreen: (state) => true,
        hideLoadingScreen: (state) => false
    }
});

export default loadingSlice;

export const { showLoadingScreen, hideLoadingScreen } = loadingSlice.actions;