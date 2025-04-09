import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import mainImg from "../../assets/memento.jpg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Định nghĩa 7 màu cho animation
  const colorAnimation = `
    @keyframes colorChange {
      0% { color: #ff0000; } /* Đỏ */
      16.67% { color: #ff7f00; } /* Cam */
      33.33% { color: #ffff00; } /* Vàng */
      50% { color: #00ff00; } /* Xanh lá */
      66.67% { color: #0000ff; } /* Xanh dương */
      83.33% { color: #4b0082; } /* Tím */
      100% { color: #ff0000; } /* Quay lại đỏ */
    }
  `;

  return (
    <Layout>
      {!isLoaded && (
        <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse" />
      )}
      <div className="container min-h-screen px-2 flex gap-8 py-11">
        <div className="flex-1 h-96">
          <img
            src={mainImg}
            alt="mainImg"
            className={`w-full h-full object-cover rounded-3xl shadow-lg transition-all duration-3000 ease-in-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-4xl font-bold text-white text-center leading-relaxed">
            Keep your memories with{" "}
            <span
              className="text-red-500 text-4xl"
              style={{
                fontFamily: "Playfair Display",
                animation: "colorChange 7s infinite ease-in-out",
              }}
            >
              <style>{colorAnimation}</style>
              Memento
            </span>
          </p>
          <p className="text-xl text-white underline-offset-10 underline text-center leading-relaxed">
            Struggling to pick up a good photo?
          </p>
          <button
            className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/favorites")}
          >
            Explore our works
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
