import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./login";
import { renderWithProviders } from "setupTests";

describe("Login", () => {
  it("should render properly", () => {
    expect.assertions(4);

    renderWithProviders(<Login />);

    expect(screen).toMatchSnapshot();
    expect(
      screen.getByRole("heading", {
        name: /already have an account\?/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/login with your email and password/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("should call signInAuthWithEmailAndPassword on submit", async () => {
    expect.assertions(2);

    const email = "john.doe@gmail.com";
    const password = "Alpha1";
    const { signInAuthWithEmailAndPassword } = await import(
      "utils/firebase.utils"
    );

    renderWithProviders(<Login />);

    await userEvent.type(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
      email
    );
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByTestId("custom"));

    expect(screen).toMatchSnapshot();
    expect(signInAuthWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password
    );
  });
});
