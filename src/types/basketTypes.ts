import { Product } from "./productTypes";

export interface BasketProduct {
    product: Product,
    quantity: number,
    totalPrice: number,
    id: number
}