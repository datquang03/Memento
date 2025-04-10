import React, { useState, useEffect } from "react";
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
  FaSun,
  FaMoon,
  FaUserAstronaut,
  FaSatellite,
  FaFlag,
  FaMountain,
  FaHome,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Định nghĩa 7 màu cho animation của chữ "Memento"
  const colorAnimation = `
    @keyframes colorChange {
      0% { color: #ff0000; }
      16.67% { color: #ff7f00; }
      33.33% { color: #ffff00; }
      50% { color: #00ff00; }
      66.67% { color: #0000ff; }
      83.33% { color: #4b0082; }
      100% { color: #ff0000; }
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
    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes flyAcross {
      0% { transform: translateX(-100vw); }
      100% { transform: translateX(100vw); }
    }
    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(20deg); }
    }
    @keyframes orbitEarth {
      0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
    }
    @keyframes glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `;

  // Kiểm tra thiết bị di động
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      setIsMobile(
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        )
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position to animate the background
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate background color and sun/moon visibility based on scroll position
  const maxScroll = 3000;
  const brightness = Math.min(scrollPosition / maxScroll, 1);
  const backgroundColor = `rgb(${50 + brightness * 150}, ${
    50 + brightness * 150
  }, ${150 + brightness * 100})`;
  const sunPosition = Math.min((scrollPosition / maxScroll) * 100, 80);
  const moonOpacity = 1 - brightness;

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
  const [communityRef, communityInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Hàm xử lý mở liên kết Facebook
  const handleFacebookClick = () => {
    const mobileLink =
      "https://www.facebook.com/share/18vw6dAXD5/?mibextid=wwXIfr";
    const desktopLink = "https://www.facebook.com/atquang.356747";

    if (isMobile) {
      // Điện thoại: mở link share
      window.location.href = mobileLink;
    } else {
      // Máy tính: mở link profile trong tab mới
      window.open(desktopLink, "_blank");
    }
  };

  return (
    <Layout>
      {/* Background with Sun, Moon, Half-Earth, and Cute Animations */}
      <div
        className="fixed inset-0 z-[-1] transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, ${backgroundColor}, #1e3a8a)`,
        }}
      >
        {/* Moon with Orbital Animation (visible at the top) */}
        <div
          className="absolute top-20 left-1/2"
          style={{
            opacity: moonOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <FaMoon
            className="text-white text-5xl"
            style={{
              animation: "orbit 10s linear infinite",
              transformOrigin: "center",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
            }}
          />
        </div>

        {/* Sun (rises as you scroll down) */}
        <FaSun
          className="absolute right-10 text-yellow-400 text-5xl"
          style={{
            bottom: `${sunPosition}%`,
            transition: "bottom 0.5s ease-in-out",
            filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))",
          }}
        />

        {/* Half-Earth Background */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/4"
          style={{
            background: `radial-gradient(circle at 50% 100%, #0066cc 0%, #003366 50%, transparent 70%)`,
            borderTopLeftRadius: "50% 100%",
            borderTopRightRadius: "50% 100%",
            opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.3) 0%, transparent 20%), radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 15%)`,
            }}
          />
          {/* Glowing Effect on Earth */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-300 rounded-full"
            style={{
              animation: "glow 3s infinite",
              opacity: brightness > 0.3 && brightness < 0.7 ? 0.5 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
          {/* Astronaut Waving on Earth with Speech Bubble */}
          <div
            className="absolute top-1/2 left-1/3 transform -translate-y-1/2"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <FaUserAstronaut
              className="text-white text-4xl"
              style={{
                animation: "wave 2s infinite",
                transformOrigin: "center",
              }}
            />
            <div
              className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white rounded-full flex items-center justify-center text-xs text-black"
              style={{
                animation: "float 2s infinite",
              }}
            >
              Hi!
            </div>
          </div>
          {/* Satellite Orbiting Earth */}
          <div
            className="absolute top-1/2 left-2/3 transform -translate-y-1/2"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <FaSatellite
              className="text-gray-300 text-3xl"
              style={{
                animation: "orbitEarth 5s linear infinite",
                transformOrigin: "center",
              }}
            />
          </div>
          {/* Tree on Earth */}
          <div
            className="absolute top-1/2 left-1/4 transform -translate-y-1/2"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <span className="text-green-500 text-3xl">🌳</span>
          </div>
          {/* Vietnam Flag on Earth */}
          <div
            className="absolute top-1/2 left-3/4 transform -translate-y-1/2 vietnam-flag"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <div className="relative w-12 h-8 bg-red-500 flex items-center justify-center">
              <FaStar
                className="text-yellow-400 text-2xl"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))",
                }}
              />
            </div>
          </div>
          {/* House on Earth */}
          <div
            className="absolute top-1/2 left-1/5 transform -translate-y-1/2"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <FaHome className="text-brown-500 text-3xl" />
          </div>
          {/* Mountain on Earth */}
          <div
            className="absolute top-1/2 left-4/5 transform -translate-y-1/2"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <FaMountain className="text-gray-600 text-3xl" />
          </div>
          {/* Animal on Earth */}
          <div
            className="absolute top-1/2 left-2/5 transform -translate-y-1/2"
            style={{
              opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <span className="text-yellow-500 text-3xl">🐾</span>
          </div>
        </div>

        {/* Cute Animations */}
        {/* Twinkling Stars */}
        <div
          className="absolute top-10 left-10 w-3 h-3 bg-white rounded-full"
          style={{
            animation: "twinkle 2s infinite",
            opacity: moonOpacity,
          }}
        />
        <div
          className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full"
          style={{
            animation: "twinkle 2s infinite 0.5s",
            opacity: moonOpacity,
          }}
        />
        <div
          className="absolute top-40 left-20 w-2 h-2 bg-white rounded-full"
          style={{
            animation: "twinkle 2s infinite 1s",
            opacity: moonOpacity,
          }}
        />

        {/* Shooting Stars */}
        <div
          className="absolute top-10 left-0 w-4 h-1 bg-yellow-300 rounded-full"
          style={{
            animation: "flyAcross 5s linear infinite 2s",
            opacity: moonOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
        <div
          className="absolute top-15 left-0 w-4 h-1 bg-yellow-300 rounded-full"
          style={{
            animation: "flyAcross 5s linear infinite 3s",
            opacity: moonOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
        <div
          className="absolute top-5 left-0 w-4 h-1 bg-yellow-300 rounded-full"
          style={{
            animation: "flyAcross 5s linear infinite 1s",
            opacity: moonOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        />

        {/* Floating Planets */}
        <div
          className="absolute top-1/3 left-1/4 w-10 h-10 bg-purple-400 rounded-full"
          style={{
            animation: "float 4s infinite",
            opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            background: "radial-gradient(circle, #a855f7, #6b21a8)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-8 h-8 bg-orange-400 rounded-full"
          style={{
            animation: "float 4s infinite 1s",
            opacity: brightness > 0.3 && brightness < 0.7 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            background: "radial-gradient(circle, #f97316, #c2410c)",
          }}
        />

        {/* Flying Rocket (Enlarged) */}
        <div
          className="absolute top-2/3 left-0"
          style={{
            animation: "flyAcross 10s linear infinite",
            opacity: brightness > 0.5 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <FaRocket className="text-red-400 text-6xl transform rotate-45" />
        </div>
      </div>

      {/* Hero Section */}
      {!isLoaded && (
        <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse" />
      )}
      <div className="container mx-auto px-2 py-11 flex flex-col md:flex-row gap-8 items-center justify-center ">
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
      <div className="container mx-auto px-2 py-8 flex flex-col gap-16">
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

        {/* Community Section */}
        <div
          ref={communityRef}
          className={`flex flex-col md:flex-row gap-8 items-center justify-center transition-all duration-1000 ${
            communityInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{
                animation: communityInView
                  ? "slideInLeft 1s ease-in-out"
                  : "none",
              }}
            >
              Join Our Community
            </h2>
            <p
              className="text-lg text-gray-300 leading-relaxed"
              style={{
                animation: communityInView
                  ? "fadeInUp 1s ease-in-out 0.3s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              If you have any questions or suggestions, feel free to reach out
              to us. We are always here to help you.
            </p>
            <button
              className="mt-4 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                animation: communityInView
                  ? "fadeInUp 1s ease-in-out 0.6s forwards"
                  : "none",
                opacity: 0,
              }}
              onClick={handleFacebookClick}
            >
              Join my facebook
            </button>
          </div>
          <div className="flex-1 flex justify-center gap-4">
            <FaUserFriends
              className="text-yellow-400 text-5xl"
              style={{
                animation: communityInView ? "pulse 2s infinite" : "none",
              }}
            />
            <FaHeart
              className="text-red-400 text-5xl"
              style={{
                animation: communityInView ? "bounce 2s infinite 0.5s" : "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Add all animations and Vietnam flag styling to the page */}
      <style>{`
        ${additionalAnimations}
        ${colorAnimation}
        .vietnam-flag {
          transform: translateY(-50%);
        }
        .vietnam-flag div {
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }
      `}</style>
    </Layout>
  );
};

export default Homepage;
