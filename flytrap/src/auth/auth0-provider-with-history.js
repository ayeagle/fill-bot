// src/auth/auth0-provider-with-history.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
    domain="dev-r2zpy4nl1f3sy1k8.us.auth0.com"
    clientId="iUpsgSmF90HWqhZCzl84oXmE1ID6occc"
    authorizationParams={{
      redirect_uri:
        "https://flytrap.email/authorize"
      // "http://localhost:3000/api/auth/callback"
      //  window.location.origin
    }}
    onRedirectCallback={onRedirectCallback}
  >
    {children}
  </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;