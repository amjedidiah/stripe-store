import { screen, render } from "@testing-library/react";
import Button from "./button";

const buttonProps = {
  value: "Click me",
  id: "button"
}

describe("Button", () => {
  it("should render the button", () => {
    expect.assertions(3);

    render(<Button {...buttonProps} />);

    expect(screen).toMatchSnapshot();
    expect(
      screen.getByRole("button", {
        name: /click me/i,
      })
    ).toHaveAttribute("type", "button");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should render the button with the loading state", () => {
    expect.assertions(4);

    render(<Button loading {...buttonProps} />);
    const screenButton = screen.getByTestId("custom");

    expect(screen).toMatchSnapshot();
    expect(screenButton).toHaveAttribute("disabled");
    expect(screenButton).toHaveValue("");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should render the google sign in button", () => {
    expect.assertions(2);
    render(<Button buttonType="google" {...buttonProps} />);

    expect(screen).toMatchSnapshot();
    expect(screen.getByTestId("google")).toHaveClass("google-sign-in");
  });

  it("should render the button with the inverted style", () => {
    expect.assertions(2);
    render(<Button buttonType="inverted" {...buttonProps} />);

    expect(screen).toMatchSnapshot();
    expect(screen.getByTestId("inverted")).toHaveClass("inverted");
  });
});
