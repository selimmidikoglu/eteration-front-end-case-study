import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"

import productSlice from "./store/products/productSlice";


export const store = configureStore({
    reducer: {
        productSlice: productSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch