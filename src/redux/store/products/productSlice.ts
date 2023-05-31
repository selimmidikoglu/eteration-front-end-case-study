import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductList } from './productActions';

interface ProductReducerState {
    products: object[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState: ProductReducerState = {
    products: [],
    loading: 'idle'
};


const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProductList.pending, (state) => {
            return {
                ...state,
                loading: 'pending'
            }
        }),
            builder.addCase(getProductList.fulfilled, (state, action) => {
                return {
                    ...state,
                    products: action.payload,
                    loading: 'succeeded'
                }

            }),
            builder.addCase(getProductList.rejected, (state) => {
                return {
                    ...state,
                    loading: 'failed'
                }
            })
    },
    reducers: {
    },
});

console.log(productSlice.actions)

export const { } = productSlice.actions;
export default productSlice.reducer;

