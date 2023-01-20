/* eslint-disable testing-library/no-debugging-utils */
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { renderWithProviders } from "setupTests";
import CartDropdown from "./cart-dropdown";

const mockedCartItemsArray = [
  {
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    quantity: 1,
  },
  {
    id: 2,
    name: "Blue Beanie",
    imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
    price: 18,
    quantity: 1,
  },
  {
    id: 3,
    name: "Brown Cowboy",
    imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
    price: 35,
    quantity: 1,
  },
];

const RouterCartDropdown = () => (
  <Router>
    <CartDropdown />
  </Router>
);

describe("CartDropdown", () => {
  it("should not render when isCartOpen is false", () => {
    expect.assertions(2);

    renderWithProviders(<RouterCartDropdown />);

    expect(screen).toMatchSnapshot();
    expect(screen.queryByText(/your cart is empty/i)).toBeNull();
  });

  it("should render when isCartOpen is true", async () => {
     
  });
});
