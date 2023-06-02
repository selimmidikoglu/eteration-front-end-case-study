import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/productTypes";
import { BasketProduct } from '../../../types/basketTypes';
import { calculateTotalPrice } from "../../../helpers/product/basketHelpers";



interface BasketReducerState {
    selectedProducts: BasketProduct[],
    totalPrice: number,
}


export const initialState: BasketReducerState = {
    selectedProducts: [],
    totalPrice: 0,
};
const basketSlice = createSlice({
    name: "basket",
    initialState,

    reducers: {
        addToBasket(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const productIndex = state.selectedProducts.findIndex((p) => p.id === parseInt(product.id));
            const productExistInCart = productIndex !== -1;
            // Checking if the product already exist in cart. If does increase if not start with 1 quantitiy.
            const selectedProduct: BasketProduct = {
                id: Number(product.id),
                product,
                quantity: productExistInCart ? state.selectedProducts[productIndex].quantity + 1 : 1,
                totalPrice: parseFloat(product.price),
            };

            const basketProducts = productExistInCart
                ? [
                    ...state.selectedProducts.slice(0, productIndex),
                    selectedProduct,
                    ...state.selectedProducts.slice(productIndex + 1)
                ]
                : [...state.selectedProducts, selectedProduct];

            return {
                ...state,
                selectedProducts: basketProducts,
                totalPrice: calculateTotalPrice(basketProducts),
            };
        },
        changeQuantity(state, action: PayloadAction<{ id: number; operation: string }>) {
            const { id, operation } = action.payload;
            // After mapping if the current quantity of product is 0 remove it by filtering
            const basketProducts = state.selectedProducts
                .map((basketProduct, index) => {
                    if (index === id) {
                        if (operation === "decrease") {
                            return {
                                ...basketProduct,
                                quantity: basketProduct.quantity - 1,
                            };
                        } else {
                            return {
                                ...basketProduct,
                                quantity: basketProduct.quantity + 1,
                            };
                        }
                    }
                    return basketProduct;
                })
                .filter((basketProduct, index) => {
                    return index !== id || basketProduct.quantity > 0;
                });
            const totalPrice = calculateTotalPrice(basketProducts);
            return {
                ...state,
                selectedProducts: basketProducts,
                totalPrice: totalPrice,
            };
        }
    },
});

export const { addToBasket, changeQuantity } = basketSlice.actions;
export default basketSlice.reducer;

