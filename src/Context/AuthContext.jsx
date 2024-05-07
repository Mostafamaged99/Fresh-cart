import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(function () {
    const val = localStorage.getItem("token");
    if (val != null) {
      setToken(val);
    }
  }, []);

  return (
    <authContext.Provider value={{ myToken: token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
