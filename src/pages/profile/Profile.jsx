import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg"; // Ảnh mặc định cho package

const Profile = () => {
  const navigate = useNavigate();

  // Dữ liệu giả định cho userInfo
  const userInfo = {
    username: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc0Cry8E_MF-5Qkl5umnXnZ77LI0B8tYKTn-nIG48KTFKnzxLHhIP2Usqb8Hsq0ERpH8_pM0M06a1kB-A0CToMw", // Ảnh đại diện
  };

  // Dữ liệu giả định cho favorites
  const favorites = [
    {
      id: "Package 1",
      description: "Beautiful Sunset",
      price: "$100",
      src: mainImg,
    },
    {
      id: "Package 2",
      description: "Mountain Adventure",
      price: "$200",
      src: mainImg,
    },
    {
      id: "Package 3",
      description: "City Lights",
      price: "$300",
      src: mainImg,
    },
  ];

  // Refs để theo dõi các div khi scroll
  const profileRef = useRef(null);
  const favoritesRef = useRef(null);

  // State để kiểm soát hiệu ứng khi scroll
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);

  // Hiệu ứng scroll để load từng div
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === profileRef.current) {
            setIsProfileVisible(true);
          }
          if (entry.target === favoritesRef.current) {
            setIsFavoritesVisible(true);
          }
        }
      });
    }, observerOptions);

    if (profileRef.current) observer.observe(profileRef.current);
    if (favoritesRef.current) observer.observe(favoritesRef.current);

    return () => {
      if (profileRef.current) observer.unobserve(profileRef.current);
      if (favoritesRef.current) observer.unobserve(favoritesRef.current);
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b primary py-12 relative overflow-hidden">
        {/* Hiệu ứng hạt sáng trên nền */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="sparkle"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Phần thông tin người dùng */}
          <div
            ref={profileRef}
            className={`transition-all duration-1000 ease-in-out transform ${
              isProfileVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } bg-white rounded-lg shadow-2xl p-8 max-w-2xl mx-auto mb-12 relative overflow-hidden`}
          >
            {/* Hiệu ứng sóng nền cho phần Profile */}
            <div className="absolute inset-0 wave-bg"></div>

            <h1
              className="text-5xl font-bold text-center text-gray-800 mb-8 animate-twinkle relative z-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Profile
              <span
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #ff0000, transparent)",
                  borderRadius: "50%",
                  height: "4px",
                }}
              />
            </h1>
            <div className="flex flex-col items-center relative z-10">
              {/* Avatar với hiệu ứng xoay và phát sáng */}
              <div className="relative group mb-6 cursor-pointer">
                <img
                  src={userInfo.image}
                  alt="User Avatar"
                  className="w-40 h-40 rounded-full object-cover cursor-pointer border-4 border-gray-300 shadow-lg transition-transform duration-500 group-hover:scale-110 animate-spin-slow"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-30 transition-opacity duration-500 glow-effect"></div>
              </div>
              {/* Thông tin người dùng với hiệu ứng chuyển màu */}
              <div className="text-center space-y-4">
                <div
                  className="animate-slideIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <p className="text-xl font-semibold text-gray-800 animate-text-glow">
                    Name
                  </p>
                  <p className="text-lg text-gray-600">{userInfo.username}</p>
                </div>
                <div
                  className="animate-slideIn"
                  style={{ animationDelay: "0.4s" }}
                >
                  <p className="text-xl font-semibold text-gray-800 animate-text-glow">
                    Email
                  </p>
                  <p className="text-lg text-gray-600">{userInfo.email}</p>
                </div>
                <div
                  className="animate-slideIn"
                  style={{ animationDelay: "0.6s" }}
                >
                  <p className="text-xl font-semibold text-gray-800 animate-text-glow">
                    Phone
                  </p>
                  <p className="text-lg text-gray-600">{userInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phần danh sách favorites */}
          <div
            ref={favoritesRef}
            className={`transition-all duration-1000 ease-in-out transform ${
              isFavoritesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2
              className="text-5xl font-bold text-center text-white mb-8 relative animate-twinkle"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Saved Packages
              <span
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #ff0000, transparent)",
                  borderRadius: "50%",
                  height: "4px",
                }}
              />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="relative group cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Ảnh package với hiệu ứng lấp lánh */}
                  <div className="relative">
                    <img
                      src={pkg.src}
                      alt={pkg.description}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl"
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                    />
                    <div className="absolute inset-0 sparkle-effect"></div>
                  </div>
                  {/* Thông tin package với hiệu ứng hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-center py-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                    }}
                  >
                    {pkg.description}
                  </div>
                  <div
                    className="absolute top-4 left-4 bg-amber-200 text-black text-center py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                    }}
                  >
                    {pkg.price}
                  </div>
                  {/* Hiệu ứng viền sáng khi hover */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS tùy chỉnh cho animation */}
      <style>{`
        

        /* Hiệu ứng phát sáng cho avatar */
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(79, 70, 229, 1);
          }
        }
        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }

        /* Hiệu ứng chuyển màu cho text */
        @keyframes text-glow {
          0%, 100% {
            color: #1f2937;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
          50% {
            color: #4f46e5;
            text-shadow: 0 0 10px rgba(79, 70, 229, 0.8);
          }
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }

        /* Hiệu ứng sóng nền cho phần Profile */
        @keyframes wave {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .wave-bg {
          background: linear-gradient(45deg, #e0e7ff, #c7d2fe, #e0e7ff);
          background-size: 200% 200%;
          animation: wave 10s ease-in-out infinite;
          opacity: 0.1;
        }

        /* Hiệu ứng lấp lánh cho ảnh package */
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .sparkle-effect {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 10%);
          background-size: 20px 20px;
          animation: sparkle 2s infinite;
        }

        /* Hiệu ứng hạt sáng trên nền */
        .sparkle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          animation: sparkle-move 5s infinite;
        }
        .sparkle-2 {
          top: 20%;
          left: 80%;
          animation-delay: 1s;
        }
        .sparkle-3 {
          top: 60%;
          left: 30%;
          animation-delay: 2s;
        }
        @keyframes sparkle-move {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(100px, 100px);
            opacity: 0;
          }
        }

        /* Hiệu ứng twinkle cho tiêu đề */
        @keyframes twinkle {
          0%, 100% {
            filter: brightness(1);
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          50% {
            filter: brightness(1.5);
            text-shadow: 0 0 15px rgba(255, 255, 255, 1);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        /* Hiệu ứng slideIn cho thông tin người dùng */
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.8s ease-in-out forwards;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
