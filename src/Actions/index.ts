import { errorSlicer } from "./error";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    devTools: true,
    reducer: {
        error: errorSlicer.reducer
    }
});

export const actions = {
    ...errorSlicer.actions
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;