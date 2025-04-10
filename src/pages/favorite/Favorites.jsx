import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sereneImg from "../../assets/duoitancay.png";
import nostalgicImg from "../../assets/giadinh.jpg";
import cheerfulImg from "../../assets/phieudu4.jpg";
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

const moodData = [
  { id: "saigon1", name: "Dưới tán cây", image: sereneImg },
  { id: "saigon2", name: "Gia Định", image: nostalgicImg },
  { id: "saigon3", name: "Phiêu Du ", image: cheerfulImg },
];

const Favorites = () => {
  const moodboardRef = useRef(null);
  const navigate = useNavigate();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
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
  }, []);

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

  return (
    <div className="primary relative overflow-hidden h-screen flex justify-center items-center">
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
              fontSize: `${24 + (idx % 5) * 6}px`,
            }}
          >
            <Icon />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen z-10 relative">
        <div
          ref={moodboardRef}
          className="border-2 border-amber-100 rounded-lg shadow-lg bg-gradient-to-r from-amber-300 to-amber-400 w-3/4 p-8 transition-all duration-1000 ease-in-out opacity-0 translate-y-8 overflow-hidden backdrop-blur-md bg-opacity-80 relative"
        >
          <h1
            className="text-6xl font-bold text-center text-white mb-6 relative"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Moodboard
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

          <p className="text-lg text-gray-800 mb-8 text-center">
            Select a mood to see the corresponding style and props.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 moodboard-container z-10 relative">
            {moodData.map((mood) => (
              <div
                key={mood.id}
                className="moodboard-item"
                onClick={() => handleMoodClick(mood.id)}
              >
                <img
                  src={mood.image}
                  alt={mood.name}
                  className="w-full h-80 object-cover rounded-lg shadow-lg transition-all duration-500 ease-in-out cursor-pointer"
                />
                <h3
                  className="text-xl font-semibold mt-4 text-gray-800 text-center"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {mood.name}
                </h3>
              </div>
            ))}
          </div>

          <button
            className="px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer mb-6 flex justify-center w-80 mt-10 mx-auto"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default Favorites;
