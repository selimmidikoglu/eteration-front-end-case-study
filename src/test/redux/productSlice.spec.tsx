import {
  getBrandFilteredProducts,
  getModelFilteredProducts,
  getProductById,
  getProductList,
  getSortByProductList,
} from "../../redux/store/products/productActions";
import productSlice, {
  initialState,
  setCurrentPageAndTotalNumberOfPages,
  setPage,
  setProductsOfModelWithSpecificBrand,
  setSelectedBrand,
  setSelectedModel,
} from "../../redux/store/products/productSlice";
import { describe, test, expect } from "vitest";

describe("ProductSlice", () => {
  test("initialize slice with initialValue", () => {
    const productSliceInit = productSlice(initialState, { type: "unknown" });
    expect(productSliceInit).toBe(initialState);
  });
  test("test setPage Reducer", () => {
    const page = 2;
    const afterReducerOperation = productSlice(initialState, setPage(page));

    expect(afterReducerOperation.currentPage).toEqual(page);
  });
  describe("test setSelectedBrand Reducer", () => {
    test("brand unselected", () => {
      const selectedBrand = "";
      const afterReducerOperation = productSlice(initialState, setSelectedBrand(selectedBrand));

      expect(afterReducerOperation.selectedBrand).toBe("");
    });
    test("brand selected", () => {
      const selectedBrand = "Mercedes";
      const afterReducerOperation = productSlice(initialState, setSelectedBrand(selectedBrand));

      expect(afterReducerOperation.selectedBrand).toBe("Mercedes");
    });
  });
  describe("test setSelectedModel Reducer", () => {
    test("model unselected", () => {
      const selectedModel = "";
      const afterReducerOperation = productSlice(initialState, setSelectedModel(selectedModel));

      expect(afterReducerOperation.selectedModel).toBe("");
    });
    test("model selected", () => {
      const selectedModel = "XC90";
      const afterReducerOperation = productSlice(initialState, setSelectedModel(selectedModel));

      expect(afterReducerOperation.selectedModel).toBe("XC90");
    });
  });
  describe("test setProductsOfModelWithSpecificBrand Reducer", () => {
    test("model unselected", () => {
      const selectedModel = "";
      const afterReducerOperation = productSlice(initialState, setProductsOfModelWithSpecificBrand(selectedModel));

      expect(afterReducerOperation.selectedModel).toBe("");
    });
    test("model selected", () => {
      const selectedModel = "XC90";
      const afterReducerOperation = productSlice(initialState, setProductsOfModelWithSpecificBrand(selectedModel));
      expect(afterReducerOperation.selectedModel).toBe("XC90");
    });
  });
  describe("extraReducers", () => {
    describe("getProductList", () => {
      test("pending", () => {
        const action = { type: getProductList.pending.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("pending");
      });
      test("failed", () => {
        const action = { type: getProductList.rejected.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("failed");
      });
      test("pending", () => {
        const action = { type: getProductList.fulfilled.type, payload: "" };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("succeeded");
      });
    });

    describe("getBrandFilteredProducts", () => {
      test("pending", () => {
        const action = { type: getBrandFilteredProducts.pending.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("pending");
      });
      test("failed", () => {
        const action = { type: getBrandFilteredProducts.rejected.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("failed");
      });
      test("pending", () => {
        const action = {
          type: getBrandFilteredProducts.fulfilled.type,
          payload: "",
        };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("succeeded");
      });
    });

    describe("getModelFilteredProducts", () => {
      test("pending", () => {
        const action = { type: getModelFilteredProducts.pending.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("pending");
      });
      test("failed", () => {
        const action = { type: getModelFilteredProducts.rejected.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("failed");
      });
      test("pending", () => {
        const action = {
          type: getModelFilteredProducts.fulfilled.type,
          payload: "",
        };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("succeeded");
      });
    });

    describe("getProductById", () => {
      test("pending", () => {
        const action = { type: getProductById.pending.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("pending");
      });
      test("failed", () => {
        const action = { type: getProductById.rejected.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("failed");
      });
      test("pending", () => {
        const action = {
          type: getProductById.fulfilled.type,
          payload: "",
        };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("succeeded");
      });
    });

    describe("getSortByProductList", () => {
      test("pending", () => {
        const action = { type: getSortByProductList.pending.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("pending");
      });
      test("failed", () => {
        const action = { type: getSortByProductList.rejected.type };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("failed");
      });
      test("pending", () => {
        const action = {
          type: getSortByProductList.fulfilled.type,
          payload: "",
        };
        const afterReducerOperation = productSlice(initialState, action);

        expect(afterReducerOperation.loading).toBe("succeeded");
      });
    });
    describe("test setCurrentPageAndTotalNumberOfPages Reducer", () => {
      test("totalPage assigned", () => {
        const afterReducerOperation = productSlice(initialState, setCurrentPageAndTotalNumberOfPages(2));

        expect(afterReducerOperation.totalPageNumber).toBe(2);
      });
    });
  });
});
