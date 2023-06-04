import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";
import { dummyStateProductSlice } from "../helpers/utils/dummyState";
import { renderWithProvidersWithProductDummyState } from "../helpers/utils/utils-for-test";
import { setPage } from "../redux/store/products/productSlice";

describe("<Pagination/>", () => {
  test("Pagination renders properly", () => {
    // Create a store with the custom initial state
    const { store, ...PaginationComponent } = renderWithProvidersWithProductDummyState(<Pagination totalPageNumber={3} />, dummyStateProductSlice, 1);

    expect(PaginationComponent).toBeTruthy();
    const pageNumbers = screen.getAllByRole("button");
  });
  test("Changing page", () => {
    // Create a store with the custom initial state
    const { store } = renderWithProvidersWithProductDummyState(<Pagination totalPageNumber={8} />, dummyStateProductSlice, 7);
    const currentPageButton = screen.getByText("7");
    expect(currentPageButton.className).includes("font-bold bg-white rounded");
    store.dispatch(setPage(4));
    renderWithProvidersWithProductDummyState(<Pagination totalPageNumber={8} />, dummyStateProductSlice, 4);
    const currentPageButton4 = screen.getAllByRole("button");
    expect(currentPageButton4[4].className).includes("font-bold bg-white rounded");
  });
});
test("Changing page with all click", () => {
  // Create a store with the custom initial state
  const { store, ...PaginationComponent } = renderWithProvidersWithProductDummyState(<Pagination totalPageNumber={8} />, dummyStateProductSlice, 7);
  const pageNumbers = screen.getAllByRole("button");
  const nextButton = screen.getByText(">");
  fireEvent.click(nextButton);
  const previousButton = screen.getByText("<");
  fireEvent.click(previousButton);

  pageNumbers.forEach((button) => {
    const pageNumbersLater = screen.getAllByRole("button");
    pageNumbersLater.forEach((buttonLater) => {
      fireEvent.click(buttonLater);
    });

    fireEvent.click(button);
  });
});
