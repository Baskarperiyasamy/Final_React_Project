import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { services } from '../data/bikes';
import { useScrollTop } from '../hooks/useCustomHooks';

export default function Services() {
  useScrollTop();
  const { slug } = useParams();

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#0a0a0a', padding: '60px 0 50px' }}>
        <div className="container">
          <span className="badge badge-red" style={{ marginBottom: 12, display: 'inline-block' }}>What We Offer</span>
          <h1 className="section-title" style={{ color: '#fff' }}>Our Services</h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }}>
          {/* Sidebar nav */}
          <div style={{ background: '#f9f9f9', borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', position: 'sticky', top: 80 }}>
            {services.map(s => (
              <NavLink key={s.slug} to={`/services/${s.slug}`}
                style={({ isActive }) => ({
                  display: 'flex', gap: 12, alignItems: 'center',
                  padding: '14px 18px', borderBottom: '1px solid #eee',
                  background: isActive ? '#0a0a0a' : 'transparent',
                  color: isActive ? '#fff' : '#444',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
                  letterSpacing: 0.5, textTransform: 'uppercase',
                })}
              >
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                {s.title}
              </NavLink>
            ))}
          </div>

          {/* Outlet */}
          <div>
            {!slug ? (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Choose a Service</h2>
                <p style={{ color: '#666', marginBottom: 32, fontSize: 14 }}>Select a service from the left to learn more.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {services.map(s => (
                    <NavLink key={s.slug} to={`/services/${s.slug}`}
                      style={{ display: 'block', background: '#f9f9f9', border: '1px solid #eee', borderRadius: 2, padding: '20px', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.background = '#f9f9f9'; e.currentTarget.style.color = '#000'; }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{s.short}</div>
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
}
