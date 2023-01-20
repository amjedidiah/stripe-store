import { put, call, all, takeLatest } from "typed-redux-saga/macro";
import {
  authenticateUserFulfilled,
  authenticateUserRejected,
  logoutFulfilled,
  logoutRejected,
  emailRegisterPending,
  emailLoginPending
} from "redux/slices/user.slice";
import {
  createAuthUserWithEmailAndPassword,
  createUserFromAuth,
  getCurrentUser,
  signInAuthWithEmailAndPassword,
  signOutAuth,
  UserData,
} from "utils/firebase.utils";
import { StateError } from "redux/redux.types";
import { isProduction } from "utils/env.util";

type AdditionalUserData = {
  displayName?: string;
};

export function* authenticateUser(
  methodAndParams: Array<any>,
  additionalUserData?: AdditionalUserData,
  shouldDestructureUser: boolean = true
) {
  const [method, ...params] = methodAndParams;

  try {
    const result = yield* call(method, ...params);
    let user = result as UserData

    if (!user) return;
    if (shouldDestructureUser) user = user.user;
    if (additionalUserData) user = { ...user, ...additionalUserData };

    yield* call(createUserFromAuth, user);
    yield* put(authenticateUserFulfilled(user));
  } catch (error) {
    if(!isProduction) console.log("error", error);
    yield* put(authenticateUserRejected(error as StateError));
  }
}

export function* authenticateUserAsync() {
  yield* call(authenticateUser, [getCurrentUser], undefined, false);
}

export function* emailRegister({
  payload: { email, password, displayName },
}: ReturnType<typeof emailRegisterPending>) {
  yield* call(
    authenticateUser,
    [createAuthUserWithEmailAndPassword, email, password],
    { displayName }
  );
}

export function* emailLogin({
  payload: { email, password },
}: ReturnType<typeof emailLoginPending>) {
  yield* call(authenticateUser, [
    signInAuthWithEmailAndPassword,
    email,
    password,
  ]);
}

export function* alertAuthenticateUserRejected({
  payload,
}: ReturnType<typeof authenticateUserRejected>) {
  switch (payload?.code) {
    case "auth/user-not-found": {
      yield* call(alert, "User not found");
      break;
    }
    case "auth/wrong-password": {
      yield* call(alert, "Wrong password");
      break;
    }
    case "auth/email-already-in-use": {
      yield* call(alert, "Email already in use");
      break;
    }
    default:
      yield* call(alert, "Something went wrong");
  }
}

export function* logout() {
  try {
    yield* call(signOutAuth);
    yield* put(logoutFulfilled());
  } catch (err) {
    yield* put(logoutRejected(err as StateError));
  }
}

export function* onAuthenticateUserRejected() {
  yield* takeLatest(
    "user/authenticateUserRejected",
    alertAuthenticateUserRejected
  );
}

export function* onEmailLogin() {
  yield* takeLatest("user/emailLoginPending", emailLogin);
}

export function* onAuthenticateUser() {
  yield* takeLatest("user/authenticateUserPending", authenticateUserAsync);
}

export function* onEmailRegister() {
  yield* takeLatest("user/emailRegisterPending", emailRegister);
}

export function* onLogout() {
  yield* takeLatest("user/logoutPending", logout);
}

export function* userSaga() {
  yield* all([
    call(onEmailLogin),
    call(onEmailRegister),
    call(onAuthenticateUser),
    call(onAuthenticateUserRejected),
    call(onLogout),
  ]);
}
