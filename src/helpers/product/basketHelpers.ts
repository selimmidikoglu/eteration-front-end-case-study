import { BasketProduct } from "../../types/basketTypes";

export const calculateTotalPrice = (basketProducts: BasketProduct[]): number => {
    let total = 0;
    basketProducts.map((product) => {
        const { price } = product.product;
        const { quantity } = product;
        total += quantity * parseFloat(price);
    })
    return total;
}