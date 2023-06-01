import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"

import productSlice from "./store/products/productSlice";
import basketSlice from "./store/basket/basketSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer: {
        productSlice: productSlice,
        basketSlice: basketSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



export const useAppDispatch = () => useDispatch<AppDispatch>()