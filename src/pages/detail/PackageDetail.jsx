import React, { useEffect, useRef, useState, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import sereneImg from "../../assets/duoitancay20.png"; // Hình ảnh từ Packages
import nostalgicImg from "../../assets/giadinh6.jpg"; // Hình ảnh từ Packages
import cheerfulImg from "../../assets/phieudu20.png"; // Hình ảnh từ Packages
import workImg1 from "../../assets/duoitancay21.png"; // Ảnh giả định cho Our Works
import workImg2 from "../../assets/duoitancay22.png"; // Ảnh giả định cho Our Works
import workImg3 from "../../assets/duoitancay23.png"; // Ảnh giả định cho Our Works
import workImg4 from "../../assets/duoitancay5.jpg"; // Ảnh giả định cho Our Works
import workImg5 from "../../assets/giadinh8.jpg"; // Ảnh giả định cho Our Works
import workImg6 from "../../assets/giadinh9.jpg"; // Ảnh giả định cho Our Works
import workImg7 from "../../assets/giadinh10.jpg"; // Ảnh giả định cho Our Works
import workImg8 from "../../assets/giadinh11.jpg"; // Ảnh giả định cho Our Works
import workImg9 from "../../assets/giadinh12.png"; // Ảnh giả định cho Our Works
import workImg10 from "../../assets/phieudu21.png"; // Ảnh giả định cho Our Works
import workImg11 from "../../assets/phieudu22.png"; // Ảnh giả định cho Our Works
import workImg12 from "../../assets/phieudu23.png"; // Ảnh giả định cho Our Works
import workImg13 from "../../assets/phieudu24.png"; // Ảnh giả định cho Our Works
import workImg16 from "../../assets/phieudu25.png"; // Ảnh giả định cho Our Works
import workImg14 from "../../assets/duoitancay25.png"; // Ảnh giả định cho Our Works
import workImg15 from "../../assets/duoitancay26.png"; // Ảnh giả định cho Our Works
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import spaceBg from "../../assets/universe.jpg";
import astronautImg from "../../assets/astronaut.png";
import { FaArrowLeft } from "react-icons/fa";
import { FiX } from "react-icons/fi";

// Dữ liệu mẫu cho packages
const PackageData = [
  {
    id: "duoitancay",
    src: sereneImg,
    description: "Sài Gòn - Dưới Tán Cây",
    price: "3.000.000đ",
    content: "Chụp ảnh dưới bóng cây xanh mát, mang lại cảm giác yên bình.",
    ourWorks: [workImg1, workImg2, workImg3, workImg4,workImg14,workImg15], // Ảnh riêng cho Our Works
  },
  {
    id: "giadinh",
    src: nostalgicImg,
    description: "Sài Gòn - Gia Định",
    price: "3.000.000đ",
    content: "Lưu giữ khoảnh khắc gia đình ấm áp và thân thương.",
    ourWorks: [workImg5, workImg6, workImg7, workImg8, workImg9], // Ảnh riêng cho Our Works
  },
  {
    id: "phieudu",
    src: cheerfulImg,
    description: "Sài Gòn - Phiêu Du",
    price: "3.000.000đ",
    content: "Khám phá những hành trình phiêu lưu đầy thú vị qua ống kính.",
    ourWorks: [workImg10, workImg11, workImg12, workImg13, workImg16], // Ảnh riêng cho Our Works
  },
];

// Component PackageSlide
const PackageSlide = ({ src, description, isVisible, id, onClick, price }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/packages/${id}`);
    }
  };

  return (
    <div
      className="relative group cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={src}
          alt={description}
          className={`w-full h-60 object-cover rounded-lg shadow-md transition-all duration-2000 ease-in-out ${
            isVisible && isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          } group-hover:scale-105 cursor-pointer`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 mirror-reflection-effect pointer-events-none"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}
      >
        {description}
      </div>
      {price && (
        <div
          className="absolute top-0 left-0 right-0 bg-amber-200 text-black text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-1/2 mx-auto pointer-events-none"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}
        >
          {price}
        </div>
      )}
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};

// Component PackageDetail
const PackageDetail = () => {
  const { id } = useParams();
  const packageItem = PackageData.find(
    (item) => item.id.toLowerCase() === id.toLowerCase()
  );

  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isMainLoaded, setIsMainLoaded] = useState(false);
  const [isOurWorksVisible, setIsOurWorksVisible] = useState(false);
  const [isOtherPackagesVisible, setIsOtherPackagesVisible] = useState(false);
  const ourWorksRef = useRef(null);
  const otherPackagesRef = useRef(null);
  const otherPackagesNotFoundRef = useRef(null);
  const notFoundRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Intersection Observers
  useEffect(() => {
    const ourWorksNode = ourWorksRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsOurWorksVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );
    if (ourWorksNode) observer.observe(ourWorksNode);
    return () => {
      if (ourWorksNode) observer.unobserve(ourWorksNode);
    };
  }, [id]);

  useEffect(() => {
    const otherPackagesNode = otherPackagesRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsOtherPackagesVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );
    if (otherPackagesNode) observer.observe(otherPackagesNode);
    return () => {
      if (otherPackagesNode) observer.unobserve(otherPackagesNode);
    };
  }, [id]);

  useEffect(() => {
    const otherPackagesNotFoundNode = otherPackagesNotFoundRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsOtherPackagesVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );
    if (otherPackagesNotFoundNode) observer.observe(otherPackagesNotFoundNode);
    return () => {
      if (otherPackagesNotFoundNode)
        observer.unobserve(otherPackagesNotFoundNode);
    };
  }, []);

  useEffect(() => {
    const notFoundElement = notFoundRef.current;
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

    if (notFoundElement) observer.observe(notFoundElement);

    return () => {
      if (notFoundElement) observer.unobserve(notFoundElement);
    };
  }, []);

  const handleSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/contact", { state: { package: packageItem } });
    }, 5000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/contact", { state: { package: packageItem } });
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const particles = useMemo(() => {
    return [...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full animate-particle"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  }, []);

  if (!packageItem) {
    const otherImages = PackageData;

    return (
      <div
        onMouseMove={handleMouseMove}
        className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative overflow-hidden text-white"
        style={{ backgroundImage: `url(${spaceBg})` }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 60px, rgba(0,0,0,0.9) 180px)`,
          }}
        />
        <div className="absolute inset-0 pointer-events-none z-0">
          {particles}
        </div>

        <div
          ref={notFoundRef}
          className="text-center transition-all duration-1000 ease-in-out opacity-0 translate-y-8 relative z-20 container mx-auto px-4 py-8 flex-grow flex flex-col justify-center"
        >
          <div className="relative flex justify-center mb-8">
            <img
              src={astronautImg}
              alt="404 Astronaut"
              className="w-64 h-64 object-contain animate-float"
            />
            <div className="absolute w-4 h-4 bg-yellow-300 rounded-full top-10 left-20"></div>
            <div className="absolute w-3 h-3 bg-yellow-200 rounded-full top-20 right-16 delay-200"></div>
            <div className="absolute w-5 h-5 bg-yellow-400 rounded-full bottom-10 left-16 delay-400"></div>
          </div>

          <h2
            className="text-9xl font-bold animate-colorChange tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            404
          </h2>
          <p className="text-2xl mt-4 mb-8 animate-fadeIn font-bold">
            Oops! The package you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/packages")}
            className="flex justify-center items-center mx-auto bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg scale-100 hover:scale-105 hover:bg-purple-700 transition-all duration-500 ease-in-out animate-bounceIn cursor-pointer"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Go back to packages
          </button>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-20">
          <div className="mt-16" ref={otherPackagesNotFoundRef}>
            <h1
              className="text-4xl font-bold mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Other Packages
            </h1>
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
              {otherImages.map((item) => (
                <SwiperSlide key={item.id}>
                  <PackageSlide
                    src={item.src}
                    description={item.description}
                    isVisible={isOtherPackagesVisible}
                    id={item.id}
                    price={item.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }

  const { src, description, content, price, ourWorks } = packageItem;
  const otherImages = PackageData.filter((item) => item.id !== id);

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen primary py-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="sparkle"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>

          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="h-120 absolute top-0 left-0 right-0 z-0">
              <img
                src={src}
                alt={`${description} - Background`}
                className={`w-full h-full object-cover opacity-30 transition-all duration-2000 ease-in-out ${
                  isBgLoaded
                    ? "opacity-30 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                onLoad={() => setIsBgLoaded(true)}
              />
            </div>
            <div className={`z-10 w-full ${selectedImage ? "blur-md" : ""}`}>
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative max-w-lg">
                    <img
                      src={src}
                      alt={description}
                      className={`w-full h-96 object-cover rounded-lg shadow-md transition-all duration-2000 ease-in-out ${
                        isMainLoaded
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      } cursor-pointer`}
                      onLoad={() => setIsMainLoaded(true)}
                      onClick={() => openImage(src)}
                    />
                    <div className="absolute inset-0 mirror-reflection-effect pointer-events-none"></div>
                    <div className="absolute inset-0 border-4 border-transparent hover:border-indigo-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start z-20">
                  <div className="flex flex-col items-center md:items-start relative">
                    <h2
                      className="text-4xl font-bold text-white mb-2 wave-text"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {description}
                    </h2>
                    <span
                      className="w-96 h-2"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #ff0000, transparent)",
                        borderRadius: "50%",
                        height: "6px",
                      }}
                    />
                  </div>
                  <p className="text-lg text-gray-400 mt-6">{content}</p>
                  <div className="mt-6">
                    <p className="text-xl text-white font-semibold">
                      Price: {price}
                    </p>
                    <button
                      onClick={handleSubmit}
                      className="mt-6 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer text-2xl font-bold z-30 relative"
                    >
                      Email us
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-16" ref={ourWorksRef}>
                <h1
                  className="text-4xl font-bold text-white mb-6 text-center"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Our Works
                </h1>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={4}
                  navigation
                  speed={600}
                  loop={true}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    800: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="mySwiper cursor-pointer"
                >
                  {ourWorks.map((workSrc, idx) => (
                    <SwiperSlide key={idx}>
                      <PackageSlide
                        src={workSrc}
                        description={`Work ${idx + 1}`}
                        isVisible={isOurWorksVisible}
                        onClick={() => openImage(workSrc)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="mt-16" ref={otherPackagesRef}>
                <h1
                  className="text-4xl font-bold text-white mb-6 text-center"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Other Packages
                </h1>
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
                  {otherImages.map((item) => (
                    <SwiperSlide key={item.id}>
                      <PackageSlide
                        src={item.src}
                        description={item.description}
                        isVisible={isOtherPackagesVisible}
                        id={item.id}
                        price={item.price}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-[2000]"
          onClick={closeImage}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Fullscreen Image"
              className="max-w-full max-h-full object-contain z-[2000] rounded-lg shadow-lg"
            />
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition z-[2000] cursor-pointer"
            >
              <FiX size={20} />
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
              Package "{description}" has been submitted successfully!
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
    </>
  );
};

// CSS cho animation (giữ nguyên từ mã gốc)
const styles = `
  /* Hiệu ứng phản chiếu gương */
  @keyframes mirrorReflection {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .mirror-reflection-effect {
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 200%;
    animation: mirrorReflection 3s ease-in-out infinite;
    opacity: 0.3;
  }

  /* Hiệu ứng hạt sáng trên nền (cho PackageDetail) */
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
    0% { transform: translate(0, 0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translate(100px, 100px); opacity: 0; }
  }

  /* Hiệu ứng cho NotFound */
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(2deg); }
    50% { transform: translateY(-20px) rotate(-2deg); }
  }
  .animate-float { animation: float 4s ease-in-out infinite; }

  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.7); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  .delay-200 { animation-delay: 0.2s; }
  .delay-400 { animation-delay: 0.4s; }

  @keyframes colorChange {
    0% { color: #ff6f61; text-shadow: 0 0 10px rgba(255, 111, 97, 0.5); }
    50% { color: #ffcc5c; text-shadow: 0 0 20px rgba(255, 204, 92, 0.8); }
    100% { color: #ff6f61; text-shadow: 0 0 10px rgba(255, 111, 97, 0.5); }
  }
  .animate-colorChange { animation: colorChange 6s ease-in-out infinite; }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.5s;
  }

  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0.3) translateY(50px); }
    50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
    100% { transform: scale(1) translateY(0); }
  }
  .animate-bounceIn {
    animation: bounceIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 1s;
  }

  @keyframes particle {
    0% { transform: translateY(0); opacity: 0.8; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  .animate-particle {
    animation: particle linear infinite;
  }

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

  /* Responsive */
  @media (max-width: 640px) {
    .text-9xl { font-size: 5rem; }
    .text-2xl { font-size: 1.25rem; }
    .w-64 { width: 12rem; height: 12rem; }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PackageDetail;
