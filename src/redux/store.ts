import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./store/products/productSlice";
import basketSlice from "./store/basket/basketSlice";
import { useDispatch } from "react-redux";

// Load state from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("wholeState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

// Save state to localStorage
export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("wholeState", serializedState);
    } catch (error) {
        throw error;
    }
};

export const store = configureStore({
    reducer: {
        productSlice: productSlice,
        basketSlice: basketSlice,
    },
    preloadedState: loadState(),
});

// Subscribe to store updates and save state to localStorage
store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();