import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const baseClass =
    "text-white text-base transition-all duration-500 ease-in-out";
  const hoverClass =
    "hover:text-red-500 hover:underline hover:underline-offset-4";
  const activeClass = "text-red-500 underline underline-offset-4";

  return (
    <footer className="bg-gray-900 text-white py-10 left-0 w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Liên kết nhanh */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-red-500">Quick Links</h3>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/galleries"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            Galleries
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
        </div>

        {/* Thông tin thêm */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-red-500">About</h3>
          <p>
            We are a company dedicated to providing the best services. Follow us
            for updates and more information.
          </p>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex flex-col gap-6 ml-10">
          <h3 className="text-xl font-bold text-red-500">Contact Us</h3>
          <div className="flex gap-6">
            <a
              href="mailto:daoquangdat0103@gmail.com"
              className="text-white hover:text-red-500 transition-all duration-300"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="tel:+1234567890"
              className="text-white hover:text-red-500 transition-all duration-300"
            >
              <FaPhone size={20} />
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300"
            >
              <FaMapMarkerAlt size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-red-500 transition-all duration-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-red-500 transition-all duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-red-500 transition-all duration-300"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p
          className="text-3xl font-bold text-red-500 tracking-wide"
          style={{ fontFamily: "Playfair Display" }}
        >
          MEMENTO
          <span className="text-white text-2xl ml-2">Photography</span>
        </p>{" "}
      </div>
    </footer>
  );
};

export default Footer;
