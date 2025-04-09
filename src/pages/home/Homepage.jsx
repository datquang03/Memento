import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg";
import { useNavigate } from "react-router-dom";
import {
  FaCameraRetro,
  FaHeart,
  FaStar,
  FaImages,
  FaUserFriends,
  FaRocket,
} from "react-icons/fa"; // More icons
import { useInView } from "react-intersection-observer"; // For scroll-triggered animations

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Định nghĩa 7 màu cho animation của chữ "Memento"
  const colorAnimation = `
    @keyframes colorChange {
      0% { color: #ff0000; } /* Đỏ */
      16.67% { color: #ff7f00; } /* Cam */
      33.33% { color: #ffff00; } /* Vàng */
      50% { color: #00ff00; } /* Xanh lá */
      66.67% { color: #0000ff; } /* Xanh dương */
      83.33% { color: #4b0082; } /* Tím */
      100% { color: #ff0000; } /* Quay lại đỏ */
    }
  `;

  // Thêm các animation khác
  const additionalAnimations = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes slideInLeft {
      0% { opacity: 0; transform: translateX(-50px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      0% { opacity: 0; transform: translateX(50px); }
      100% { opacity: 1; transform: translateX(0); }
    }
  `;

  // Hook để theo dõi khi section vào viewport
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [whyUsRef, whyUsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Layout>
      {/* Hero Section (Original Content) */}
      {!isLoaded && (
        <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse" />
      )}
      <div className="container px-2 py-11 flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Image Section */}
        <div className="flex-1 h-96">
          <img
            src={mainImg}
            alt="mainImg"
            className={`w-full h-full object-cover rounded-3xl shadow-lg transition-all duration-1000 ease-in-out ${
              isLoaded
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            }`}
            style={{
              animation: isLoaded ? "fadeInUp 1.5s ease-in-out" : "none",
            }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Text and Button Section */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex gap-4 mb-4">
            <FaCameraRetro
              className="text-yellow-400 text-3xl"
              style={{ animation: "bounce 2s infinite" }}
            />
            <FaHeart
              className="text-pink-400 text-3xl"
              style={{ animation: "pulse 2s infinite" }}
            />
            <FaStar
              className="text-blue-400 text-3xl"
              style={{ animation: "bounce 2s infinite 0.5s" }}
            />
          </div>
          <p
            className="text-4xl font-bold text-white leading-relaxed"
            style={{
              animation: "fadeInUp 1s ease-in-out 0.3s forwards",
              opacity: 0,
            }}
          >
            Keep your memories with{" "}
            <span
              className="text-red-500 text-4xl"
              style={{
                fontFamily: "Playfair Display",
                animation: "colorChange 7s infinite ease-in-out",
              }}
            >
              <style>{colorAnimation}</style>
              Memento
            </span>
          </p>
          <p
            className="text-xl text-white underline-offset-10 underline leading-relaxed"
            style={{
              animation: "fadeInUp 1s ease-in-out 0.6s forwards",
              opacity: 0,
            }}
          >
            Struggling to pick up a good photo?
          </p>
          <button
            className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              animation: "fadeInUp 1s ease-in-out 0.9s forwards",
              opacity: 0,
            }}
            onClick={() => navigate("/favorites")}
          >
            Explore our works
          </button>
        </div>
      </div>

      {/* New Sections with Scroll-Triggered Animations */}
      <div className="container px-2 py-16 flex flex-col gap-16">
        {/* About Memento Section */}
        <div
          ref={aboutRef}
          className={`flex flex-col md:flex-row gap-8 items-center justify-center transition-all duration-1000 ${
            aboutInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{
                animation: aboutInView ? "slideInLeft 1s ease-in-out" : "none",
              }}
            >
              About Memento
            </h2>
            <p
              className="text-lg text-gray-300 leading-relaxed"
              style={{
                animation: aboutInView
                  ? "fadeInUp 1s ease-in-out 0.3s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              Memento is your go-to platform for preserving and sharing your
              most cherished memories through stunning photography.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <FaImages
              className="text-blue-400 text-6xl"
              style={{ animation: aboutInView ? "pulse 2s infinite" : "none" }}
            />
          </div>
        </div>

        {/* Our Features Section */}
        <div
          ref={featuresRef}
          className={`flex flex-col md:flex-row-reverse gap-8 items-center justify-center transition-all duration-1000 ${
            featuresInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex-1 text-center md:text-right">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{
                animation: featuresInView
                  ? "slideInRight 1s ease-in-out"
                  : "none",
              }}
            >
              Our Features
            </h2>
            <p
              className="text-lg text-gray-300 leading-relaxed"
              style={{
                animation: featuresInView
                  ? "fadeInUp 1s ease-in-out 0.3s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              Explore a variety of tools to edit, organize, and share your
              photos with ease and creativity.
            </p>
          </div>
          <div className="flex-1 flex justify-center gap-4">
            <FaCameraRetro
              className="text-yellow-400 text-5xl"
              style={{
                animation: featuresInView ? "bounce 2s infinite" : "none",
              }}
            />
            <FaStar
              className="text-pink-400 text-5xl"
              style={{
                animation: featuresInView ? "bounce 2s infinite 0.5s" : "none",
              }}
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div
          ref={whyUsRef}
          className={`flex flex-col md:flex-row gap-8 items-center justify-center transition-all duration-1000 ${
            whyUsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{
                animation: whyUsInView ? "slideInLeft 1s ease-in-out" : "none",
              }}
            >
              Why Choose Us?
            </h2>
            <p
              className="text-lg text-gray-300 leading-relaxed"
              style={{
                animation: whyUsInView
                  ? "fadeInUp 1s ease-in-out 0.3s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              We provide a seamless experience with a user-friendly interface,
              fast performance, and a community of photography lovers.
            </p>
            <button
              className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                animation: whyUsInView
                  ? "fadeInUp 1s ease-in-out 0.6s forwards"
                  : "none",
                opacity: 0,
              }}
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
          <div className="flex-1 flex justify-center gap-4">
            <FaUserFriends
              className="text-green-400 text-5xl"
              style={{ animation: whyUsInView ? "pulse 2s infinite" : "none" }}
            />
            <FaRocket
              className="text-purple-400 text-5xl"
              style={{
                animation: whyUsInView ? "bounce 2s infinite 0.5s" : "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Add all animations to the page */}
      <style>{additionalAnimations}</style>
    </Layout>
  );
};

export default Homepage;
