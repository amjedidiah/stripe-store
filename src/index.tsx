import React from "react";
import ReactDOM from "react-dom/client";
import "index.scss";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { persistor, store } from "redux/store";
import { stripePromise } from "utils/stripe.util";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { isProduction } from "utils/env.util";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

if(!isProduction) reportWebVitals(console.log);
serviceWorkerRegistration.register();