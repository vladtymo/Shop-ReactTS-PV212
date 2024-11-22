import { configureStore } from "@reduxjs/toolkit"
import accountSlice from "./account/accountSlice"

export const store = configureStore({
    reducer: {
        account: accountSlice
        // others reducers, slices...
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch