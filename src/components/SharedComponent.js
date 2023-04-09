import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

const SharedComponent = () => {
  return (
    <>
      <Nav />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default SharedComponent;
