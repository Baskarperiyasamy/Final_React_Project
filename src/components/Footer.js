import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#aaa', marginTop: 80 }}>
      <div className="container" style={{ padding: '60px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              Moto<span style={{ color: '#d32f2f' }}>Verse</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#666' }}>India's premium bike showroom. Ride your dream machine today.</p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Quick Links</div>
            {[['/', 'Home'], ['/bikes', 'All Bikes'], ['/services', 'Services'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#666'}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Categories</div>
            {['Sport', 'Cruiser', 'Adventure', 'Naked'].map(c => (
              <Link key={c} to={`/bikes?category=${c}`} style={{ display: 'block', fontSize: 13, color: '#666', marginBottom: 8 }}
                onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#666'}>{c}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Contact</div>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>📍 No.12, Race Course Road, Salem – 636107</p>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>📞 +91 86104 36369</p>
            <p style={{ fontSize: 13, color: '#666' }}>✉️ hello@motoverse.in</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#444' }}>© 2025 MotoVerse. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#444' }}>Built with React · react-router-dom v6</p>
        </div>
      </div>
    </footer>
  );
}
