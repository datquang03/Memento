import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import sereneImg from "../../assets/duoitancay4.jpg"; // Hình ảnh giả định 1
import nostalgicImg from "../../assets/giadinh6.jpg"; // Hình ảnh giả định 2
import cheerfulImg from "../../assets/phieudu.jpg"; // Hình ảnh giả định 3
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import {
  FaCameraRetro,
  FaLightbulb,
  FaImage,
  FaPhotoVideo,
  FaRegObjectGroup,
  FaTripadvisor,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

// Dữ liệu ảo cho 3 package
const packageData = [
  {
    src: sereneImg,
    id: "duoitancay",
    description: "Sài Gòn - Dưới Tán Cây",
    price: "3.000.000đ",
  },
  {
    src: nostalgicImg,
    id: "giadinh",
    description: "Sài Gòn - Gia Định",
    price: "3.000.00đ",
  },
  {
    src: cheerfulImg,
    id: "phieudu",
    description: "Sài Gòn - Phiêu Du",
    price: "3.000.000đ",
  },
];

// PackageSlide component
export const PackageSlide = ({ src, id, description, price }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    navigate(`/packages/${id}`);
  };

  return (
    <div className="relative group cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
      <div className="relative">
        <img
          src={src}
          id={id}
          className={`w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:shadow-xl ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          onLoad={() => setIsLoaded(true)}
          onClick={handleClick}
        />
        {/* Hiệu ứng phản chiếu gương chéo chỉ khi hover */}
        <div className="absolute inset-0 mirror-reflection pointer-events-none"></div>
      </div>
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
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};

// Photography icons section
const PhotographySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const icons = [
    { icon: <FaCameraRetro size={50} />, label: "Camera" },
    { icon: <FaTripadvisor size={50} />, label: "Tripod" },
    { icon: <FaLightbulb size={50} />, label: "Lighting" },
    { icon: <FaImage size={50} />, label: "Photo Editing" },
    { icon: <FaPhotoVideo size={50} />, label: "Videography" },
    { icon: <FaRegObjectGroup size={50} />, label: "Framing" },
  ];

  return (
    <div
      ref={ref}
      className={`mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center items-center transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {icons.map(({ icon, label }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-white hover:scale-110 transition-transform duration-300"
        >
          <div className="mb-2 text-amber-400 animate-float">{icon}</div>
          <span className="text-sm font-semibold">{label}</span>
        </div>
      ))}
    </div>
  );
};

// Call to Action Section
const CallToAction = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`mt-20 text-center text-white transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <h2
        className="text-4xl font-bold mb-4 animate-pulse-text"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Let’s Create Memories Together!
      </h2>
      <p className="text-lg max-w-2xl mx-auto animate-fade-in">
        Explore our photography packages and capture your favorite moments in
        the most stunning ways.
      </p>
    </div>
  );
};

const Packages = () => {
  const packagesRef = useRef(null);
  const [isPackagesVisible, setIsPackagesVisible] = useState(false);

  useEffect(() => {
    const currentRef = packagesRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsPackagesVisible(true);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen primary py-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="sparkle"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="pulse-circle top-1/4 left-1/4"></div>
          <div className="pulse-circle top-2/3 right-1/3 delay-1"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1
            className="text-6xl font-bold text-center text-white mb-6 relative animate-twinkle"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Packages
            <span
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-2 animate-gradient"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #ff0000, transparent)",
                borderRadius: "50%",
                height: "6px",
              }}
            />
          </h1>

          {/* Package Slide */}
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
                1024: { slidesPerView: 3 }, // Giới hạn 3 slide trên màn hình lớn
              }}
              className="mySwiper cursor-pointer"
            >
              {packageData.map((pkg, idx) => (
                <SwiperSlide key={idx}>
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

          {/* Photography Icons */}
          <PhotographySection />

          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>

      <style>{`
        /* Mirror Reflection Effect - Diagonal */
        .mirror-reflection {
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          width: 150%;
          height: 150%;
          position: absolute;
          top: -50%;
          left: -50%;
          transform: translate(-100%, -100%);
          opacity: 0;
          transition: opacity 0s; /* Chỉ dùng để ẩn/hiện tức thì */
        }
        .group:hover .mirror-reflection {
          opacity: 1;
          animation: reflect-diagonal 2s infinite;
          animation-delay: 0.2s; /* Delay để chờ scale */
        }

        @keyframes reflect-diagonal {
          0% {
            transform: translate(-100%, -100%);
            opacity: 0;
          }
          50% {
            transform: translate(0%, 0%);
            opacity: 1;
          }
          100% {
            transform: translate(100%, 100%);
            opacity: 0;
          }
        }

        /* Background Sparkle Animation */
        .sparkle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          animation: sparkle-move 5s infinite;
        }
        .sparkle-2 { top: 20%; left: 80%; animation-delay: 1s; }
        .sparkle-3 { top: 60%; left: 30%; animation-delay: 2s; }

        @keyframes sparkle-move {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(100px, 100px); opacity: 0; }
        }

        /* Pulse Circle Animation */
        .pulse-circle {
          position: absolute;
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
          border-radius: 50%;
          animation: pulse 4s infinite;
        }
        .delay-1 {
          animation-delay: 1s;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Twinkle Animation for Title */
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

        /* Gradient Animation for Title Underline */
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Float Animation for Icons */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Pulse Text Animation for Call to Action */
        @keyframes pulse-text {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }

        /* Fade In Animation for Call to Action Text */
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
};

export default Packages;
