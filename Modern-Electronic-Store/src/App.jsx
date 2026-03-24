import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import AuthPage from "./Pages/Login";
import Products from "./Pages/Products";

function MainPage() {
  return (
    <>
      <Navbar />

      <div id="home" style={{ paddingTop: "80px" }}>
        <Home />
      </div>

      <div id="products" style={{ paddingTop: "80px" }}>
        <Products />
      </div>

      <div id="services" style={{ paddingTop: "80px" }}>
        <Services />
      </div>
      <div id="contact" style={{ paddingTop: "80px" }}>
        <Contact />
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website */}
        <Route path="/" element={<MainPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage defaultTab="signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;