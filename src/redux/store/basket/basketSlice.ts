import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/productTypes";
import { BasketProduct } from "../../../types/basketTypes";


interface BasketReducerState {
    selectedProducts: BasketProduct[],
    totalPrice: number,
}

const initialState: BasketReducerState = {
    selectedProducts: [],
    totalPrice: 0,
};

const basketSlice = createSlice({
    name: "basket",
    initialState,

    reducers: {
        addProductToBasket(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const selectedProduct: BasketProduct = {
                id: Number(product.id),
                product: product,
                quantity: 1,
                totalPrice: parseFloat(product.price),
            };
            const basketProducts = [...state.selectedProducts, selectedProduct]
            return {
                ...state,
                selectedProducts: basketProducts
            };
        },
    },
});

export const { addProductToBasket } = basketSlice.actions;
export default basketSlice.reducer;

