
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// import { NavBar, Footer, Loading } from '@components';
// import { Home, Profile, ExternalApi } from './views';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import CoreApp from './components/CoreApp'
import styles from './app.module.css'


console.log("app has loaded")

// import './app.css';

export default function App () {
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div id="app" className={styles.main_container}>

    {/* <div id="app" className="d-flex flex-column h-100"> */}
      <CoreApp/>
      <NavBar />
      {/* <div className="container flex-grow-1">
        <Routes>
          <Route path="/" exact component={CoreApp} />
          <Route path="/profile" component={Profile} />
          <Route path="/external-api" component={ExternalApi} />
        </Routes>
      </div>
      <Footer /> */}
    </div>
  );
};
