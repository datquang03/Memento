import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import sereneImg from "../../assets/duoitancay4.jpg"; // Hình ảnh từ Packages
import nostalgicImg from "../../assets/giadinh6.jpg"; // Hình ảnh từ Packages
import cheerfulImg from "../../assets/phieudu.jpg"; // Hình ảnh từ Packages
import {
  FaTree,
  FaMountain,
  FaSun,
  FaCloud,
  FaLeaf,
  FaWater,
  FaWind,
  FaFeatherAlt,
} from "react-icons/fa"; // Icon chủ đề thiên nhiên
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Dữ liệu mẫu cho favorites (đồng bộ với PackageDetail)
const favorites = [
  {
    id: "duoitancay",
    src: sereneImg,
    description: "Dưới Tán Cây",
    price: "3.000.000đ",
  },
  {
    id: "giadinh",
    src: nostalgicImg,
    description: "Gia Định",
    price: "3.000.000đ",
  },
  {
    id: "phieudu",
    src: cheerfulImg,
    description: "Phiêu Du",
    price: "3.000.000đ",
  },
];

// Định nghĩa PackageSlide component
const PackageSlide = ({ src, id, description, price }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    console.log("Navigating to:", `/packages/${id}`);
    navigate(`/packages/${id}`);
  };

  return (
    <div className="relative group cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
      <div className="relative">
        <img
          src={src}
          id={id}
          className={`w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl cursor-pointer ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          onLoad={() => setIsLoaded(true)}
          onClick={handleClick}
        />
        <div className="absolute inset-0 leaf-fall-effect pointer-events-none"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent text-white text-center py-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "24px",
        }}
      >
        {description}
      </div>
      <div
        className="absolute top-4 left-4 bg-amber-200 text-black text-center py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "24px",
        }}
      >
        {price}
      </div>
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-green-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};

const Profile = () => {
  const userInfo = {
    username: "Ronaldo",
    email: "ronaldo@example.com",
    phone: "123-456-7890",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc0Cry8E_MF-5Qkl5umnXnZ77LI0B8tYKTn-nIG48KTFKnzxLHhIP2Usqb8Hsq0ERpH8_pM0M06a1kB-A0CToMw",
  };

  const profileRef = useRef(null);
  const favoritesRef = useRef(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);

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
      <div className="min-h-screen primary py-12 relative overflow-hidden">
        {/* Background Animations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Falling Leaves */}
          <FaLeaf
            className="absolute top-10 left-10 text-green-500 text-2xl"
            style={{ animation: "fall 5s linear infinite" }}
          />
          <FaLeaf
            className="absolute top-20 right-20 text-green-600 text-2xl"
            style={{ animation: "fall 6s linear infinite 1s" }}
          />
          <FaLeaf
            className="absolute top-40 left-20 text-green-400 text-2xl"
            style={{ animation: "fall 4s linear infinite 2s" }}
          />

          {/* Floating Clouds */}
          <FaCloud
            className="absolute top-10 right-10 text-white text-4xl"
            style={{ animation: "float 8s infinite" }}
          />
          <FaCloud
            className="absolute top-20 left-1/4 text-white text-3xl"
            style={{ animation: "float 10s infinite 2s" }}
          />

          {/* Sun with Rays */}
          <FaSun
            className="absolute top-10 right-1/4 text-yellow-400 text-5xl"
            style={{ animation: "shine 3s infinite" }}
          />

          {/* Wind Effect */}
          <FaWind
            className="absolute bottom-20 left-1/3 text-blue-300 text-3xl"
            style={{ animation: "sway 4s infinite" }}
          />

          {/* Tree Swaying */}
          <FaTree
            className="absolute bottom-10 right-10 text-green-700 text-4xl"
            style={{ animation: "sway 3s infinite" }}
          />

          {/* Mountain */}
          <FaMountain
            className="absolute bottom-0 left-1/2 text-gray-600 text-5xl"
            style={{ animation: "rise 6s infinite" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Profile Section */}
          <div
            ref={profileRef}
            className={`transition-all duration-1000 ease-in-out transform ${
              isProfileVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } bg-white rounded-lg shadow-2xl p-8 max-w-2xl mx-auto mb-12 relative overflow-hidden`}
          >
            <div className="absolute inset-0 wind-bg"></div>
            <h1
              className="text-5xl font-bold text-center text-gray-800 mb-8 animate-bloom relative z-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Profile
              <span
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00cc00, transparent)",
                  borderRadius: "50%",
                  height: "4px",
                }}
              />
            </h1>
            <div className="flex flex-col items-center relative z-10">
              <div className="relative group mb-6 cursor-pointer">
                <img
                  src={userInfo.image}
                  alt="User Avatar"
                  className="w-40 h-40 rounded-full object-cover cursor-pointer border-4 border-green-300 shadow-lg transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 leaf-glow-effect"></div>
              </div>
              <div className="text-center space-y-4">
                <div
                  className="animate-slideIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <p className="text-xl font-semibold text-gray-800 animate-text-bloom">
                    <FaFeatherAlt className="inline mr-2" /> Name
                  </p>
                  <p className="text-lg text-gray-600">{userInfo.username}</p>
                </div>
                <div
                  className="animate-slideIn"
                  style={{ animationDelay: "0.4s" }}
                >
                  <p className="text-xl font-semibold text-gray-800 animate-text-bloom">
                    <FaWater className="inline mr-2" /> Email
                  </p>
                  <p className="text-lg text-gray-600">{userInfo.email}</p>
                </div>
                <div
                  className="animate-slideIn"
                  style={{ animationDelay: "0.6s" }}
                >
                  <p className="text-xl font-semibold text-gray-800 animate-text-bloom">
                    <FaWind className="inline mr-2" /> Phone
                  </p>
                  <p className="text-lg text-gray-600">{userInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Favorites Section với Swiper */}
          <div
            ref={favoritesRef}
            className={`transition-all duration-1000 ease-in-out transform ${
              isFavoritesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2
              className="text-5xl font-bold text-center text-white mb-8 relative animate-bloom"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Saved Packages
              <span
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00cc00, transparent)",
                  borderRadius: "50%",
                  height: "4px",
                }}
              />
            </h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              speed={600}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper cursor-pointer"
            >
              {favorites.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <PackageSlide
                    src={pkg.src}
                    id={pkg.id}
                    description={pkg.description}
                    price={pkg.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* CSS tùy chỉnh */}
      <style>{`
        /* Hiệu ứng lá rơi cho ảnh package */
        @keyframes leaf-fall {
          0% {
            opacity: 0.8;
            transform: translateY(-100%) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100%) rotate(360deg);
          }
        }
        .leaf-fall-effect {
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300cc00'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93V17.93z'/%3E%3C/svg%3E")
            center center no-repeat;
          background-size: 20px 20px;
          animation: leaf-fall 3s infinite linear;
        }

        /* Hiệu ứng phát sáng cho avatar */
        @keyframes leaf-glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 1);
          }
        }
        .leaf-glow-effect {
          animation: leaf-glow 2s ease-in-out infinite;
        }

        /* Hiệu ứng nở hoa cho text */
        @keyframes text-bloom {
          0%, 100% {
            color: #1f2937;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
          50% {
            color: #22c55e;
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
          }
        }
        .animate-text-bloom {
          animation: text-bloom 3s ease-in-out infinite;
        }

        /* Hiệu ứng gió nền */
        @keyframes wind {
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
        .wind-bg {
          background: linear-gradient(45deg, #d1fae5, #a7f3d0, #d1fae5);
          background-size: 200% 200%;
          animation: wind 10s ease-in-out infinite;
          opacity: 0.1;
        }

        /* Hiệu ứng rơi lá */
        @keyframes fall {
          0% {
            opacity: 1;
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }

        /* Hiệu ứng trôi nổi cho mây */
        @keyframes float {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
        }

        /* Hiệu ứng tỏa sáng cho mặt trời */
        @keyframes shine {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.5);
          }
        }

        /* Hiệu ứng đung đưa */
        @keyframes sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        /* Hiệu ứng mọc lên */
        @keyframes rise {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Hiệu ứng nở hoa cho tiêu đề */
        @keyframes bloom {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bloom {
          animation: bloom 1s ease-out forwards;
        }

        /* Hiệu ứng slideIn */
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
