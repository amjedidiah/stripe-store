// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { PreloadedState } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// Render components with Provider
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock Alert
export const mockAlert = jest.fn();
global.alert = mockAlert;


// Mock firebase function signInAuthWithEmailAndPassword
jest.mock("utils/firebase.utils", () => ({
  signInAuthWithEmailAndPassword: jest.fn() as jest.MockedFunction<
    typeof import("utils/firebase.utils").signInAuthWithEmailAndPassword
  >,
  signInWithGoogleRedirect: jest.fn() as jest.MockedFunction<
    typeof import("utils/firebase.utils").signInWithGoogleRedirect
  >,
  createAuthUserWithEmailAndPassword: jest.fn() as jest.MockedFunction<
  typeof import("utils/firebase.utils").createAuthUserWithEmailAndPassword
>,
}));

// Use this function to mock firebase function signInAuthWithEmailAndPassword
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<void> => {
  const { signInAuthWithEmailAndPassword } = await import(
    "utils/firebase.utils"
  );
  signInAuthWithEmailAndPassword(email, password);
}
