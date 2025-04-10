import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import mainImg1 from "../../assets/duoitancay.png";
import mainImg2 from "../../assets/giadinh.jpg";
import mainImg3 from "../../assets/phieudu4.jpg";
import outfit1Img from "../../assets/duoitancay6.png";
import outfit2Img from "../../assets/duoitancay9.jpg";
import outfit3Img from "../../assets/giadinh1.jpg";
import outfit4Img from "../../assets/giadinh2.jpg";
import outfit5Img from "../../assets/phieudu7.png";
import outfit6Img from "../../assets/phieudu5.png";
import propImg from "../../assets/duoitancay7.jpg";
import propImg1 from "../../assets/giadinh3.jpg";
import propImg3 from "../../assets/phieudu6.jpg";
import sample1Img from "../../assets/duoitancay8.jpg";
import sample2Img from "../../assets/duoitancay10.jpg";
import sample3Img from "../../assets/giadinh4.jpg";
import sample4Img from "../../assets/giadinh5.jpg";
import sample5Img from "../../assets/phieudu7.jpg";
import sample6Img from "../../assets/phieudu8.jpg";
import {
  FaStar,
  FaHeart,
  FaCameraRetro,
  FaRocket,
  FaSun,
  FaMoon,
  FaUserAstronaut,
  FaSatellite,
  FaFlag,
  FaMountain,
  FaHome,
} from "react-icons/fa";

const moodDetails = {
  saigon1: {
    name: "Dưới tán cây",
    title: "Sài Gòn",
    subtitle: "Chụp ở các địa điểm nổi tiếng ở Sài Gòn",
    mainImage: mainImg1,
    colors: ["#bd3b1f", "#ec921f", "#dfcf12", "#56bd22", "#cf3dcf"],
    outfitImages: [outfit1Img, outfit2Img],
    propImage: propImg,
    sampleImages: [sample1Img, sample2Img],
    theme: {
      background: "linear-gradient(to right, #bd3b1f, #cf3dcf)",
      textColor: "#dfcf12",
      buttonBg: "#bac751",
      buttonText: "#c24931",
    },
  },
  saigon2: {
    name: "Gia Định",
    title: "Sài Gòn",
    subtitle: "Chụp ở các địa điểm nổi tiếng ở Sài Gòn - Gia Định",
    mainImage: mainImg2,
    colors: ["#bd3b1f", "#deafa5", "#e5dc32"],
    outfitImages: [outfit3Img, outfit4Img],
    propImage: propImg1,
    sampleImages: [sample3Img, sample4Img],
    theme: {
      background: "linear-gradient(to right, #080807, #516378)",
      textColor: "#f7f8ed",
      buttonBg: "#8B4513",
      buttonText: "#FFFFFF",
    },
  },
  saigon3: {
    name: "Phiêu du",
    title: "Sài Gòn",
    subtitle: "Chụp ở các địa điểm nổi tiếng ở Sài Gòn - Phiêu du",
    mainImage: mainImg3,
    colors: ["#FFD700", "#FF6347", "#FF4500"],
    outfitImages: [outfit5Img, outfit6Img],
    propImage: propImg3,
    sampleImages: [sample5Img, sample6Img],
    theme: {
      background: "linear-gradient(to right, #FFD700, #FF8C00)",
      textColor: "#FF4500",
      buttonBg: "#FF6347",
      buttonText: "#FFFFFF",
    },
  },
};

const FavoritesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [detailRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const mood = moodDetails[id];

  useEffect(() => {
    if (!mood) {
      navigate("/notfound", { replace: true });
    }
  }, [mood, navigate]);

  if (!mood) {
    return null;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsZoomed(false);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setIsZoomed(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed((prev) => !prev);
  };

  const handleContact = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/contact", { state: { mood } });
    }, 5000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/contact", { state: { mood } });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 relative overflow-hidden">
      {/* Background Icons with Animations */}
      <div className="absolute inset-0 pointer-events-none z-0">
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
        <div
          className="absolute top-10 left-0 w-4 h-1 bg-yellow-300 rounded-full"
          style={{ animation: "flyAcross 5s linear infinite 2s" }}
        />
        <div
          className="absolute top-15 left-0 w-4 h-1 bg-yellow-300 rounded-full"
          style={{ animation: "flyAcross 5s linear infinite 3s" }}
        />
        <div
          className="absolute top-5 left-0 w-4 h-1 bg-yellow-300 rounded-full"
          style={{ animation: "flyAcross 5s linear infinite 1s" }}
        />
        <FaSun
          className="absolute top-10 right-10 text-yellow-400 text-4xl"
          style={{ animation: "float 4s infinite" }}
        />
        <FaMoon
          className="absolute top-20 left-1/4 text-white text-4xl"
          style={{ animation: "orbit 10s linear infinite" }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-10 h-10 bg-purple-400 rounded-full"
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
        <FaRocket
          className="absolute top-2/3 left-0 text-red-400 text-5xl transform rotate-45"
          style={{ animation: "flyAcross 10s linear infinite" }}
        />
        <FaUserAstronaut
          className="absolute bottom-10 left-1/4 text-white text-4xl"
          style={{ animation: "wave 2s infinite" }}
        />
        <FaSatellite
          className="absolute bottom-20 right-1/3 text-gray-300 text-3xl"
          style={{ animation: "orbitEarth 5s linear infinite" }}
        />
        <FaFlag
          className="absolute bottom-10 right-10 text-red-500 text-3xl"
          style={{ animation: "pulse 2s infinite" }}
        />
        <FaMountain
          className="absolute bottom-15 left-1/2 text-gray-600 text-3xl"
          style={{ animation: "float 3s infinite" }}
        />
        <FaHome
          className="absolute bottom-20 left-1/5 text-brown-500 text-3xl"
          style={{ animation: "bounce 2s infinite" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen z-10">
        <div
          ref={detailRef}
          className={`w-full max-w-3xl p-8 rounded-lg shadow-lg transition-all duration-1000 ease-in-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ background: mood.theme.background }}
        >
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-sm px-4 py-2 rounded-full shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: mood.theme.buttonBg,
              color: mood.theme.buttonText,
            }}
          >
            <FaRocket className="inline-block mr-2 animate-bounce" /> Back
          </button>

          <div className="relative">
            <img
              src={mood.mainImage}
              alt={mood.title}
              className={`w-full h-80 object-cover rounded-lg shadow-lg cursor-pointer transition-transform duration-500 ease-in-out ${
                inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
              } hover:scale-105`}
              onClick={() => handleImageClick(mood.mainImage)}
            />
            <button
              className="absolute top-2 left-2 text-sm px-4 py-2 rounded-full shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: mood.theme.buttonBg,
                color: mood.theme.buttonText,
              }}
            >
              <FaStar className="inline-block mr-2 animate-twinkle" />
              {mood.name.toUpperCase()}
            </button>
          </div>

          <h1
            className="text-4xl font-bold text-center mt-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: mood.theme.textColor,
            }}
          >
            {mood.title}
          </h1>
          <p
            className="text-lg text-center mt-2"
            style={{ color: mood.theme.textColor }}
          >
            {mood.subtitle}
          </p>

          <div className="mt-8">
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: mood.theme.textColor }}
            >
              <FaHeart className="mr-2 animate-pulse" /> Color Palette
            </h2>
            <div className="flex justify-center gap-4">
              {mood.colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full shadow-md transition-transform duration-500 ease-in-out ${
                    inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  } hover:scale-110`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: mood.theme.textColor }}
            >
              <FaCameraRetro className="mr-2 animate-bounce" /> Outfit
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {mood.outfitImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Outfit ${index + 1}`}
                  className={`w-full h-40 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-500 ease-in-out ${
                    inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } hover:scale-105`}
                  onClick={() => handleImageClick(img)}
                  style={{ transitionDelay: `${index * 100}ms` }} // Delay để ảnh xuất hiện lần lượt
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: mood.theme.textColor }}
            >
              <FaSun className="mr-2 animate-float" /> Props
            </h2>
            <img
              src={mood.propImage}
              alt="Prop"
              className={`w-full h-40 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-500 ease-in-out ${
                inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
              } hover:scale-105`}
              onClick={() => handleImageClick(mood.propImage)}
            />
          </div>

          <div className="mt-8">
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: mood.theme.textColor }}
            >
              <FaMoon className="mr-2 animate-orbit" /> Sample Photos
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {mood.sampleImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Sample ${index + 1}`}
                  className={`w-full h-40 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-500 ease-in-out ${
                    inView ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } hover:scale-105`}
                  onClick={() => handleImageClick(img)}
                  style={{ transitionDelay: `${index * 100}ms` }} // Delay để ảnh xuất hiện lần lượt
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContact}
              className="flex items-center px-6 py-3 rounded-full shadow-lg scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: mood.theme.buttonBg,
                color: mood.theme.buttonText,
              }}
            >
              <FaUserAstronaut className="mr-2 animate-wave" /> Contact
            </button>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Zoomed"
              className={`max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              style={{
                cursor: isZoomed ? "zoom-out" : "zoom-in",
              }}
              onClick={handleZoomToggle}
            />
            <button
              onClick={handleCloseImage}
              className="absolute top-4 right-4 text-white text-3xl font-bold scale-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
              Mood "{mood.name}" has been submitted successfully!
            </p>
            <button
              onClick={closeSuccessModal}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* Hiệu ứng cho modal thành công */
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

        /* Animations từ Homepage */
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        .animate-orbit {
          animation: orbit 10s linear infinite;
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
        .animate-float {
          animation: float 4s infinite;
        }

        @keyframes flyAcross {
          0% { transform: translateX(-100vw); }
          100% { transform: translateX(100vw); }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
        }

        @keyframes orbitEarth {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .max-w-3xl {
            max-width: 100%;
          }
          .h-80 {
            height: 16rem;
          }
          .h-40 {
            height: 12rem;
          }
          .text-4xl {
            font-size: 2rem;
          }
          .text-xl {
            font-size: 1.125rem;
          }
          .text-lg {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FavoritesDetail;
