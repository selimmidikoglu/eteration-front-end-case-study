import { describe, test, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../redux/store/basket/basketSlice";

import Basket from "../components/Basket";
import productSlice from "../redux/store/products/productSlice";

describe("<Basket/>", () => {
  test("changeQuantityProduct updates the quantity", async () => {
    // Create a custom initial state for the basketSlice reducer
    const initialState = {
      basketSlice: {
        selectedProducts: [
          {
            product: { name: "Product 1", price: 20 },
            quantity: 2,
            totalPrice: 20,
            id: 1,
          },
          {
            product: { name: "Product 2", price: 5 },
            quantity: 1,
            totalPrice: 5,
            id: 2,
          },
        ],
        totalPrice: 25,
      },
    };

    // Create a store with the custom initial state
    const store = configureStore({
      reducer: {
        basketSlice: basketSlice,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      // Simulate clicking the decrease button
      const decreaseButtons = screen.queryAllByText("-");
      decreaseButtons.forEach((button) => fireEvent.click(button));

      // Simulate clicking the increase button
      const increaseButtons = screen.queryAllByText("+");
      increaseButtons.forEach((button) => fireEvent.click(button));

      // Simulate clicking checkout button
      const checkoutButton = screen.getByRole("button", { name: "Checkout" });
      fireEvent.click(checkoutButton);
    });
  });
});
