import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import mainImg from "../../assets/memento.jpg";
import { FiX } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import errorImg from "../../assets/loi-404.png";

// Dữ liệu mẫu
const galleryData = [
  {
    id: "Gallery 1",
    src: mainImg,
    description: "Beautiful Sunset",
    content: "Beautiful Sunset content will be here",
  },
  {
    id: "Gallery 2",
    src: mainImg,
    description: "Mountain Adventure",
    content: "Mountain Adventure content will be here",
  },
  {
    id: "Gallery 3",
    src: mainImg,
    description: "City Lights",
    content: "City Lights content will be here",
  },
  {
    id: "Gallery 4",
    src: mainImg,
    description: "Ocean Waves",
    content: "Ocean Waves content will be here",
  },
  {
    id: "Gallery 5",
    src: mainImg,
    description: "Forest Path",
    content: "Forest Path content will be here",
  },
  {
    id: "Gallery 6",
    src: mainImg,
    description: "Desert Dunes",
    content: "Desert Dunes content will be here",
  },
  {
    id: "Gallery 7",
    src: mainImg,
    description: "Snowy Peaks",
    content: "Snowy Peaks content will be here",
  },
  {
    id: "Gallery 8",
    src: mainImg,
    description: "Starry Night",
    content: "Starry Night content will be here",
  },
];

// Component cho slide trong Swiper với transition loading
const GallerySlide = ({ src, description, isVisible, id, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/galleries/${id}`);
    }
  };

  return (
    <div className="relative group" onClick={handleClick}>
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
      <div
        className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-60 text-black text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "20px",
        }}
      >
        {description}
      </div>
    </div>
  );
};

const Detail = () => {
  const { id } = useParams();
  const galleryItem = galleryData.find((item) => item.id === id);
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isMainLoaded, setIsMainLoaded] = useState(false);
  const [isOurWorksVisible, setIsOurWorksVisible] = useState(false);
  const [isOtherGalleriesVisible, setIsOtherGalleriesVisible] = useState(false);
  const ourWorksRef = useRef(null);
  const otherGalleriesRef = useRef(null);
  const otherGalleriesNotFoundRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Intersection Observer cho Our Works
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

  // Intersection Observer cho Other Galleries (trang chi tiết)
  useEffect(() => {
    const otherGalleriesNode = otherGalleriesRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsOtherGalleriesVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (otherGalleriesNode) {
      observer.observe(otherGalleriesNode);
    }

    return () => {
      if (otherGalleriesNode) {
        observer.unobserve(otherGalleriesNode);
      }
    };
  }, []);

  // Intersection Observer cho Other Galleries trong not found
  useEffect(() => {
    const otherGalleriesNotFoundNode = otherGalleriesNotFoundRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsOtherGalleriesVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );

    if (otherGalleriesNotFoundNode) {
      observer.observe(otherGalleriesNotFoundNode);
    }

    return () => {
      if (otherGalleriesNotFoundNode) {
        observer.unobserve(otherGalleriesNotFoundNode);
      }
    };
  }, []);

  if (!galleryItem) {
    const otherImages = galleryData; // Trong not found, dùng tất cả galleryData

    return (
      <Layout>
        {/* Container chính cho nội dung not found */}
        <div className="container mx-auto px-4 py-8 w-full relative h-110">
          {/* Ảnh lỗi làm nền mờ */}
          <div className="absolute inset-0 z-0">
            <img
              src={errorImg}
              alt="Error Background"
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          {/* Nội dung chính */}
          <div className="relative z-10 text-center mt-10">
            <h2
              className="text-5xl font-bold mb-4 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gallery not found
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              The gallery you are looking for does not exist.
            </p>
            <button
              onClick={() => navigate("/galleries")}
              className="flex justify-center items-center bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out mx-auto"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Go back to galleries
            </button>
          </div>
        </div>

        {/* Swiper "Other Galleries" tách riêng */}
        <div className="container mx-auto px-4 py-8">
          <div className="mt-16" ref={otherGalleriesNotFoundRef}>
            <h1
              className="text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Other Galleries
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
                  <GallerySlide
                    src={item.src}
                    description={item.description}
                    isVisible={isOtherGalleriesVisible}
                    id={item.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Layout>
    );
  }

  const { src, description, content } = galleryItem;
  const otherImages = galleryData.filter((item) => item.id !== id);

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto px-4 py-8 relative">
          {/* Ảnh lớn làm background mờ */}
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

          {/* Nội dung chính */}
          <div
            className={`z-10 flex w-full flex-col ${
              selectedImage ? "blur-md" : ""
            }`}
          >
            <div className="flex w-full">
              {/* Ảnh được chọn */}
              <div className="flex-1 flex justify-center px-5 pt-6 relative">
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
              </div>

              {/* Tiêu đề và nội dung */}
              <div className="flex-1 flex flex-col justify-start py-6 z-10">
                <h2
                  className="text-4xl font-bold text-white mb-4 relative flex justify-center"
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
              </div>
            </div>

            {/* Swiper cho "Our Works" */}
            <div className="mt-16" ref={ourWorksRef}>
              <h1
                className="text-4xl font-bold text-white mb-6"
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
                {galleryData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <GallerySlide
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

            {/* Swiper cho "Other Galleries" */}
            <div className="mt-16" ref={otherGalleriesRef}>
              <h1
                className="text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Other Galleries
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
                    <GallerySlide
                      src={item.src}
                      description={item.description}
                      isVisible={isOtherGalleriesVisible}
                      id={item.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Layout>

      {/* Modal ảnh fullscreen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-[2000]"
          onClick={closeImage} // Đóng khi nhấp vào nền
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Ngăn đóng khi nhấp vào ảnh
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
    </>
  );
};

export default Detail;
