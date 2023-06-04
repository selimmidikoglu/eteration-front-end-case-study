import { describe, test } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProvidersNoStateDependent } from "../helpers/utils/utils-for-test";
import NavBar from "../components/NavBar";

describe("<NavBar/>", () => {
  test("NavBar renders properly and search works", () => {
    renderWithProvidersNoStateDependent(<NavBar />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Mer" } });
    fireEvent.change(input, { target: { value: "Mercedes" } });
  });
});
