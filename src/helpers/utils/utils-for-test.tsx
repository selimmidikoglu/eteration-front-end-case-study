import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productSlice from "../../redux/store/products/productSlice";
import basketSlice from "../../redux/store/basket/basketSlice";
import { ReactNode } from "react";
// As a basic setup, import your same slice reducers

type WrapperProps = {
  children: ReactNode;
};

export const renderWithProviders = (
  ui: any,
  {
    preloadedState: any = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        productSlice: productSlice,
        basketSlice: basketSlice,
      },
      //   preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
