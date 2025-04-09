import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sereneImg from "../../assets/serene.jpg";
import nostalgicImg from "../../assets/nostalgic2.jpg";
import cheerfulImg from "../../assets/cheerful.jpeg";

const moodData = [
  { id: "serene", name: "Serene", image: sereneImg },
  { id: "nostalgic", name: "Nostalgic", image: nostalgicImg },
  { id: "cheerful", name: "Cheerful", image: cheerfulImg },
];

const Favorites = () => {
  const moodboardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const moodboardElement = moodboardRef.current;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (moodboardElement) {
      observer.observe(moodboardElement);
    }

    return () => {
      if (moodboardElement) observer.unobserve(moodboardElement);
    };
  }, []);

  const handleMoodClick = (id) => {
    // Kiểm tra xem id có tồn tại trong moodData hay không
    const isValidMood = moodData.some((mood) => mood.id === id);
    if (isValidMood) {
      navigate(`/favorites/${id}`);
    } else {
      navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu id không hợp lệ
    }
  };

  return (
    <div className="primary">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen z-10">
        <div
          ref={moodboardRef}
          className="border-2 border-amber-100 rounded-lg shadow-lg bg-gradient-to-r from-amber-300 to-amber-400 w-3/4 p-8 transition-all duration-1000 ease-in-out opacity-0 translate-y-8 overflow-hidden"
        >
          <h1
            className="text-6xl font-bold text-center text-white mb-6 relative"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 moodboard-container">
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
          {/* back button  */}
          <button
            className="px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer mb-6 flex justify-center w-80 mt-10 "
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>

      <style>{`
        .grid {
          display: grid;
          justify-items: center;
        }
        .h-80 {
          height: 20rem;
        }
        @media (max-width: 640px) {
          .sm\\:grid-cols-3 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          .h-80 {
            height: 16rem;
          }
          .text-lg {
            font-size: 1rem;
          }
          .text-xl {
            font-size: 1.125rem;
          }
        }

        .moodboard-container {
          position: relative;
        }
        .moodboard-item img {
          transition: filter 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        .moodboard-item:hover img {
          filter: grayscale(0%) brightness(100%);
          transform: scale(1.05);
          z-index: 10;
        }
        .moodboard-item:hover ~ .moodboard-item img,
        .moodboard-container:hover .moodboard-item img {
          filter: grayscale(100%) brightness(50%);
        }
        .moodboard-item:hover img {
          filter: grayscale(0%) brightness(100%) !important;
        }
      `}</style>
    </div>
  );
};

export default Favorites;
