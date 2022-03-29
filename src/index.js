import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

// 스토어 주입
import store from "./redux/configureStore";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import ReactPWAInstallProvider from "react-pwa-install";

ReactDOM.render(
  // <ReactPWAInstallProvider enableLogging>
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
  // </ReactPWAInstallProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
