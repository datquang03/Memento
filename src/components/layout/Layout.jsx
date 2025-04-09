import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col third primary">
      <Navbar />
      <div className="flex-grow pb-32 z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
