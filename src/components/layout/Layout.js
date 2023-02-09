import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className={`flex`}>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
