import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import AboutUs from "./pages/about/AboutUs";
import ContactUs from "./pages/contact/ContactUs";
import Packages from "./pages/packages/Packages";
import ScrollOnTop from "./components/AdditionComponents/ScrollToTop";
import PackageDetail from "./pages/detail/PackageDetail";
import Favorites from "./pages/favorite/Favorites";
import FavoritesDetail from "./pages/detail/FavoriteDetail";
import NotFound from "./pages/not-found/NotFound";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <BrowserRouter>
      <ScrollOnTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites/:id" element={<FavoritesDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
