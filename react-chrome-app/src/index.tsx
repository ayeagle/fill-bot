import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import styles from './App.module.css'


const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  right: 5vw;
  top: 0;
  width: 25%;
  height: 0vh;
  background: #ffffff;
  z-index: 999999999;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode >
      <App />
    </React.StrictMode>
);
