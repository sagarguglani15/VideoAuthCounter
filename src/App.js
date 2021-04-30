import React, { useState, useEffect } from "react";
import Firebase from "./firebase-config";
import Login from "./components/Login";
import Videos from "./components/Videos";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const authListener = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      <Login user={user} />
      <Videos user={user} />
    </>
  );
};

export default App;
