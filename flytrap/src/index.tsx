import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { useAuth0 } from "@auth0/auth0-react";
import CoreApp from "./components/CoreApp";
import { createBrowserHistory } from "history";

console.log("index has loaded");

import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState: any) => {
  const history = createBrowserHistory();
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const auth0Config = {
  domain: "dev-r2zpy4nl1f3sy1k8.us.auth0.com",
  clientId: "ewTvhE2obV76Nkxv89NxX99OpQBTe9Fu",
  audience: "https://dev-r2zpy4nl1f3sy1k8.us.auth0.com/api/v2/",
};

const providerConfig = {
  domain: auth0Config.domain,
  clientId: auth0Config.clientId,
  onRedirectCallback,
  cacheLocation: "localstorage",
  authorizationParams: {
    // redirect_uri: process.env.AUTH0_BASE_URL,
    // redirect_uri: 'https://flytrap.email',
    redirect_uri: "dev-r2zpy4nl1f3sy1k8.us.auth0.com",

    ...(auth0Config.audience ? { audience: auth0Config.audience } : null),
  },
};

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
root.render(
  <div>
    <Router>
      {/* <Auth0ProviderWithHistory> */}
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        // onRedirectCallback={onRedirectCallback}
        cacheLocation={"localstorage"}
        authorizationParams={{
          // redirect_uri: process.env.AUTH0_BASE_URL,
          redirect_uri: "https://flytrap.email",
          ...(auth0Config.audience ? { audience: auth0Config.audience } : null),
        }}
        // {...providerConfig}
      >
        <CoreApp />
      </Auth0Provider>
      {/* </Auth0ProviderWithHistory> */}
    </Router>
  </div>
);

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

// <Auth0Provider
// domain={auth0Config.domain}
// clientId={auth0Config.clientId}
// onRedirectCallback={onRedirectCallback}
// cacheLocation={"localstorage"}
// authorizationParams={{
//   redirect_uri: process.env.AUTH0_BASE_URL,
//   ...(auth0Config.audience ? { audience: auth0Config.audience } : null),
// }}
//   // {...providerConfig}
// >
