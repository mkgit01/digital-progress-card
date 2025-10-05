import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Footer from "./Marginals/Footer";
import { Outlet } from "react-router-dom";
import "../styles/index.css";
import Login from "./Auth/Login";
import Header from "./Marginals/Header/Header.jsx";
import Loader from "./Loader/Loader.jsx";

function Layout() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const setLogin = () => {
    setLoggedIn((login) => !login);
  };

  if (loggedIn === null) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255,255,255,0.9)",
          zIndex: 2000,
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      {loggedIn ? (
        <>
          <div className="full-page">
            <Header user={user} />
            <Outlet />
          </div>
          <Footer />
        </>
      ) : (
        <Login setLogin={setLogin} />
      )}
    </>
  );
}

export default Layout;
