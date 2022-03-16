import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReduxUser = {
    dbUser?: any,
    loading?: boolean,
    error?: unknown
};

const initialState: ReduxUser = { dbUser: null };

const userSlice = createSlice({
    name: "user",
    initialState: initialState as ReduxUser,
    reducers: {
        loadUserRequest() {
            return {
                loading: true
            };
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                dbUser: action.payload
            };
        },
        loadUserFail(state, action) {
            return {
                loading: false,
                error: action.payload
            };
        }
    }
});

export default userSlice;