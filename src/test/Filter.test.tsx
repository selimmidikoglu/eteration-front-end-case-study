import { describe, test } from "vitest";
import { renderWithChangingPreloadState, renderWithProvidersWithProductDummyState } from "../helpers/utils/utils-for-test";
import { dummyStateProductSlice } from "../helpers/utils/dummyState";
import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "../components/Filter";

describe("<Filter/>", () => {
  test("Filter renders properly", () => {
    renderWithChangingPreloadState(<Filter />, dummyStateProductSlice, {});
  });
  test("Filtering brand", () => {
    renderWithChangingPreloadState(<Filter />, dummyStateProductSlice, {});
    const tbrandCheckbox = screen.getByTestId("brand-checkbox-1");
    fireEvent.click(tbrandCheckbox);
    fireEvent.click(tbrandCheckbox);
  });
  test("Filtering sortBy", () => {
    renderWithChangingPreloadState(<Filter />, dummyStateProductSlice, {});
    const sortByCheckbox = screen.getByTestId("sortby-checkbox-1");
    fireEvent.click(sortByCheckbox);
    fireEvent.click(sortByCheckbox);
  });
  test("Filtering model with brand checked", () => {
    renderWithChangingPreloadState(<Filter />, dummyStateProductSlice, { selectedBrand: "Audi" });
    let modelCheckbox = screen.getByTestId("model-checkbox-1");
    fireEvent.click(modelCheckbox);
    modelCheckbox = screen.getByTestId("model-checkbox-1");
    fireEvent.click(modelCheckbox);
  });
  test("Filtering model without brand checked", () => {
    renderWithChangingPreloadState(<Filter />, dummyStateProductSlice, {});
    let modelCheckbox = screen.getByTestId("model-checkbox-1");
    modelCheckbox = screen.getByTestId("model-checkbox-1");
    fireEvent.click(modelCheckbox);
  });
});
