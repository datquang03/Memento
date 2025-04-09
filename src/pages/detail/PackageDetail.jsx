import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import errorImg from "../../assets/loi-404.png";
import { FaArrowLeft } from "react-icons/fa";
import { FiX } from "react-icons/fi";

// Dữ liệu mẫu cho packages
const PackageData = [
  {
    id: "Package 1",
    src: mainImg,
    description: "Beautiful Sunset",
    price: "$100",
    content: "Enjoy a relaxing evening watching the sunset.",
  },
  {
    id: "Package 2",
    src: mainImg,
    description: "Mountain Adventure",
    price: "$200",
    content: "Explore the rugged mountains with this package.",
  },
  {
    id: "Package 3",
    src: mainImg,
    description: "City Lights",
    price: "$300",
    content: "A guided tour through the city's highlights.",
  },
  {
    id: "Package 4",
    src: mainImg,
    description: "Ocean Waves",
    price: "$400",
    content: "A luxurious cruise experience.",
  },
  {
    id: "Package 5",
    src: mainImg,
    description: "Forest Path",
    price: "$500",
    content: "A peaceful retreat in nature.",
  },
  {
    id: "Package 6",
    src: mainImg,
    description: "Desert Dunes",
    price: "$600",
    content: "Experience the thrill of the desert.",
  },
  {
    id: "Package 7",
    src: mainImg,
    description: "Snowy Peaks",
    price: "$700",
    content: "A winter adventure in the mountains.",
  },
  {
    id: "Package 8",
    src: mainImg,
    description: "Starry Night",
    price: "$800",
    content: "A night of stargazing and camping.",
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
        <div className="absolute inset-0 sparkle-effect pointer-events-none"></div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "20px",
        }}
      >
        {description}
      </div>
      <div
        className="absolute top-0 left-0 right-0 bg-amber-200 text-black text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-1/2 mx-auto pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "20px",
        }}
      >
        {price}
      </div>
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};

// Component PackageDetail
const PackageDetail = () => {
  const { id } = useParams();
  console.log("URL id:", id);

  const packageItem = PackageData.find(
    (item) => item.id.toLowerCase() === id.toLowerCase()
  );
  console.log("Found package:", packageItem);

  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isMainLoaded, setIsMainLoaded] = useState(false);
  const [isOurWorksVisible, setIsOurWorksVisible] = useState(false);
  const [isOtherPackagesVisible, setIsOtherPackagesVisible] = useState(false);
  const ourWorksRef = useRef(null);
  const otherPackagesRef = useRef(null);
  const otherPackagesNotFoundRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Intersection Observers
  useEffect(() => {
    const ourWorksNode = ourWorksRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsOurWorksVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (ourWorksNode) {
      observer.observe(ourWorksNode);
    }

    return () => {
      if (ourWorksNode) {
        observer.unobserve(ourWorksNode);
      }
    };
  }, []);

  useEffect(() => {
    const otherPackagesNode = otherPackagesRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsOtherPackagesVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (otherPackagesNode) {
      observer.observe(otherPackagesNode);
    }

    return () => {
      if (otherPackagesNode) {
        observer.unobserve(otherPackagesNode);
      }
    };
  }, []);

  useEffect(() => {
    const otherPackagesNotFoundNode = otherPackagesNotFoundRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsOtherPackagesVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (otherPackagesNotFoundNode) {
      observer.observe(otherPackagesNotFoundNode);
    }

    return () => {
      if (otherPackagesNotFoundNode) {
        observer.unobserve(otherPackagesNotFoundNode);
      }
    };
  }, []);

  // Xử lý Submit: Hiển thị modal và điều hướng sang /contact
  const handleSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/contact", {
        state: {
          package: packageItem,
        },
      });
    }, 5000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/contact", {
      state: {
        package: packageItem,
      },
    });
  };

  if (!packageItem) {
    const otherImages = PackageData;

    return (
      <Layout>
        <div className="min-h-screen primary py-8 relative overflow-hidden">
          {/* Hiệu ứng hạt sáng trên nền */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="sparkle"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>

          <div className="container mx-auto px-4 py-8 w-full relative h-110 z-10">
            <div className="absolute inset-0 z-0">
              <img
                src={errorImg}
                alt="Error Background"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative z-10 text-center mt-10">
              <h2
                className="text-5xl font-bold mb-4 text-white animate-twinkle"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Package not found
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                The package you are looking for does not exist.
              </p>
              <button
                onClick={() => navigate("/packages")}
                className="flex justify-center items-center bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out mx-auto"
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Go back to packages
              </button>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="mt-16" ref={otherPackagesNotFoundRef}>
              <h1
                className="text-4xl font-bold text-white mb-6 animate-twinkle"
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
      </Layout>
    );
  }

  const { src, description, content, price } = packageItem;
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
          {/* Hiệu ứng hạt sáng trên nền */}
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
                className={`w-full h-120 object-cover opacity-30 transition-all duration-2000 ease-in-out ${
                  isBgLoaded
                    ? "opacity-30 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                onLoad={() => setIsBgLoaded(true)}
              />
            </div>
            <div
              className={`z-10 flex w-full flex-col ${
                selectedImage ? "blur-md" : ""
              }`}
            >
              <div className="flex w-full">
                <div className="flex-1 flex justify-center px-5 pt-6 relative">
                  <div className="relative">
                    <img
                      src={src}
                      alt={description}
                      className={`w-full max-w-lg h-96 object-cover rounded-lg shadow-md transition-all duration-2000 ease-in-out ${
                        isMainLoaded
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      } cursor-pointer z-[1000]`}
                      onLoad={() => setIsMainLoaded(true)}
                      onClick={() => openImage(src)}
                    />
                    <div className="absolute inset-0 sparkle-effect pointer-events-none"></div>
                    <div className="absolute inset-0 border-4 border-transparent hover:border-indigo-500 transition-all duration-500 rounded-lg pointer-events-none"></div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start py-6 z-10">
                  <h2
                    className="text-4xl font-bold text-white mb-4 relative flex justify-center animate-twinkle wave-text"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {description}
                    <span
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-2"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #ff0000, transparent)",
                        borderRadius: "50%",
                        height: "6px",
                      }}
                    />
                  </h2>
                  <p className="text-lg text-gray-400 px-6 mt-6">{content}</p>
                  <div className="px-6 mt-4">
                    <p className="text-xl text-white font-semibold">
                      Price: {price}
                    </p>
                    <button
                      onClick={handleSubmit}
                      className="mt-18 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer text-2xl font-bold w-xl flex justify-center items-center"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-16" ref={ourWorksRef}>
                <h1
                  className="text-4xl font-bold text-white mb-6 animate-twinkle"
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
                  {PackageData.map((item) => (
                    <SwiperSlide key={item.id}>
                      <PackageSlide
                        src={item.src}
                        description={item.description}
                        isVisible={isOurWorksVisible}
                        id={item.id}
                        onClick={() => openImage(item.src)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="mt-16" ref={otherPackagesRef}>
                <h1
                  className="text-4xl font-bold text-white mb-6 animate-twinkle"
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

      {/* Modal ảnh fullscreen */}
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

      {/* Modal thông báo thành công tùy chỉnh */}
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

// CSS cho animation
const styles = `
  /* Hiệu ứng lấp lánh cho ảnh */
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

  /* Hiệu ứng sóng gradient cho tiêu đề */
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
  .wave-text {
    background: linear-gradient(45deg, #ffffff, #a1a1aa, #ffffff);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: wave 5s ease-in-out infinite;
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
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PackageDetail;
