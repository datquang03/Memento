import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import mainImg from "../../assets/memento.jpg";
import { useNavigate } from "react-router-dom";

// Component con cho mỗi slide
const GallerySlide = ({ src, id, description }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative group">
      <img
        src={src}
        id={id}
        className={`w-full h-80 object-cover rounded-lg shadow-md transition-all duration-2000 ease-in-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } group-hover:scale-105`}
        onLoad={() => setIsLoaded(true)}
        onClick={() => navigate(`/galleries/${id}`)}
      />
      <div
        className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-60 text-black text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "30px",
        }}
      >
        {description}
      </div>
    </div>
  );
};

const Galleries = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-6xl font-bold text-center text-white mb-6 relative"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Galleries
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
          className="mySwiper cursor-pointer mt-6"
        >
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 1"
              description="Beautiful Sunset"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 2"
              description="Mountain Adventure"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 3"
              description="City Lights"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 4"
              description="Ocean Waves"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 5"
              description="Forest Path"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 6"
              description="Desert Dunes"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 7"
              description="Snowy Peaks"
            />
          </SwiperSlide>
          <SwiperSlide>
            <GallerySlide
              src={mainImg}
              id="Gallery 8"
              description="Starry Night"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </Layout>
  );
};

export default Galleries;
