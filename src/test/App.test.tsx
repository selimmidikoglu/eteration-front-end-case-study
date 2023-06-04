import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { renderWithProviders, renderWithProvidersNoStateDependent } from "../helpers/utils/utils-for-test";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";

describe("<App/>", () => {
  test("App mounts properly", () => {
    const wrapper = renderWithProvidersNoStateDependent(<App />);
    expect(wrapper).toBeTruthy();
  });
});

describe("<NavBar/>", () => {
  test("NavBar renders properly", () => {
    renderWithProviders(<NavBar />);
    // Asserting some element which exist in NavBar
    expect(screen.getByText("Eteration")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();
  });

  test("NavBar input triggers setSearchTerm", async () => {
    renderWithProviders(<NavBar />);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    await new Promise((resolve) => setTimeout(resolve, 200));
  });
});

describe("<Filter/>", () => {
  test("Filter renders properly", async () => {
    const wrapper = renderWithProviders(<Filter />);
    expect(wrapper).toBeTruthy();
  });
});
