import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

window.addEventListener("error", (e) => {
  if (
    e.message ===
    "ResizeObserver loop completed with undelivered notifications."
  ) {
    e.stopImmediatePropagation();
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
