import { all, call } from "typed-redux-saga/macro";
import { userSaga } from "redux/sagas/user.saga";

export function* rootSaga() {
  yield* all([call(userSaga)]);
}