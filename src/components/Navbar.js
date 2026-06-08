import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { state } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? '#0a0a0a' : 'rgba(10,10,10,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: scrolled ? '1px solid #222' : '1px solid transparent',
    transition: 'all 0.3s',
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/bikes', label: 'Bikes' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0 }}>
          Moto<span style={{ color: '#d32f2f' }}>Verse</span>
        </Link>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 28, marginLeft: 12, flex: 1 }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
                letterSpacing: 1, textTransform: 'uppercase', color: isActive ? '#d32f2f' : '#ccc',
                borderBottom: isActive ? '2px solid #d32f2f' : '2px solid transparent',
                paddingBottom: 2, transition: 'color 0.2s',
              })}
            >{l.label}</NavLink>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to="/wishlist" style={{ color: '#ccc', fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', position: 'relative' }}>
            ♥ <span style={{ color: '#d32f2f' }}>{state.wishlist.length || ''}</span>
          </Link>
          <Link to="/enquiry" className="btn btn-red" style={{ padding: '8px 18px', fontSize: 12 }}>
            Enquiry {state.cart.length > 0 && <span style={{ background: '#fff', color: '#d32f2f', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>{state.cart.length}</span>}
          </Link>
          {/* Mobile menu btn */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, display: 'none' }} className="mobile-menu-btn">☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div ref={menuRef} style={{ background: '#0a0a0a', borderTop: '1px solid #222', padding: '16px 24px 24px' }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'block', padding: '10px 0',
                fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
                letterSpacing: 1, textTransform: 'uppercase', color: isActive ? '#d32f2f' : '#ccc',
                borderBottom: '1px solid #1a1a1a',
              })}
            >{l.label}</NavLink>
          ))}
        </div>
      )}

      <style>{`.mobile-menu-btn { display: none !important; } @media(max-width:768px){ .mobile-menu-btn { display: block !important; } }`}</style>
    </nav>
  );
}
