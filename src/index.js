import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import { Provider } from "react-redux";

// 스토어 주입
import store from "./redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
