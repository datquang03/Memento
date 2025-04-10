import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import Layout from "../../components/layout/Layout";
import { FiX, FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";
import {
  FaStar,
  FaRocket,
  FaSun,
  FaMoon,
  FaUserAstronaut,
  FaSatellite,
  FaBolt, // Thêm FaBolt cho hiệu ứng sét
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ContactUs = () => {
  const location = useLocation();
  const packageData = location.state?.package || null;
  const moodData = location.state?.mood || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true });
  const { ref: leftColumnRef, inView: leftColumnInView } = useInView({
    triggerOnce: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_4s0qkfe",
        "template_1oyo6la",
        e.target,
        "T655aG_F0_6TMOyDZ"
      )
      .then(
        () => {
          setStatus("Email sent successfully!");
          setShowSuccessModal(true);
          setFormData({ name: "", email: "", phone: "", message: "" });
          setTimeout(() => {
            setShowSuccessModal(false);
            setStatus("");
          }, 3000);
        },
        (error) => {
          setStatus("Failed to send email: " + error.text);
          setTimeout(() => setStatus(""), 5000);
        }
      );
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setStatus("");
  };

  return (
    <Layout>
      <div className="min-h-screen primary py-8 relative overflow-hidden">
        {/* Background Animations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Twinkling Stars */}
          <FaStar
            className="absolute top-10 left-10 text-white text-2xl"
            style={{ animation: "twinkle 2s infinite" }}
          />
          <FaStar
            className="absolute top-20 right-20 text-white text-2xl"
            style={{ animation: "twinkle 2s infinite 0.5s" }}
          />
          <FaStar
            className="absolute top-40 left-20 text-white text-2xl"
            style={{ animation: "twinkle 2s infinite 1s" }}
          />

          {/* Shooting Stars */}
          <div
            className="absolute top-10 left-0 w-4 h-1 bg-yellow-300 rounded-full"
            style={{ animation: "flyAcross 5s linear infinite 2s" }}
          />
          <div
            className="absolute top-15 left-0 w-4 h-1 bg-yellow-300 rounded-full"
            style={{ animation: "flyAcross 5s linear infinite 3s" }}
          />

          {/* Floating Planets */}
          <div
            className="absolute top-1/3 left-1/4 w-10 h-10 bg-purple-400 rounded-full"
            style={{
              animation: "float 4s infinite",
              background: "radial-gradient(circle, #a855f7, #6b21a8)",
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-8 h-8 bg-orange-400 rounded-full"
            style={{
              animation: "float 4s infinite 1s",
              background: "radial-gradient(circle, #f97316, #c2410c)",
            }}
          />

          {/* Sun and Moon */}
          <FaSun
            className="absolute top-10 right-10 text-yellow-400 text-4xl"
            style={{ animation: "float 4s infinite" }}
          />
          <FaMoon
            className="absolute top-20 left-1/3 text-white text-4xl"
            style={{ animation: "orbit 10s linear infinite" }}
          />

          {/* Flying Rocket */}
          <FaRocket
            className="absolute top-2/3 left-0 text-red-400 text-5xl transform rotate-45"
            style={{ animation: "flyAcross 10s linear infinite" }}
          />

          {/* Astronaut */}
          <FaUserAstronaut
            className="absolute bottom-10 left-1/4 text-white text-4xl"
            style={{ animation: "wave 2s infinite" }}
          />

          {/* Satellite */}
          <FaSatellite
            className="absolute bottom-20 right-1/3 text-gray-300 text-3xl"
            style={{ animation: "orbitEarth 5s linear infinite" }}
          />

          {/* Vortex Effect */}
          <div
            className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border-2 border-dashed border-blue-400 opacity-50"
            style={{ animation: "vortex 6s linear infinite" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border-2 border-dashed border-blue-300 opacity-50"
            style={{ animation: "vortex 5s linear infinite reverse" }}
          />

          {/* Lightning Effects */}
          <FaBolt
            className="absolute top-1/4 left-1/3 text-yellow-300 text-4xl"
            style={{ animation: "lightning 4s infinite 1s" }}
          />
          <FaBolt
            className="absolute bottom-1/4 right-1/4 text-yellow-300 text-3xl"
            style={{ animation: "lightning 5s infinite 2s" }}
          />
          <FaBolt
            className="absolute top-2/3 left-2/3 text-yellow-300 text-5xl"
            style={{ animation: "lightning 6s infinite 3s" }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 text-white z-10">
          <h1
            className="text-6xl font-bold text-center text-white mb-6 relative animate-slide-in"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
            <span
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-2 animate-gradient"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #ff0000, transparent)",
                borderRadius: "50%",
                height: "6px",
              }}
            />
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column */}
            <div
              ref={leftColumnRef}
              className={`md:w-1/2 transition-all duration-500 ${
                leftColumnInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {packageData ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2
                    className="text-2xl font-semibold mb-4 animate-fade-in"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Submitted Package Details
                  </h2>
                  <p className="animate-slide-up">
                    <strong>ID:</strong> {packageData.id}
                  </p>
                  <p
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <strong>Name:</strong> {packageData.description}
                  </p>
                  <p
                    className="animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <strong>Price:</strong> {packageData.price}
                  </p>
                  <p
                    className="animate-slide-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <strong>Description:</strong> {packageData.content}
                  </p>
                  <p
                    className="mt-4 text-gray-300 animate-fade-in"
                    style={{ animationDelay: "0.8s" }}
                  >
                    Please fill out the form to book{" "}
                    <span className="text-red-400">
                      "{packageData.description}"
                    </span>
                    .
                  </p>
                </div>
              ) : moodData ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2
                    className="text-2xl font-semibold mb-4 animate-fade-in"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Submitted Moodboard Details
                  </h2>
                  <p className="animate-slide-up">
                    <strong>Name:</strong> {moodData.name}
                  </p>
                  <p
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <strong>Title:</strong> {moodData.title}
                  </p>
                  <p
                    className="animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <strong>Subtitle:</strong> {moodData.subtitle}
                  </p>
                  <p
                    className="mt-4 text-gray-300 animate-fade-in"
                    style={{ animationDelay: "0.6s" }}
                  >
                    Please fill out the form to book{" "}
                    <span className="text-red-400">"{moodData.name}"</span>.
                  </p>
                </div>
              ) : (
                <p className="text-lg text-center animate-fade-in">
                  No package or moodboard selected. Go back to{" "}
                  <a href="/packages" className="text-red-500 hover:underline">
                    Packages
                  </a>{" "}
                  or{" "}
                  <a href="/favorites" className="text-red-500 hover:underline">
                    Favorites
                  </a>
                  .
                </p>
              )}
            </div>

            {/* Right Column: Form */}
            <div className="md:w-1/2">
              <div
                ref={formRef}
                className={`bg-gray-800 p-6 rounded-lg shadow-lg h-[500px] overflow-y-auto custom-scrollbar transition-all duration-500 ${
                  formInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <h2
                  className="text-2xl font-semibold mb-4 sticky bg-gray-800 z-10 h-16 flex items-center justify-center animate-fade-in"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send Us a Message
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="package"
                    value={
                      packageData?.description ||
                      moodData?.name ||
                      "No package or moodboard selected"
                    }
                  />
                  <div className="animate-slide-up">
                    <label className="block text-lg mb-1">
                      {packageData ? "Package" : "Moodboard"}
                    </label>
                    <input
                      type="text"
                      name="package_display"
                      value={
                        packageData?.description ||
                        moodData?.name ||
                        "No package or moodboard selected"
                      }
                      disabled
                      className="w-full p-2 rounded bg-gray-700 text-white cursor-not-allowed"
                    />
                  </div>
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <label className="block text-lg mb-1 flex items-center gap-2">
                      <FiUser className="animate-pulse" /> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white transition-all duration-300 hover:scale-105"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <label className="block text-lg mb-1 flex items-center gap-2">
                      <FiMail className="animate-pulse" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white transition-all duration-300 hover:scale-105"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <label className="block text-lg mb-1 flex items-center gap-2">
                      <FiPhone className="animate-pulse" /> Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white transition-all duration-300 hover:scale-105"
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <label className="block text-lg mb-1 flex items-center gap-2">
                      <FiMessageSquare className="animate-pulse" /> Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white transition-all duration-300 hover:scale-105"
                      rows="4"
                      placeholder="Your Message"
                      required
                    ></textarea>
                    <input
                      type="hidden"
                      name="date"
                      value={new Date().toLocaleDateString()}
                    />
                    <input
                      type="hidden"
                      name="time"
                      value={new Date().toLocaleTimeString()}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-red-700 transition-all duration-300 font-semibold animate-bounce-in"
                  >
                    Send
                  </button>
                </form>
                {status && !showSuccessModal && (
                  <p
                    className={`mt-4 text-center text-lg animate-fade-in ${
                      status.includes("successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Success */}
        {showSuccessModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[3000]"
            onClick={closeSuccessModal}
          >
            <div
              className="bg-white rounded-lg p-6 shadow-lg text-center animate-success-modal relative"
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <FaStar className="absolute top-2 left-2 text-yellow-400 text-2xl animate-twinkle" />
              <FaStar
                className="absolute top-2 right-2 text-yellow-400 text-2xl animate-twinkle"
                style={{ animationDelay: "0.5s" }}
              />
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Success!
              </h3>
              <p className="text-lg text-gray-700">
                Your message has been sent successfully!
              </p>
              <button
                onClick={closeSuccessModal}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"
              >
                <FiX size={20} className="mr-2 animate-spin-slow" />
                Close
              </button>
            </div>
          </div>
        )}

        {/* Style */}
        <style>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ef4444 #4b5563;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #4b5563;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ef4444;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #dc2626;
          }

          /* Animations */
          @keyframes slide-in {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.8s ease-out forwards;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }

          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }

          @keyframes slide-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
          }

          @keyframes bounce-in {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-in {
            animation: bounce-in 0.6s ease-out forwards;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .animate-twinkle {
            animation: twinkle 2s infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes flyAcross {
            0% { transform: translateX(-100vw); }
            100% { transform: translateX(100vw); }
          }

          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }

          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(20deg); }
          }

          @keyframes orbitEarth {
            0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }

          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }

          @keyframes fadeScaleShake {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.05); }
            75% { transform: scale(1) rotate(2deg); }
            85% { transform: scale(1) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          .animate-success-modal {
            animation: fadeScaleShake 0.6s ease-in-out;
          }

          /* Vortex Animation */
          @keyframes vortex {
            0% {
              transform: rotate(0deg) scale(1);
              opacity: 0.5;
            }
            50% {
              transform: rotate(180deg) scale(1.2);
              opacity: 0.8;
            }
            100% {
              transform: rotate(360deg) scale(1);
              opacity: 0.5;
            }
          }

          /* Lightning Animation */
          @keyframes lightning {
            0%, 20%, 40%, 60%, 80%, 100% { opacity: 0; }
            10%, 30%, 50%, 70% { opacity: 1; transform: scale(1.1); }
            15%, 35%, 55%, 75% { opacity: 0.5; transform: scale(1); }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default ContactUs;
