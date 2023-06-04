import { describe, test } from "vitest";
import { renderWithChangingPreloadState } from "../helpers/utils/utils-for-test";
import ProductList from "../components/ProductList";
import { dummyStateProductSlice } from "../helpers/utils/dummyState";

const changeFilterMappingLogic = (filterType: string) => {
  switch (filterType) {
    case "":
      return { selectedSortBy: "Price low to high" };
    case "sortBy":
      return { selectedSortBy: "Price low to high" };
    case "brand":
      return { selectedBrand: "Volvo" };
    case "model":
      return { selectedModel: "XC90" };
    case "sortBy&brand":
      return { selectedSortBy: "Price low to high", selectedBrand: "Volvo" };
    case "brand&model":
      return { selectedBrand: "Volvo", selectedModel: "XC90" };
    default:
      return {};
  }
};

describe("<ProductList/>", () => {
  test("ProductList renders properly with different group of filters", () => {
    let filterObj: any;
    filterObj = changeFilterMappingLogic("");
    renderWithChangingPreloadState(<ProductList />, dummyStateProductSlice, filterObj);
    filterObj = changeFilterMappingLogic("sortBy");
    renderWithChangingPreloadState(<ProductList />, dummyStateProductSlice, filterObj);
    filterObj = changeFilterMappingLogic("brand");
    renderWithChangingPreloadState(<ProductList />, dummyStateProductSlice, filterObj);
    filterObj = changeFilterMappingLogic("model");
    renderWithChangingPreloadState(<ProductList />, dummyStateProductSlice, filterObj);
    filterObj = changeFilterMappingLogic("sortBy&brand");
    renderWithChangingPreloadState(<ProductList />, dummyStateProductSlice, filterObj);
    // Here I do update productSlice.defaultProducts with no element
    renderWithChangingPreloadState(<ProductList />, dummyStateProductSlice, { defaultProducts: [] });
  });
});
