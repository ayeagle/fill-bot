import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import styles from './App.module.css'
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { useAuth0 } from '@auth0/auth0-react';
import CoreApp from "./components/CoreApp";

console.log("index has loaded")



const rootElement = document.createElement("div");
rootElement.id = "flytrap";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  top: 0;
  right: 5vw;
  width: 25%;
  height: auto;
  background: transparent;
  z-index: 999999999;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode >
//     <CoreApp/>
//     <Router>
//       <Auth0ProviderWithHistory>
//         <App />
//       </Auth0ProviderWithHistory>
//     </Router>
//   </React.StrictMode>
// );
root.render(
    <Router>
      {/* <Auth0ProviderWithHistory> */}
        <CoreApp />
      {/* </Auth0ProviderWithHistory> */}
    </Router>
);
