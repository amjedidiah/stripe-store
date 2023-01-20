import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "setupTests";
import Register from "./register";

describe("Register", () => {
  it("should render properly", () => {
    expect.assertions(4);

    renderWithProviders(<Register />);

    expect(screen).toMatchSnapshot();
    expect(
      screen.getByRole("heading", {
        name: /don't have an account\?/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/register with your email and password/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  it("should call createAuthUserWithEmailAndPassword on submit", async () => {
    expect.assertions(2);

    const displayName = "John Doe";
    const email = "john.doe@gmail.com";
    const password = "Alpha1";
    const { createAuthUserWithEmailAndPassword } = await import(
      "utils/firebase.utils"
    );

    renderWithProviders(<Register />);

    await userEvent.type(
      screen.getByRole("textbox", {
        name: /display name/i,
      }),
      displayName
    );
    await userEvent.type(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
      email
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter your password/i),
      password
    );
    await userEvent.type(screen.getByLabelText(/confirm password/i), password);
    await userEvent.click(screen.getByTestId("custom"));

    expect(screen).toMatchSnapshot();
    expect(createAuthUserWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password
    );
  });
});
