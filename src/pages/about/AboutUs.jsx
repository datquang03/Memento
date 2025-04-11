import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg";
import {
  FaRobot,
  FaCode,
  FaRocket,
  FaMicrochip,
  FaSatellite,
  FaCog,
  FaCloudDownloadAlt,
  FaServer,
  FaBolt,
  FaDigitalTachograph,
  FaGlobeAmericas,
  FaUserAstronaut,
  FaCamera,
  FaImage,
} from "react-icons/fa";

const AboutUs = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const essenceRef = useRef(null);

  useEffect(() => {
    const missionElement = missionRef.current;
    const visionElement = visionRef.current;
    const essenceElement = essenceRef.current;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (missionElement) observer.observe(missionElement);
    if (visionElement) observer.observe(visionElement);
    if (essenceElement) observer.observe(essenceElement);

    return () => {
      if (missionElement) observer.unobserve(missionElement);
      if (visionElement) observer.unobserve(visionElement);
      if (essenceElement) observer.unobserve(essenceElement);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-white relative overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900 shadow-lg">
        {/* Space Background with Rotating Earth and Stars */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] earth"
            style={{
              background: `radial-gradient(circle at 50% 50%, #1e90ff 0%, #003087 50%, #000033 100%)`,
              borderRadius: "50%",
              animation: "rotateEarth 30s linear infinite",
            }}
          >
            <div
              className="absolute top-1/4 left-1/3 w-1/4 h-1/4 bg-white opacity-20 rounded-full"
              style={{ filter: "blur(20px)" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-1/5 h-1/5 bg-white opacity-15 rounded-full"
              style={{ filter: "blur(15px)" }}
            />
            <div
              className="absolute top-1/3 right-1/4 w-1/6 h-1/6 bg-white opacity-25 rounded-full"
              style={{ filter: "blur(25px)" }}
            />
          </div>
          <div
            className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"
            style={{ animation: "twinkle 2s infinite" }}
          />
          <div
            className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full"
            style={{ animation: "twinkle 2s infinite 0.5s" }}
          />
          <div
            className="absolute bottom-10 left-1/4 w-2 h-2 bg-white rounded-full"
            style={{ animation: "twinkle 2s infinite 1s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"
            style={{ animation: "twinkle 2s infinite 1.5s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white rounded-full"
            style={{ animation: "twinkle 2s infinite 0.8s" }}
          />
        </div>

        {/* Background Tech Animations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <FaCode
            className="absolute top-10 left-10 text-green-400 text-3xl"
            style={{ animation: "codePulse 2s ease-in-out infinite" }}
          />
          <FaRocket
            className="absolute top-20 right-0 text-red-400 text-3xl transform rotate-45"
            style={{ animation: "flyAcross 6s linear infinite" }}
          />
          <FaMicrochip
            className="absolute bottom-10 left-1/4 text-blue-400 text-4xl"
            style={{ animation: "chipGlow 3s ease-in-out infinite" }}
          />
          <FaSatellite
            className="absolute top-1/3 right-10 text-gray-300 text-3xl"
            style={{ animation: "orbit 10s linear infinite" }}
          />
          <FaCog
            className="absolute bottom-1/4 left-1/3 text-yellow-400 text-4xl"
            style={{ animation: "spin 5s linear infinite" }}
          />
          <FaCloudDownloadAlt
            className="absolute top-1/2 right-1/4 text-white text-3xl"
            style={{ animation: "float 4s ease-in-out infinite" }}
          />
        </div>

        {/* Tiêu đề */}
        <h1
          className="text-6xl font-bold text-center text-white mb-6 relative z-10 animate-fade-in"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          About Us
          <span
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-2 animate-gradient"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00bfff, transparent)",
              borderRadius: "50%",
              height: "6px",
            }}
          />
        </h1>

        {/* Phần Our Essence */}
        <div
          ref={essenceRef}
          className="text-center mb-12 transition-all duration-1000 ease-in-out opacity-0 translate-y-8 relative z-10 mt-12"
        >
          <h2
            className="text-4xl font-semibold mb-6 relative animate-slide-up"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Essence
            <FaCamera
              className="inline-block ml-2 text-yellow-300 text-3xl"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            At the heart of our studio lies a passion for capturing the soul of
            every moment, blending timeless artistry with heartfelt storytelling.
          </p>
          <div className="flex justify-center gap-8 mt-6">
            <FaCamera
              className="text-white text-4xl animate-icon-slide-left"
              style={{ animationDelay: "0.2s" }}
            />
            <FaImage
              className="text-white text-4xl animate-icon-slide-right"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        {/* Phần Our Mission */}
        <div
          ref={missionRef}
          className="text-center mb-12 transition-all duration-1000 ease-in-out opacity-0 translate-y-8 relative z-10 mt-20"
        >
          <h2
            className="text-4xl font-semibold mb-4 relative animate-slide-up"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Mission
            <FaRobot
              className="inline-block ml-2 text-purple-400 text-3xl"
              style={{ animation: "wave 2s ease-in-out infinite" }}
            />
            <span
              className="absolute left-1/2 transform -translate-x-1/2 w-96 h-2 top-14 animate-gradient"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00bfff, transparent)",
                borderRadius: "50%",
                height: "6px",
              }}
            />
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-10">
            We are committed to delivering a highly personalized experience,
            blending the elegance of traditional photography techniques with modern
            quality standards. By embracing the artistry and craftsmanship of film,
            we help our clients appreciate the true value of everyday moments,
            turning fleeting memories into cherished works of art.
          </p>
          <p
            ref={visionRef}
            className="text-lg text-gray-300 max-w-2xl mx-auto mt-6 transition-all duration-1000 ease-in-out opacity-0 translate-y-8"
          >
            Furthermore, our vision is to become the leading film photography
            studio, where authentic and emotional moments are preserved, bringing
            timeless artistic and nostalgic values.
          </p>
          <div className="mt-8 w-full h-110 relative">
            <img
              src={mainImg}
              alt="Our mission"
              className="w-100 h-100 object-fill rounded-lg shadow-xl mx-auto"
            />
            <FaServer
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-4xl"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Phần div dưới cùng với icon công nghệ */}
        <div className="relative z-10 py-12 border-t border-gray-700 mt-40">
          <div className="absolute inset-0 pointer-events-none">
            <FaBolt
              className="absolute top-10 left-10 text-yellow-400 text-3xl"
              style={{ animation: "flash 1.5s ease-in-out infinite" }}
            />
            <FaDigitalTachograph
              className="absolute top-1/4 right-20 text-green-400 text-3xl"
              style={{ animation: "spin 4s linear infinite" }}
            />
            <FaGlobeAmericas
              className="absolute bottom-10 left-1/3 text-blue-500 text-4xl"
              style={{ animation: "rotate 10s linear infinite" }}
            />
            <FaUserAstronaut
              className="absolute bottom-20 right-1/4 text-white text-3xl"
              style={{ animation: "float 3s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* CSS inline */}
      <style>{`
        .w-100 { width: 30rem; }
        .h-100 { height: 27.5rem; }
        @media (max-width: 640px) {
          .w-100 { width: 100%; }
          .h-100 { height: 15rem; }
          .text-lg { font-size: 1rem; }
          .text-4xl { font-size: 2rem; }
        }

        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        @keyframes slide-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        @keyframes codePulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 1; } }
        @keyframes flyAcross { 0% { transform: translateX(-100vw) rotate(45deg); } 100% { transform: translateX(100vw) rotate(45deg); } }
        @keyframes chipGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes orbit { 0% { transform: rotate(0deg) translateX(50px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes wave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } }
        @keyframes flash { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes rotateEarth { 0% { transform: translateX(-50%) rotate(0deg); } 100% { transform: translateX(-50%) rotate(360deg); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes icon-slide-left { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
        .animate-icon-slide-left { animation: icon-slide-left 0.8s ease-out forwards; }
        @keyframes icon-slide-right { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
        .animate-icon-slide-right { animation: icon-slide-right 0.8s ease-out forwards; }
        .earth { width: 1200px; height: 1200px; }
        @media (max-width: 1024px) { .earth { width: 800px; height: 800px; } }
        @media (max-width: 640px) { .earth { width: 600px; height: 600px; } }
      `}</style>
    </Layout>
  );
};

export default AboutUs;