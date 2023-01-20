import { render, screen } from "@testing-library/react";
import CartItem, { CartItemProps } from "./cart-item";

const CartItemProp = {
  name: "test Product",
  quantity: 3,
  price: 100,
  imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
} as CartItemProps;

describe("CartItem", () => {
  it("should render successfully", () => {
    expect.assertions(4);

    render(<CartItem {...CartItemProp} />);

    expect(screen).toMatchSnapshot();
    expect(
      screen.getByRole("img", {
        name: /test product/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/3 x 100/i)).toBeInTheDocument();
  });
});
