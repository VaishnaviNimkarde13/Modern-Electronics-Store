

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './Pages/Login'
// import Home     from './Pages/Home'
import Services from './Pages/Services'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
          <Navbar />

      <Routes>
        {/* <Route path="/"         element={<Home />}     /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/login"    element={<AuthPage />} />
        <Route path="/signup"   element={<AuthPage defaultTab="signup" />} />
      </Routes>
            <Footer />

    </BrowserRouter>
  )
}

export default App

