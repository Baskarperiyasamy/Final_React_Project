import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Bikes from './pages/Bikes';
import BikeDetail from './pages/BikeDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/bikes/:id" element={<BikeDetail />} />

          {/* Nested routing for Services */}
          <Route path="/services" element={<Services />}>
            <Route path=":slug" element={<ServiceDetail />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ paddingTop: 120, minHeight: '60vh', textAlign: 'center' }} className="page-enter">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 800, color: '#f0f0f0', lineHeight: 1 }}>404</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Page Not Found</h2>
              <a href="/" className="btn btn-red">Go Home</a>
            </div>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}
