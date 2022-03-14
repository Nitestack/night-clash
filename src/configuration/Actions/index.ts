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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;