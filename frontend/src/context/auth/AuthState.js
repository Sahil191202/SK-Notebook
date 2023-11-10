import AuthContext from "./AuthContext";
import React, { useState } from "react";

const AuthState = (props) => {
  const host = "https://your-notes-by-sk.onrender.com";
  const credentialsinitial = [];
  const [credentials, setCredentials] = useState(credentialsinitial);

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setCredentials(json);
  };
  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        getUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
