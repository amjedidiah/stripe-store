import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import {
  configureStore,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";

// Reducer imports
import userReducer from "redux/slices/user.slice";
import cartReducer from "redux/slices/cart.slice";
import categoryReducer from "redux/slices/category.slice";

// Saga import
import { rootSaga } from "redux/sagas/root-saga";

// Util imports
import { isProduction } from "utils/env.util";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

// Saga-related
const sagaMiddleware = createSagaMiddleware();

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: !isProduction,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: !isProduction,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });
}

// Saga-related
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
