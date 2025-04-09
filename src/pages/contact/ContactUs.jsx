import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import Layout from "../../components/layout/Layout";
import { FiX } from "react-icons/fi";

const ContactUs = () => {
  const location = useLocation();
  const packageData = location.state?.package || null;
  const moodData = location.state?.mood || null; // Nhận dữ liệu mood

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      <div className="container mx-auto px-4 py-8 text-white">
        <h1
          className="text-6xl font-bold text-center text-white mb-6 relative"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Contact Us
          <span
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-2"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ff0000, transparent)",
              borderRadius: "50%",
              height: "6px",
            }}
          />
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Package or Mood Info */}
          <div className="md:w-1/2">
            {packageData ? (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2
                  className="text-2xl font-semibold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Submitted Package Details
                </h2>
                <p className="text-lg">
                  <strong>ID:</strong> {packageData.id}
                </p>
                <p className="text-lg">
                  <strong>Name:</strong> {packageData.description}
                </p>
                <p className="text-lg">
                  <strong>Price:</strong> {packageData.price}
                </p>
                <p className="text-lg">
                  <strong>Description:</strong> {packageData.content}
                </p>
                <p className="mt-4 text-gray-300">
                  Please fill out the form on the right to proceed with your
                  booking for{" "}
                  <span className="text-red-400">
                    "{packageData.description}"
                  </span>
                  .
                </p>
              </div>
            ) : moodData ? (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2
                  className="text-2xl font-semibold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Submitted Moodboard Details
                </h2>
                <p className="text-lg">
                  <strong>Name:</strong> {moodData.name}
                </p>
                <p className="text-lg">
                  <strong>Title:</strong> {moodData.title}
                </p>
                <p className="text-lg">
                  <strong>Subtitle:</strong> {moodData.subtitle}
                </p>
                <p className="mt-4 text-gray-300">
                  Please fill out the form on the right to proceed with your
                  booking for{" "}
                  <span className="text-red-400">"{moodData.name}"</span>.
                </p>
              </div>
            ) : (
              <p className="text-lg text-center">
                No package or moodboard selected. Please go back to{" "}
                <a href="/packages" className="text-red-500 hover:underline">
                  Packages
                </a>{" "}
                or{" "}
                <a href="/favorites" className="text-red-500 hover:underline">
                  Favorites
                </a>{" "}
                to choose one.
              </p>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:w-1/2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[500px] overflow-y-auto custom-scrollbar">
              <h2
                className="text-2xl font-semibold mb-4 sticky bg-gray-800 z-10 h-16 flex items-center justify-center"
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
                <div>
                  <label className="block text-lg">
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
                <div>
                  <label className="block text-lg">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
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
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 font-semibold cursor-pointer"
                >
                  Send
                </button>
              </form>
              {status && !showSuccessModal && (
                <p
                  className={`mt-4 text-center text-lg ${
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

      {/* Modal thông báo thành công */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[3000]"
          onClick={closeSuccessModal}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg text-center animate-success-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <h3 className="text-2xl font-bold text-green-600 mb-4">Success!</h3>
            <p className="text-lg text-gray-700">
              Your message has been sent successfully!
            </p>
            <button
              onClick={closeSuccessModal}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center mx-auto"
            >
              <FiX size={20} className="mr-2" />
              Close
            </button>
          </div>
        </div>
      )}

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
      `}</style>
    </Layout>
  );
};

export default ContactUs;
