import { describe, test, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProvidersNoStateDependent } from "../helpers/utils/utils-for-test";
import ProductCard from "../components/ProductCard";

const selectedProductStateDummy = {
  createdAt: "2022-03-30T03:11:14.823Z",
  name: "Mazda Alpine",
  image: "http://placeimg.com/640/480/technics",
  price: "545.00",
  description: "description",
  model: "Fortwo",
  brand: "Volkswagen",
  id: "4",
};

describe("<ProductCard/>", () => {
  test("ProductCard renders properly", () => {
    const { store, ...ProductCardComponent } = renderWithProvidersNoStateDependent(<ProductCard product={selectedProductStateDummy} />);
    // Testing Clicking on Product Card
    const clickableProductCardDiv = screen.getByTestId("product-card");
    fireEvent.click(clickableProductCardDiv);
    expect(ProductCardComponent).toBeTruthy();
    // Testing Add to Cart Button
    const addtoCartButton = screen.getByText("Add to cart");
    fireEvent.click(addtoCartButton);
  });
});
