import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  registerAction,
  logoutAction,
} from "../../redux/action/user.action";
import { auth, googleProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const bookRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const { loading: registerLoading, error: registerError } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    const bookElement = bookRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bookElement) observer.observe(bookElement);
    return () => {
      if (bookElement) observer.unobserve(bookElement);
    };
  }, []);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const loginPayload = {
        email: user.email,
        username: user.displayName,
      };
      dispatch(loginAction(loginPayload));
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(loginData));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(registerData));
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 animate-bgGradient">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />
      <div
        ref={bookRef}
        className="relative w-full max-w-lg h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-1000 ease-in-out opacity-0 translate-y-8 perspective"
      >
        {/* Login Page */}
        <div
          className={`absolute inset-0 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-1000 ease-in-out transform ${
            showRegister ? "rotate-y-180 z-10" : "rotate-y-0 z-20"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-twinkle underline-effect">
            Memento
          </h2>
          {loading && <div>Loading...</div>}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div className="animate-slideIn" style={{ animationDelay: "0.2s" }}>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="input-style"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
            </div>
            <div className="animate-slideIn" style={{ animationDelay: "0.4s" }}>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="input-style"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary animate-bounceIn"
              style={{ animationDelay: "0.6s" }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn-outline animate-bounceIn flex items-center justify-center"
              style={{ animationDelay: "0.8s" }}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 animate-fadeIn">
            Don't have an account?{" "}
            <button
              onClick={() => setShowRegister(true)}
              className="text-purple-600 hover:underline"
            >
              Go to Register
            </button>
          </p>
          {userInfo && (
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Register Page */}
        <div
          className={`absolute inset-0 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-100 to-gray-50 transition-all duration-1000 ease-in-out transform ${
            showRegister ? "rotate-y-0 z-20" : "rotate-y--180 z-10"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-twinkle underline-effect">
            Memento
          </h2>
          {registerLoading && <div>Loading...</div>}
          {registerError && (
            <div className="text-red-500 text-center mb-4">{registerError}</div>
          )}
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              placeholder="Choose a username"
              className="input-style"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="input-style"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="input-style"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Choose a password"
              className="input-style"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <button
              type="submit"
              disabled={registerLoading}
              className="btn-primary animate-bounceIn"
              style={{ animationDelay: "1s" }}
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 animate-fadeIn">
            Already have an account?{" "}
            <button
              onClick={() => setShowRegister(false)}
              className="text-indigo-600 hover:underline"
            >
              Go to Login
            </button>
          </p>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .perspective {
          perspective: 1200px;
        }
        .rotate-y-0 { transform: rotateY(0deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y--180 { transform: rotateY(-180deg); }

        @keyframes twinkle {
          0%, 100% { filter: brightness(1); text-shadow: 0 0 5px rgba(0,0,0,0.2); }
          50% { filter: brightness(1.5); text-shadow: 0 0 15px rgba(0,0,0,0.5); }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.8s ease-in-out forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }

        @keyframes bounceIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-in-out forwards;
        }

        @keyframes bgGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bgGradient {
          background-size: 200% 200%;
          animation: bgGradient 15s ease-in-out infinite;
        }

        .input-style {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.3s;
        }
        .input-style:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
        }

        .btn-primary {
          width: 100%;
          padding: 0.75rem;
          background-color: #6366f1;
          color: white;
          border-radius: 0.5rem;
          transition: all 0.3s;
        }
        .btn-primary:hover {
          background-color: #4f46e5;
        }

        .btn-outline {
          width: 100%;
          padding: 0.75rem;
          background: white;
          color: #333;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          transition: all 0.3s;
        }
        .btn-outline:hover {
          background-color: #f9fafb;
        }

        .underline-effect {
          position: relative;
        }
        .underline-effect::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, transparent, #8b5cf6, transparent);
          border-radius: 50%;
          transform: scaleX(0);
          transform-origin: left;
          animation: underline 1.5s ease-in-out forwards;
          animation-delay: 0.5s;
        }
        @keyframes underline {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default Login;
