import basketSlice, { addToBasket, changeQuantity, initialState } from "../../redux/store/basket/basketSlice";

import { describe, test, expect } from "vitest";

const product = {
  createdAt: "2022-03-30T05:50:53.201Z",
  name: "Polestar Golf",
  image: "http://placeimg.com/640/480/sports",
  price: "300.00",
  description: "Description",
  model: "Roadster",
  brand: "Tesla",
  id: "1",
};

const stateWithOneProduct = {
  selectedProducts: [
    {
      product: product,
      quantity: 1,
      totalPrice: 300,
      id: 1,
    },
  ],
  totalPrice: 300,
};
const stateOneProductWithQuantityOfTwo = {
  selectedProducts: [
    {
      product: product,
      quantity: 2,
      totalPrice: 300,
      id: 1,
    },
  ],
  totalPrice: 600,
};
const quantityIncreasedState = {
  selectedProducts: [
    {
      product: product,
      quantity: 2,
      totalPrice: 300,
      id: 1,
    },
  ],
  totalPrice: 600,
};
const stateWithTwoProducts = {
  selectedProducts: [
    {
      product: product,
      quantity: 1,
      totalPrice: 300,
      id: 1,
    },
    {
      product: product,
      quantity: 1,
      totalPrice: 300,
      id: 2,
    },
  ],
  totalPrice: 600,
};
const laterStateWithTwoProducts = {
  selectedProducts: [
    {
      product: product,
      quantity: 2,
      totalPrice: 300,
      id: 1,
    },
    {
      product: product,
      quantity: 1,
      totalPrice: 300,
      id: 2,
    },
  ],
  totalPrice: 900,
};
describe("BasketSlice", () => {
  test("initialize slice with initialValue", () => {
    const productSliceInit = basketSlice(initialState, { type: "unknown" });
    expect(productSliceInit).toBe(initialState);
  });
  describe("addToBasket Reducer", () => {
    test("Product added firs time", () => {
      const afterReducerOperation = basketSlice(initialState, addToBasket(product));
      expect(afterReducerOperation.selectedProducts).toEqual([{ product: product, quantity: 1, totalPrice: 300, id: 1 }]);
    });
    test("Product added second time", () => {
      const afterReducerOperation = basketSlice(stateWithOneProduct, addToBasket(product));
      expect(afterReducerOperation).toEqual(stateOneProductWithQuantityOfTwo);
    });
  });
  describe("changeQuantity Reducer", () => {
    test("Increase", () => {
      // id is not product id here; ID is the index of the product in basket.selectedProducts
      const afterReducerOperation = basketSlice(stateWithTwoProducts, changeQuantity({ id: 0, operation: "increase" }));
      expect(afterReducerOperation).toEqual(laterStateWithTwoProducts);
    });
    test("Decrease", () => {
      // id is not product id here; ID is the index of the product in basket.selectedProducts
      const afterReducerOperation = basketSlice(stateWithOneProduct, changeQuantity({ id: 0, operation: "decrease" }));
      expect(afterReducerOperation).toEqual(initialState);
    });
  });
});
