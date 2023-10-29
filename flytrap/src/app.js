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

export default function App() {
    return (

      <div id="app" className={styles.main_container}>
        <Component {...pageProps} />
      </div>
    )

}
