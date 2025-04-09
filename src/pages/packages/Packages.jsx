import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const PackageSlide = ({ src, id, description, price }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Debug để kiểm tra id và sự kiện onClick
  const handleClick = () => {
    console.log("Navigating to:", `/packages/${id}`); // Debug giá trị id
    navigate(`/packages/${id}`);
  };

  return (
    <div className="relative group cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
      {/* Ảnh package với hiệu ứng lấp lánh */}
      <div className="relative">
        <img
          src={src}
          id={id}
          className={`w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          onLoad={() => setIsLoaded(true)}
          onClick={handleClick} // Sử dụng hàm handleClick để debug
        />
        <div className="absolute inset-0 sparkle-effect pointer-events-none"></div>
      </div>
      {/* Thông tin package với hiệu ứng hover */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-center py-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
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
      {/* Hiệu ứng viền sáng khi hover */}
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};

const Packages = () => {
  const packagesRef = useRef(null);
  const [isPackagesVisible, setIsPackagesVisible] = useState(false);

  // Hiệu ứng scroll để load Swiper
  useEffect(() => {
    const currentRef = packagesRef.current; // Lưu giá trị packagesRef.current vào biến
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPackagesVisible(true);
        }
      });
    }, observerOptions);

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen primary py-8 relative overflow-hidden">
        {/* Hiệu ứng hạt sáng trên nền */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="sparkle"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1
            className="text-6xl font-bold text-center text-white mb-6 relative animate-twinkle"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Packages
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
          <div
            ref={packagesRef}
            className={`transition-all duration-1000 ease-in-out transform ${
              isPackagesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } mt-6`}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
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
                800: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="mySwiper cursor-pointer"
            >
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 1"
                  description="Beautiful Sunset"
                  price="$100"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 2"
                  description="Mountain Adventure"
                  price="$200"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 3"
                  description="City Lights"
                  price="$300"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 4"
                  description="Ocean Waves"
                  price="$400"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 5"
                  description="Forest Path"
                  price="$500"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 6"
                  description="Desert Dunes"
                  price="$600"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 7"
                  description="Snowy Peaks"
                  price="$700"
                />
              </SwiperSlide>
              <SwiperSlide>
                <PackageSlide
                  src={mainImg}
                  id="Package 8"
                  description="Starry Night"
                  price="$800"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      {/* CSS tùy chỉnh cho animation */}
      <style>{`
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
      `}</style>
    </Layout>
  );
};

export default Packages;
