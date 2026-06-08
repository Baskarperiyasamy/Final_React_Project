import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { bikes } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import { useScrollTop, useInView } from '../hooks/useCustomHooks';

function StatBox({ value, label }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 800, color: '#d32f2f', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function Home() {
  useScrollTop();
  const heroRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Sport');
  const featured = bikes.filter(b => b.new).slice(0, 3);
  const categoryBikes = bikes.filter(b => b.category === activeCategory).slice(0, 3);

  // Parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ height: '100vh', background: '#0a0a0a', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div ref={heroRef} style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.95) 40%, transparent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 620 }}>
            <span className="badge badge-red" style={{ marginBottom: 20, display: 'inline-block' }}>2025 Collection Live</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,9vw,7rem)', fontWeight: 800, color: '#fff', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 24 }}>
              Ride the<br /><span style={{ color: '#d32f2f' }}>Legend.</span>
            </h1>
            <p style={{ fontSize: 16, color: '#aaa', lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
              India's finest bike showroom. Sport bikes, cruisers, adventure tourers — find your perfect machine and book a test ride today.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/bikes" className="btn btn-red">Explore Bikes →</Link>
              <Link to="/services/test-ride" className="btn btn-outline" style={{ color: '#fff', borderColor: '#555' }}>Book Test Ride</Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: '#444', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
          <div style={{ width: 1, height: 48, background: '#333', margin: '0 auto 10px', animation: 'pulse 2s infinite' }} />
          Scroll
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#f9f9f9', padding: '60px 0', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32 }}>
            <StatBox value="6+" label="Bike Models" />
            <StatBox value="4" label="Categories" />
            <StatBox value="500+" label="Happy Riders" />
            <StatBox value="10+" label="Finance Partners" />
            <StatBox value="15yr" label="In Business" />
          </div>
        </div>
      </section>

      {/* FEATURED NEW */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="badge badge-red" style={{ marginBottom: 10, display: 'inline-block' }}>New Arrivals</span>
              <h2 className="section-title">Latest Models</h2>
            </div>
            <Link to="/bikes" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: 12 }}>View All</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {featured.map(bike => <BikeCard key={bike.id} bike={bike} />)}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER SECTION */}
      <section style={{ padding: '80px 0', background: '#f9f9f9' }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="badge badge-black" style={{ marginBottom: 10, display: 'inline-block' }}>By Category</span>
            <h2 className="section-title">Browse by Type</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            {['Sport', 'Cruiser', 'Adventure', 'Naked'].map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={activeCategory === c ? 'btn btn-red' : 'btn btn-outline'}
                style={{ padding: '8px 20px', fontSize: 12 }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {categoryBikes.length > 0 ? categoryBikes.map(bike => <BikeCard key={bike.id} bike={bike} />) : (
              <p style={{ color: '#999', fontSize: 14 }}>No bikes in this category yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: '#d32f2f', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginBottom: 16 }}>
            Ready to Ride?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 32 }}>Visit our showroom or book a test ride from the comfort of your home.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services/test-ride" className="btn" style={{ background: '#fff', color: '#d32f2f' }}>Book Test Ride</Link>
            <Link to="/contact" className="btn" style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
