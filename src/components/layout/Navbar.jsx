import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const navRef = useRef(null);

  const baseClass = "text-xl pr-2 transition-all duration-500 ease-in-out";
  const activeClass = "text-red-500 bg-gray-200 px-2 rounded";
  const hoverClass =
    "text-white hover:text-red-500 hover:underline hover:underline-offset-4";

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const activeElement = navRef.current?.querySelector(".active");
    if (activeElement) {
      setActiveLink({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [location.pathname]);

  return (
    <div className="shadow-md sticky top-0 z-30 bg-gray-900 third primary">
      <div className="container mx-auto px-2 lg:grid grid-cols-7 gap-8 items-center">
        <div className="col-span-1 lg:block hidden">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="w-full h-40 cursor-pointer object-cover"
            alt="logo"
          />
        </div>
        <div className="col-span-6 font-medium text-sm flex justify-end items-center h-full">
          <div className="relative flex gap-6" ref={navRef}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/packages"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass}`
              }
            >
              Packages & Bookings
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass}`
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass}`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : hoverClass}`
              }
            >
              User Profile
            </NavLink>
            {activeLink && (
              <span
                className="absolute bottom-[-4px] h-[2px] bg-red-500 transition-all duration-500 ease-in-out"
                style={{
                  left: `${activeLink.left}px`,
                  width: `${activeLink.width}px`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
