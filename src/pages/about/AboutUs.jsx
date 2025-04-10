import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  FaLaptopCode,
  FaRobot,
  FaCode,
  FaRocket,
  FaMicrochip,
  FaSatellite,
  FaCog,
  FaCloudDownloadAlt,
  FaUserAstronaut,
  FaServer,
  FaBolt,
  FaDigitalTachograph,
  FaGlobeAmericas,
} from "react-icons/fa";

const teamMembers = [
  { name: "Alice Smith", position: "UI/UX Designer", image: mainImg },
  { name: "Bob Johnson", position: "Full-Stack Developer", image: mainImg },
  { name: "Charlie Brown", position: "AI Specialist", image: mainImg },
  { name: "Diana Lee", position: "Cybersecurity Expert", image: mainImg },
  { name: "Eve Davis", position: "Product Manager", image: mainImg },
  { name: "Frank Wilson", position: "DevOps Engineer", image: mainImg },
  { name: "Grace Taylor", position: "Data Scientist", image: mainImg },
  { name: "Henry Clark", position: "Blockchain Developer", image: mainImg },
  { name: "Ivy Moore", position: "Cloud Architect", image: mainImg },
];

const AboutUs = () => {
  const ceoRef = useRef(null);
  const memberRefs = useRef([]);
  const missionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ceoElement = ceoRef.current;
    const memberElements = memberRefs.current.filter(Boolean); // Loại bỏ null/undefined
    const missionElement = missionRef.current;

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

    if (ceoElement) observer.observe(ceoElement);
    if (!isMobile) {
      // Chỉ áp dụng observer cho grid (desktop), không áp dụng cho Swiper
      memberElements.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }
    if (missionElement) observer.observe(missionElement);

    return () => {
      if (ceoElement) observer.unobserve(ceoElement);
      memberElements.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      if (missionElement) observer.unobserve(missionElement);
    };
  }, [isMobile]);

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

        {/* Hình ảnh CEO */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="text-center">
            <img
              ref={ceoRef}
              src={mainImg}
              alt="CEO"
              className="w-64 h-64 object-cover rounded-full shadow-lg mx-auto transition-all duration-1000 ease-in-out opacity-0 translate-y-8 group relative"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 tech-glow-effect"></div>
            <h2
              className="text-2xl font-semibold mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our CEO
            </h2>
            <p className="text-lg text-gray-300">John Doe</p>
          </div>
        </div>

        {/* Danh sách thành viên */}
        <div className="mb-12 relative z-10">
          <h2
            className="text-3xl font-semibold text-center mb-6 animate-slide-up"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Team
            <FaLaptopCode
              className="inline-block ml-2 text-blue-400 text-3xl"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
          </h2>
          {isMobile ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="swiper-container"
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 object-cover rounded-md shadow-lg mx-auto" // Bỏ opacity-0 và translate-y-8
                    />
                    <h3
                      className="text-lg font-semibold mt-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-md text-gray-300">{member.position}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    ref={(el) => (memberRefs.current[index] = el)}
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 object-cover rounded-md shadow-lg mx-auto transition-all duration-1000 ease-in-out opacity-0 translate-y-8 hover:scale-105"
                  />
                  <h3
                    className="text-lg font-semibold mt-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-md text-gray-300">{member.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phần Our Mission */}
        <div
          ref={missionRef}
          className="text-center mb-12 transition-all duration-1000 ease-in-out opacity-0 translate-y-8 relative z-10"
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
            We aim to push the boundaries of technology, delivering innovative
            solutions that shape the future and enhance lives globally.
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
        @media (max-width: 640px) {
          .w-64 { width: 12rem; height: 12rem; }
        }
        .grid { display: grid; justify-items: center; }
        .w-40 { width: 10rem; height: 10rem; }
        @media (max-width: 640px) {
          .w-40 { width: 8rem; height: 8rem; }
          .text-lg { font-size: 1rem; }
          .text-md { font-size: 0.875rem; }
        }
        @media (max-width: 768px) {
          .md\\:grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .sm\\:grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        }
        .w-120 { width: 30rem; }
        .h-110 { height: 27.5rem; }
        @media (max-width: 640px) {
          .w-120 { width: 100%; }
          .h-110 { height: 15rem; }
        }
        .swiper-container { width: 100%; padding-bottom: 2rem; }
        .swiper-slide { display: flex; justify-content: center; align-items: center; }
        .swiper-pagination-bullet { background: #00bfff; opacity: 0.8; }
        .swiper-pagination-bullet-active { background: #00bfff; opacity: 1; }

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
        @keyframes tech-glow { 0%, 100% { box-shadow: 0 0 10px rgba(0, 191, 255, 0.5); } 50% { box-shadow: 0 0 20px rgba(0, 191, 255, 1); } }
        .tech-glow-effect { animation: tech-glow 2s ease-in-out infinite; }
        .earth { width: 1200px; height: 1200px; }
        @media (max-width: 1024px) { .earth { width: 800px; height: 800px; } }
        @media (max-width: 640px) { .earth { width: 600px; height: 600px; } }
      `}</style>
    </Layout>
  );
};

export default AboutUs;
