import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./AppProvider";

const TrackAuth = ({ children }) => {
  const { auth } = useContext(AppContext);
  if (auth) return <Navigate to="/" />;

  return children;
};

export default TrackAuth;
