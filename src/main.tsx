import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./styles/ui.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('Élément #root introuvable. Vérifie ton index.html (div id="root").');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
