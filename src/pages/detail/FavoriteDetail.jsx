import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mainImg from "../../assets/memento.jpg";
import outfit1Img from "../../assets/image1.jpg";
import outfit2Img from "../../assets/image2.jpg";
import outfit3Img from "../../assets/image3.jpg";
import outfit4Img from "../../assets/image4.jpg";
import propImg from "../../assets/image5.jpg";
import sample1Img from "../../assets/image3.jpg";
import sample2Img from "../../assets/image4.jpg";
import sample3Img from "../../assets/image2.jpg";
import sample4Img from "../../assets/image1.jpg";

const moodDetails = {
  serene: {
    name: "Serene",
    title: "First Memory",
    subtitle: "Calm",
    mainImage: mainImg,
    colors: ["#F5E6CC", "#D9C2A1", "#8B6F47"],
    outfitImages: [outfit1Img, outfit2Img],
    propImage: propImg,
    sampleImages: [sample1Img, sample2Img],
    theme: {
      background: "linear-gradient(to right, #F5E6CC, #E6D5B8)",
      textColor: "#8B6F47",
      buttonBg: "#8B6F47",
      buttonText: "#FFFFFF",
    },
  },
  nostalgic: {
    name: "Nostalgic",
    title: "Old Times",
    subtitle: "Warm",
    mainImage: mainImg,
    colors: ["#D4A017", "#8B4513", "#4A2C0A"],
    outfitImages: [outfit3Img, outfit4Img],
    propImage: propImg,
    sampleImages: [sample3Img, sample4Img],
    theme: {
      background: "linear-gradient(to right, #D4A017, #A67C00)",
      textColor: "#4A2C0A",
      buttonBg: "#8B4513",
      buttonText: "#FFFFFF",
    },
  },
  cheerful: {
    name: "Cheerful",
    title: "Joyful Days",
    subtitle: "Bright",
    mainImage: mainImg,
    colors: ["#FFD700", "#FF6347", "#FF4500"],
    outfitImages: [outfit1Img, outfit2Img],
    propImage: propImg,
    sampleImages: [sample1Img, sample2Img],
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
  const detailRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Lấy dữ liệu mood dựa trên id
  const mood = moodDetails[id];

  // Kiểm tra nếu id không hợp lệ, chuyển hướng đến NotFound
  useEffect(() => {
    if (!mood) {
      navigate("/notfound", { replace: true });
    }
  }, [mood, navigate]);

  // useEffect cho IntersectionObserver
  useEffect(() => {
    const detailElement = detailRef.current;

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

    if (detailElement) {
      observer.observe(detailElement);
    }

    return () => {
      if (detailElement) observer.unobserve(detailElement);
    };
  }, []);

  // Nếu mood không tồn tại, không render gì cả (trong khi chuyển hướng)
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

  // Xử lý nút Contact: Hiển thị modal và điều hướng sang /contact
  const handleContact = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/contact", {
        state: {
          mood: mood, // Truyền toàn bộ dữ liệu mood
        },
      });
    }, 5000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/contact", {
      state: {
        mood: mood,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen z-10">
        <div
          ref={detailRef}
          className="w-full max-w-3xl p-8 rounded-lg shadow-lg transition-all duration-1000 ease-in-out opacity-0 translate-y-8"
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
            Back
          </button>

          <div className="relative">
            <img
              src={mood.mainImage}
              alt={mood.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleImageClick(mood.mainImage)}
            />
            <button
              className="absolute top-2 left-2 text-sm px-4 py-2 rounded-full shadow-md scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: mood.theme.buttonBg,
                color: mood.theme.buttonText,
              }}
            >
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
              <span className="mr-2">🎨</span> Color Palette
            </h2>
            <div className="flex justify-center gap-4">
              {mood.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full shadow-md"
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
              <span className="mr-2">👗</span> Outfit
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {mood.outfitImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Outfit ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: mood.theme.textColor }}
            >
              <span className="mr-2">🛠️</span> Props
            </h2>
            <img
              src={mood.propImage}
              alt="Prop"
              className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => handleImageClick(mood.propImage)}
            />
          </div>

          <div className="mt-8">
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: mood.theme.textColor }}
            >
              <span className="mr-2">📸</span> Sample Photos
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {mood.sampleImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Sample ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleImageClick(img)}
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
              <span className="mr-2">📞</span> Contact
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
              className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
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

        img.cursor-pointer:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FavoritesDetail;
