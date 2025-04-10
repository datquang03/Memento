import React from "react";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col third primary">
      <Navbar /> {/* Hiển thị trên desktop (lg trở lên) */}
      <NavbarMobile /> {/* Hiển thị trên mobile (dưới lg) */}
      <div className="flex-grow pb-32 z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
