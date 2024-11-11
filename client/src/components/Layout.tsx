import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import React from "react";

const Layout = ({ currentUser, setCurrentUser }) => {
  if (currentUser) {
    console.log("他會執行");
  }
  console.log(currentUser);
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
