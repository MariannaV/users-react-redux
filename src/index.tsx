import React from "react";
import ReactDOM from "react-dom";
import CONSTANTS from "./consts";

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

function App() {
  return (
    <>
      <header>
        <h1>Users</h1>
      </header>
      <main>Users data</main>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
