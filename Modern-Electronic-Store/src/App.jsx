import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";          // <-- import
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import AuthPage from "./Pages/Login";

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
    <CartProvider>                  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage defaultTab="signup" />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;