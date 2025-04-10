import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const baseClass =
    "text-2xl py-4 px-6 transition-all duration-300 ease-in-out";
  const activeClass = "text-red-500 bg-gray-200 rounded font-semibold";
  const hoverClass = "text-white hover:text-red-500";

  // Đóng sidebar khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Đóng sidebar khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="lg:hidden shadow-md sticky top-0 z-30 bg-gray-900 third primary">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={logo}
          className="h-16 cursor-pointer object-cover"
          alt="logo"
        />

        {/* Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-4xl focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-72 bg-gray-800 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 shadow-lg border-l-4 border-red-500`}
      >
        <div className="flex flex-col items-start pt-24 px-4">
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
        </div>
      </div>

      {/* Overlay làm mờ nội dung */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm bg-gray-500 bg-opacity-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default NavbarMobile;
