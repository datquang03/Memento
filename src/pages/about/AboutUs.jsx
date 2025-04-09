import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg"; // Ảnh mặc định cho CEO
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import "swiper/css"; // Import CSS Swiper
import "swiper/css/pagination"; // Import CSS Pagination (nếu cần)
import { Pagination } from "swiper/modules"; // Import module Pagination

// Giả lập mảng 9 thành viên (bạn có thể thay bằng ảnh thật)
const teamMembers = [
  { name: "Alice Smith", position: "Designer", image: mainImg },
  { name: "Bob Johnson", position: "Developer", image: mainImg },
  { name: "Charlie Brown", position: "Marketing", image: mainImg },
  { name: "Diana Lee", position: "HR Manager", image: mainImg },
  { name: "Eve Davis", position: "Product Manager", image: mainImg },
  { name: "Frank Wilson", position: "Sales Lead", image: mainImg },
  { name: "Grace Taylor", position: "Content Creator", image: mainImg },
  { name: "Henry Clark", position: "Tech Lead", image: mainImg },
  { name: "Ivy Moore", position: "Support Specialist", image: mainImg },
];

const AboutUs = () => {
  const ceoRef = useRef(null); // Ref cho ảnh CEO
  const memberRefs = useRef([]); // Refs cho ảnh thành viên
  const missionRef = useRef(null); // Ref cho phần Our Mission
  const [isMobile, setIsMobile] = useState(false); // State kiểm tra mobile

  // Hàm kiểm tra thiết bị mobile
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 640); // 640px là breakpoint cho mobile
  };

  useEffect(() => {
    // Kiểm tra khi mount
    checkMobile();
    // Lắng nghe resize để cập nhật
    window.addEventListener("resize", checkMobile);
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Lưu giá trị ref vào biến cục bộ
    const ceoElement = ceoRef.current;
    const memberElements = [...memberRefs.current];
    const missionElement = missionRef.current;

    const options = {
      root: null, // Viewport
      rootMargin: "0px", // Khoảng cách từ viewport để trigger
      threshold: 0.1, // 10% phần tử trong viewport thì trigger
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target); // Ngừng theo dõi sau khi hiện
        }
      });
    }, options);

    // Quan sát CEO
    if (ceoElement) {
      observer.observe(ceoElement);
    }

    // Quan sát các thành viên
    memberElements.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Quan sát phần Our Mission
    if (missionElement) {
      observer.observe(missionElement);
    }

    // Cleanup sử dụng biến cục bộ
    return () => {
      if (ceoElement) observer.unobserve(ceoElement);
      memberElements.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      if (missionElement) observer.unobserve(missionElement);
    };
  }, []); // Dependency array trống vì chỉ chạy một lần khi mount

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-white">
        {/* Tiêu đề */}
        <h1
          className="text-6xl font-bold text-center text-white mb-6 relative"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          About Us
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

        {/* Hình ảnh CEO */}
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <img
              ref={ceoRef}
              src={mainImg}
              alt="CEO"
              className="w-64 h-64 object-cover rounded-full shadow-lg mx-auto transition-all duration-1000 ease-in-out opacity-0 translate-y-8"
            />
            <h2
              className="text-2xl font-semibold mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our CEO
            </h2>
            <p className="text-lg text-gray-300">John Doe</p>
          </div>
        </div>

        {/* Danh sách thành viên */}
        <div className="mb-12">
          <h2
            className="text-3xl font-semibold text-center mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Team
          </h2>
          {isMobile ? (
            <Swiper
              spaceBetween={20} // Khoảng cách giữa các slide
              slidesPerView={1} // 1 slide trên mobile
              pagination={{ clickable: true }} // Hiển thị chấm tròn
              modules={[Pagination]} // Kích hoạt module Pagination
              className="swiper-container"
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center">
                    <img
                      ref={(el) => (memberRefs.current[index] = el)}
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 object-cover rounded-md shadow-lg mx-auto transition-all duration-1000 ease-in-out opacity-0 translate-y-8"
                    />
                    <h3
                      className="text-lg font-semibold mt-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-md text-gray-300">{member.position}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    ref={(el) => (memberRefs.current[index] = el)}
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 object-cover rounded-md shadow-lg mx-auto transition-all duration-1000 ease-in-out opacity-0 translate-y-8"
                  />
                  <h3
                    className="text-lg font-semibold mt-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-md text-gray-300">{member.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phần Our Mission */}
        <div
          ref={missionRef}
          className="text-center mb-12 transition-all duration-1000 ease-in-out opacity-0 translate-y-8"
        >
          <h2
            className="text-4xl font-semibold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Mission
          </h2>
          <span
            className="absolute left-1/2 transform -translate-x-1/2 w-96 h-2"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ff0000, transparent)",
              borderRadius: "50%",
              height: "6px",
            }}
          />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-10">
            We strive to provide the best service and experience for our
            customers. Our team is dedicated to making your memories last a
            lifetime.
          </p>
          {/* Hình ảnh */}
          <div className="mt-8 w-full h-110">
            <img
              src={mainImg}
              alt="Our mission"
              className="w-120 h-full object-fill rounded-lg shadow-xl mx-auto"
            />
          </div>
        </div>
      </div>

      {/* CSS inline */}
      <style>{`
        /* Responsive cho hình ảnh CEO */
        @media (max-width: 640px) {
          .w-64 {
            width: 12rem; /* Giảm kích thước trên mobile */
            height: 12rem;
          }
        }

        /* Responsive cho danh sách thành viên */
        .grid {
          display: grid;
          justify-items: center;
        }
        .w-40 {
          width: 10rem;
          height: 10rem;
        }
        @media (max-width: 640px) {
          .w-40 {
            width: 8rem; /* Giảm kích thước trên mobile */
            height: 8rem;
          }
          .text-lg {
            font-size: 1rem; /* Giảm font trên mobile */
          }
          .text-md {
            font-size: 0.875rem;
          }
        }
        @media (max-width: 768px) {
          .md\\:grid-cols-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 cột trên tablet */
          }
        }
        @media (max-width: 640px) {
          .sm\\:grid-cols-2 {
            grid-template-columns: repeat(1, minmax(0, 1fr)); /* 1 cột trên mobile */
          }
        }

        /* Responsive cho hình ảnh Our Mission */
        .w-120 {
          width: 30rem; /* 480px trên desktop */
        }
        .h-110 {
          height: 27.5rem; /* 440px trên desktop */
        }
        @media (max-width: 640px) {
          .w-120 {
            width: 100%; /* Full width trên mobile */
          }
          .h-110 {
            height: 15rem; /* Giảm chiều cao trên mobile */
          }
        }

        /* Style cho Swiper */
        .swiper-container {
          width: 100%;
          padding-bottom: 2rem; /* Khoảng cách cho pagination */
        }
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-pagination-bullet {
          background: #ff0000; /* Màu chấm tròn */
          opacity: 0.8;
        }
        .swiper-pagination-bullet-active {
          background: #ff0000;
          opacity: 1;
        }
      `}</style>
    </Layout>
  );
};

export default AboutUs;
