import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Mode = "dark" | "light";

const initialState = "dark";

const modeSlice = createSlice({
    name: "mode",
    initialState: initialState as Mode,
    reducers: {
        loadMode: (state, action: PayloadAction<Mode>) => action.payload,
        changeMode: (state) => state == "dark" ? "light" : "dark"
    }
});

export default modeSlice;

export const { loadMode, changeMode } = modeSlice.actions;