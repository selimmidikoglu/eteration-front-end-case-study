import { configureStore } from "@reduxjs/toolkit";
import { describe, test, expect, vi, beforeEach } from "vitest";
import productSlice from "../../redux/store/products/productSlice";
import {
  getBrandFilteredProducts,
  getModelFilteredProducts,
  getProductById,
  getProductList,
  getSortByProductList,
} from "../../redux/store/products/productActions";
import axios from "axios";

vi.mock("axios");
function getTotalPageCount() {
  return 1;
}

describe("Product Thunk Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("getProductList success", async () => {
    const mockData = ["item1", "item2", "item3"];
    const mockTotalPageNumber = 1;

    axios.get.mockResolvedValue({
      data: mockData,
    });

    vi.fn(getTotalPageCount).mockReturnValue(mockTotalPageNumber);
    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getProductList(null));
    const { data, totalPageNumber } = result.payload;

    expect(data).toEqual(mockData);
    expect(totalPageNumber).toBe(mockTotalPageNumber);
  });
  test("getProductList fail", async () => {
    const mockData = ["item1", "item2", "item3"];
    const mockTotalPageNumber = 1;

    axios.get.mockRejectedValue({
      data: mockData,
    });

    vi.fn(getTotalPageCount).mockReturnValue(mockTotalPageNumber);
    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getProductList(null));
    const { data, totalPageNumber } = result.payload;
    expect(data).toBeFalsy();
    expect(totalPageNumber).toBeFalsy();
  });
  test("getSortByProductList success", async () => {
    const mockData = ["item1", "item2", "item3"];
    axios.get.mockResolvedValue({
      data: mockData,
    });
    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getSortByProductList(null));
    const { data } = result.payload;

    expect(data).toEqual(mockData);
  });
  test("getSortByProductList fail", async () => {
    const mockData = ["item1", "item2", "item3"];
    axios.get.mockRejectedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getSortByProductList(null));
    const { data } = result.payload;

    expect(data).toBeFalsy();
  });
  test("getProductById success", async () => {
    const mockData = "item1";

    axios.get.mockResolvedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getProductById(null));
    const { data } = result.payload;

    expect(data).toEqual(mockData);
  });

  test("getProductById fail", async () => {
    const mockData = "item1";
    axios.get.mockRejectedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getProductById(null));
    const { data } = result.payload;

    expect(data).toBeFalsy();
  });

  test("getBrandFilteredProducts success", async () => {
    const mockData = ["item1"];
    const mockTotalPageNumber = 1;
    vi.fn(getTotalPageCount).mockReturnValue(mockTotalPageNumber);
    axios.get.mockResolvedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getBrandFilteredProducts("Mercedes"));
    const { data } = result.payload;
    expect(data).toEqual(mockData);
  });

  test("getBrandFilteredProducts fail", async () => {
    const mockData = "item1";
    axios.get.mockRejectedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    const result = await store.dispatch(getBrandFilteredProducts(null));
    const { data } = result.payload;

    expect(data).toBeFalsy();
  });
  test("getModelFilteredProducts success", async () => {
    const mockTotalPageNumber = 1;
    const mockData = ["product1", "product2"];
    axios.get.mockResolvedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    vi.fn(getTotalPageCount).mockReturnValue(mockTotalPageNumber);
    const result = await store.dispatch(getModelFilteredProducts({ brand: "some brand", model: "some model" }));
    const { data, totalPageNumber } = result.payload;
    expect(data).toEqual(mockData);
    expect(totalPageNumber).toEqual(mockTotalPageNumber);
  });
  test("getModelFilteredProducts fail", async () => {
    const mockData = "item1";
    axios.get.mockRejectedValue({
      data: mockData,
    });

    const store = configureStore({
      reducer: {
        productSlice: productSlice,
      },
    });
    vi.fn(getTotalPageCount).mockImplementation(() => {
      throw new Error("Test error");
    });
    const result = await store.dispatch(getModelFilteredProducts({ brand: "some brand", model: "some model" }));
    const { data, totalPageNumber } = result.payload;
    expect(data).toBeFalsy();
    expect(totalPageNumber).toBeFalsy();
  });
});
