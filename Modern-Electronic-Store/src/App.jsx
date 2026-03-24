import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import AuthPage from "./Pages/Login";

function MainPage() {
  return (
    <>
      <Navbar />

      <div id="home" style={{ paddingTop: "80px" }}>
        <Home />
      </div>

      <div id="services" style={{ paddingTop: "80px" }}>
        <Services />
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