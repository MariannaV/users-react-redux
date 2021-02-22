import './styles/index.scss'
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CONSTANTS from "./consts";
import { configureStore } from "./store";
import { PageMain } from "./pages/main";

if (CONSTANTS.isProd && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed:", registrationError);
      });
  });
}

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PageMain />
    </Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
