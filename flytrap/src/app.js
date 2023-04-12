import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "@components";
import { Home, Profile, ExternalApi } from "./views";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import CoreApp from "./components/CoreApp";
import styles from "./app.module.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

console.log("app has loaded");

// import './app.css';
//ksdjhasjd

export default function App() {
  // const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
  //   useAuth0();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  // if (isAuthenticated) {
    return (
      // <div>
      //   Hello {user.name}{" "}
      //   <button onClick={() => logout({ returnTo: window.location.origin })}>
      //     Log out
      //   </button>
      // </div>

      <div id="app" className={styles.main_container}>
        {/* <CoreApp {...pageProps}  /> */}
        {/* <Component {...pageProps} /> */}
        <Component {...pageProps} />

        {/* <NavBar /> */}
      </div>
    )
    
  //   ;
  // } else {
  //   return <button onClick={() => loginWithRedirect()}>Log in</button>;
  // }

  // return (
  //   <div id="app" className={styles.main_container}>
  //     {/* <CoreApp {...pageProps}  /> */}
  //     {/* <Component {...pageProps} /> */}
  //     <Component {...pageProps} />

  //     {/* <NavBar /> */}
  //   </div>
  // );
}
