import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReduxError {
    //Status Code
    title: string;
    description: string;
    showModal: boolean;
};

const initialState: ReduxError = {
    title: "",
    description: "",
    showModal: false
};

const errorSlicer = createSlice({
    name: "error",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            return {
                ...state,
                showModal: false
            };
        },
        displayError: (state, action: PayloadAction<Partial<ReduxError> & { type: "INTERNAL_SERVER_ERROR" | "BAD_REQUEST" | "CUSTOM_ERROR" }>) => {
            const { type, title, description } = action.payload;
            return {
                title: title ? title : type == "INTERNAL_SERVER_ERROR" ? "Internal Server Error" : (type == "BAD_REQUEST" ? "Bad Request" : "Error"),
                description: description ? description : type == "INTERNAL_SERVER_ERROR" ? "An error happened on the server! Please try again!" : (type == "BAD_REQUEST" ? "Something went wrong! Please try again!" : "An error occurred! Please try again!"),
                showModal: true
            };
        }
    }
});

export default errorSlicer;

export const { clearError, displayError } = errorSlicer.actions;