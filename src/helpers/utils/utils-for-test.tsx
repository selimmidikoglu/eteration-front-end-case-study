import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productSlice from "../../redux/store/products/productSlice";
import basketSlice from "../../redux/store/basket/basketSlice";
import { ReactNode } from "react";
import { dummyStateProductSlice } from "./dummyState";
import { MemoryRouter } from "react-router-dom";
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
  const Wrapper = ({ children }: WrapperProps) => <Provider store={store}>{children}</Provider>;

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
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
const preloadedState = {
  basketSlice: {
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
  },
};
const preloadedStateForProductSlice = dummyStateProductSlice;

export const renderWithProvidersWithBasket = (
  ui: any,
  {
    preloadedState: any = preloadedState,
    store = configureStore({
      reducer: {
        productSlice: productSlice,
        basketSlice: basketSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithProvidersWithProductDummyState = (ui: any, preloadedState: any, currentPage: number) => {
  preloadedState.currentPage = currentPage;
  let store = configureStore({
    reducer: {
      productSlice: productSlice,
    },
    preloadedState: {
      productSlice: preloadedState,
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper }) };
};

export const renderWithChangingPreloadState = (ui: any, preloadedState: any, filterObj: object) => {
  for (const key in filterObj) {
    preloadedState = {
      ...preloadedState,
      [key]: filterObj[key as keyof typeof filterObj],
    };
  }

  let store = configureStore({
    reducer: {
      productSlice: productSlice,
    },
    preloadedState: {
      productSlice: preloadedState,
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper }) };
};

export const renderWithProvidersNoStateDependent = (ui: any) => {
  let store = configureStore({
    reducer: {
      productSlice: productSlice,
      basketSlice: basketSlice,
    },
  });
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper }) };
};
