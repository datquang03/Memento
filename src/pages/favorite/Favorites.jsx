import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import sereneImg from "../../assets/duoitancay7.jpg";
import nostalgicImg from "../../assets/giadinh3.jpg";
import cheerfulImg from "../../assets/phieudu20.png";
import {
  FaSmile,
  FaHeart,
  FaLeaf,
  FaCameraRetro,
  FaCloudSun,
  FaMusic,
  FaStar,
  FaFeather,
  FaPalette,
  FaSun,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

// Dữ liệu mood
const moodData = [
  { id: "saigon1", name: "Nàng Thơ", image: sereneImg },
  { id: "saigon2", name: "Hoài Cổ", image: nostalgicImg },
  { id: "saigon3", name: "Hiện Đại ", image: cheerfulImg },
];

const Favorites = () => {
  const moodboardRef = useRef(null);
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const welcomeTextRef = useRef();
  const descriptionRef = useRef();
  const cameraRef = useRef();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Animation khi vào trang
  useEffect(() => {
    // Animation chữ "Welcome to Memento" bên trái
    gsap.fromTo(
      welcomeTextRef.current,
      { opacity: 0, x: -100, scale: 0.5 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5,
      }
    );

    // Animation description: xuất hiện từ dưới lên
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1,
      }
    );

    // Animation máy ảnh: di chuyển từ bên phải vào và xoay
    gsap.fromTo(
      cameraRef.current,
      { right: "-300px", rotate: 0 },
      {
        right: window.innerWidth <= 640 ? "20px" : "50px", // Điều chỉnh vị trí dừng trên điện thoại
        rotate: 360,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          // Hiệu ứng rung nhẹ khi máy ảnh dừng lại
          gsap.to(cameraRef.current, {
            rotate: 365,
            duration: 0.3,
            repeat: 3,
            yoyo: true,
            ease: "power1.inOut",
          });
          // Sau khi animation hoàn tất, chờ 1 giây rồi hiển thị nội dung chính
          setTimeout(() => {
            setShowContent(true);
          }, 1000);
        },
      }
    );
  }, []);

  // Intersection Observer cho nội dung chính
  useEffect(() => {
    if (!showContent) return;

    const moodboardElement = moodboardRef.current;
    const options = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (moodboardElement) observer.observe(moodboardElement);
    return () => {
      if (moodboardElement) observer.unobserve(moodboardElement);
    };
  }, [showContent]);

  const handleMoodClick = (id) => {
    const isValidMood = moodData.some((mood) => mood.id === id);
    navigate(isValidMood ? `/favorites/${id}` : "/notfound");
  };

  const moodIcons = new Array(30).fill(null).map((_, i) => {
    const icons = [
      FaSmile,
      FaHeart,
      FaLeaf,
      FaCameraRetro,
      FaCloudSun,
      FaMusic,
      FaStar,
      FaFeather,
      FaPalette,
      FaSun,
    ];
    return icons[i % icons.length];
  });

  // Tạo các ngôi sao và hạt lấp lánh
  const stars = new Array(10).fill(null).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 10 + 5}px`,
    delay: Math.random() * 2,
  }));

  const sparkles = new Array(15).fill(null).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 8 + 3}px`,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="primary relative min-h-screen flex justify-center items-center py-8">
      {/* Animation Intro */}
      {!showContent && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          {/* Ngôi sao nhấp nháy */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}

          {/* Hạt lấp lánh di chuyển */}
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                top: sparkle.top,
                left: sparkle.left,
                width: sparkle.size,
                height: sparkle.size,
                animationDuration: `${sparkle.duration}s`,
              }}
            />
          ))}

          {/* Chữ "Welcome to Memento" và description bên trái */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
            <h1
              ref={welcomeTextRef}
              className="text-6xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome to Memento
            </h1>
            <p
              ref={descriptionRef}
              className="text-xl mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We prove to bring the best photobooth for you
            </p>
          </div>

          {/* Máy ảnh CSS bên phải */}
          <div ref={cameraRef} className="camera-container">
            <div className="camera-body">
              <div className="camera-lens"></div>
              <div className="camera-shutter-button"></div>
              <div className="camera-top-details">
                <div className="camera-dial"></div>
                <div className="camera-viewfinder"></div>
              </div>
              <div className="camera-front-details">
                <div className="camera-grip"></div>
                <div className="camera-logo"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nội dung chính */}
      {showContent && (
        <>
          <div
            ref={ref}
            className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none transition-all duration-1000 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            {moodIcons.map((Icon, idx) => (
              <div
                key={idx}
                className={`absolute icon-float animate-float${
                  (idx % 8) + 1
                } text-white text-opacity-40`}
                style={{
                  top: `${5 + ((idx * 7) % 90)}%`,
                  left: `${5 + ((idx * 13) % 90)}%`,
                  fontSize: `${16 + (idx % 5) * 4}px`,
                }}
              >
                <Icon />
              </div>
            ))}
          </div>

          <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-screen z-10 relative overflow-hidden">
            <div
              ref={moodboardRef}
              className="border-2 border-amber-100 rounded-lg shadow-lg bg-gradient-to-r from-amber-300 to-amber-400 w-full max-w-4xl p-6 transition-all duration-1000 ease-in-out opacity-0 translate-y-8 overflow-hidden backdrop-blur-md bg-opacity-80 relative"
            >
              <h1
                className="text-5xl font-bold text-center text-white mb-4 relative"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Moodboard
                <span
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-2"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #ff0000, transparent)",
                    borderRadius: "50%",
                    height: "6px",
                  }}
                />
              </h1>

              <p className="text-base text-gray-800 mb-6 text-center">
                Select a mood to see the corresponding style and props.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 moodboard-container z-10 relative">
                {moodData.map((mood) => (
                  <div
                    key={mood.id}
                    className="moodboard-item"
                    onClick={() => handleMoodClick(mood.id)}
                  >
                    <img
                      src={mood.image}
                      alt={mood.name}
                      className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-500 ease-in-out cursor-pointer"
                    />
                    <h3
                      className="text-lg font-semibold mt-3 text-gray-800 text-center"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {mood.name}
                    </h3>
                  </div>
                ))}
              </div>

              <button className="back-to-home-btn px-4 py-2 bg-red-500 text-white text-base font-semibold rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer mt-6 mx-auto block" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        /* CSS cho máy ảnh dạng line art */
        .camera-container {
          position: absolute;
          top: 50%;
          right: -300px; /* Bắt đầu từ ngoài màn hình bên phải */
          transform: translateY(-50%);
          width: 200px;
          height: 150px;
        }

        .camera-body {
          position: relative;
          width: 100%;
          height: 100%;
          border: 2px solid white;
          border-radius: 10px;
          background: transparent;
        }

        /* Ống kính */
        .camera-lens {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border: 2px solid white;
          border-radius: 50%;
        }
        .camera-lens::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border: 2px solid white;
          border-radius: 50%;
        }

        /* Nút chụp */
        .camera-shutter-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          border: 2px solid white;
          border-radius: 50%;
        }

        /* Chi tiết trên đỉnh máy ảnh */
        .camera-top-details {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 30px;
        }
        .camera-dial {
          position: absolute;
          top: 5px;
          left: 20px;
          width: 15px;
          height: 15px;
          border: 2px solid white;
          border-radius: 50%;
        }
        .camera-viewfinder {
          position: absolute;
          top: 5px;
          right: 40px;
          width: 30px;
          height: 15px;
          border: 2px solid white;
          border-radius: 5px;
        }

        /* Chi tiết mặt trước */
        .camera-front-details {
          position: absolute;
          bottom: 10px;
          left: 70px;
          width: 100%;
          height: 30px;
        }
        .camera-grip {
          position: absolute;
          left: 0;
          width: 20px;
          height: 40px;
          border: 2px solid white;
          border-radius: 5px;
        }
        .camera-logo {
          position: absolute;
          left: 30px;
          width: 40px;
          height: 10px;
          border: 2px solid white;
          border-radius: 3px;
        }

        /* Ngôi sao nhấp nháy */
        .star {
          position: absolute;
          background: white;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        /* Hạt lấp lánh di chuyển */
        .sparkle {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: sparkle 5s infinite;
        }

        @keyframes sparkle {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { transform: translate(20px, -20px); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 0; }
        }

        /* CSS cho nút "Back to Home" */
        .back-to-home-btn {
          width: 12rem; /* Kích thước cố định */
          border: 2px solid white; /* Thêm border */
          padding: 0.5rem 1rem; /* Padding gọn gàng */
          background-color: #ef4444; /* Màu nền đỏ */
          color: white;
          font-size: 1rem; /* Kích thước chữ */
          font-weight: 600;
          border-radius: 9999px; /* Bo tròn */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: block;
          margin: 1.5rem auto;
          cursor: pointer;
        }
        .back-to-home-btn:hover {
          background-color: #dc2626;
          transform: scale(1.05);
        }

        /* CSS cho nội dung chính */
        .moodboard-container { position: relative; }
        .moodboard-item img { transition: filter 0.5s ease-in-out, transform 0.5s ease-in-out; }
        .moodboard-item:hover img { filter: grayscale(0%) brightness(100%) !important; transform: scale(1.05); z-index: 10; }
        .moodboard-item:hover ~ .moodboard-item img,
        .moodboard-container:hover .moodboard-item img {
          filter: grayscale(100%) brightness(50%);
        }

        .icon-float {
          animation-duration: 12s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: transform;
          opacity: 0.5;
        }
        .animate-float1 { animation-name: float1; }
        .animate-float2 { animation-name: float2; }
        .animate-float3 { animation-name: float3; }
        .animate-float4 { animation-name: float4; }
        .animate-float5 { animation-name: float5; }
        .animate-float6 { animation-name: float6; }
        .animate-float7 { animation-name: float7; }
        .animate-float8 { animation-name: float8; }

        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(10deg); } }
        @keyframes float5 { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-18px) scale(1.1); } }
        @keyframes float6 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-10px, -10px); } }
        @keyframes float7 { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(10px, -5px); } }
        @keyframes float8 { 0%, 100% { transform: translate(0px, 0px) rotate(0deg); } 50% { transform: translate(-5px, -15px) rotate(5deg); } }

        /* Responsive cho điện thoại */
        @media (max-width: 640px) {
          .primary {
            height: auto;
            overflow-y: auto;
          }
          .min-h-screen {
            min-height: 100vh;
          }
          .text-5xl {
            font-size: 2.5rem;
          }
          .w-80 {
            width: 12rem;
          }
          .h-64 {
            height: 14rem;
          }
          .text-6xl {
            font-size: 3rem;
          }
          .text-xl {
            font-size: 1.25rem;
          }
          .text-base {
            font-size: 1rem;
          }
          .text-lg {
            font-size: 1.25rem;
          }
          .p-6 {
            padding: 1.5rem;
          }
          .icon-float {
            font-size: 0.875rem !important;
          }
          .mb-6 {
            margin-bottom: 1.5rem;
          }
          .mt-6 {
            margin-top: 1.5rem;
          }
          .gap-6 {
            gap: 1.5rem;
          }
          .camera-container {
            width: 150px;
            height: 100px;
            right: -200px; /* Điều chỉnh vị trí ban đầu cho màn hình nhỏ */
          }
          .camera-lens {
            width: 40px;
            height: 40px;
          }
          .camera-lens::before {
            width: 20px;
            height: 20px;
          }
          .camera-shutter-button {
            width: 15px;
            height: 15px;
          }
          .camera-dial {
            width: 10px;
            height: 10px;
          }
          .camera-viewfinder {
            width: 20px;
            height: 10px;
          }
          .camera-grip {
            width: 15px;
            height: 30px;
          }
          .camera-logo {
            width: 30px;
            height: 8px;
          }
          .star, .sparkle {
            width: 5px !important;
            height: 5px !important;
          }
          .left-10 {
            left: 5px; /* Giảm khoảng cách bên trái trên màn hình nhỏ */
          }
          .mt-4 {
            margin-top: 1rem; /* Giảm khoảng cách giữa tiêu đề và description */
          }
          /* Đảm bảo nút "Back to Home" không bị thay đổi */
          .back-to-home-btn {
            width: 12rem;
            border: 2px solid white;
            padding: 0.5rem 1rem;
            font-size: 1rem;
          }
        }

        /* Desktop tối ưu hóa */
        @media (min-width: 641px) {
          .primary {
            min-height: 100vh;
          }
          .max-w-4xl {
            max-width: 56rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Favorites;
