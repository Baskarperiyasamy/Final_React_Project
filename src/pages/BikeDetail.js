import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bikes } from '../data/bikes';
import { useApp } from '../context/AppContext';
import { useScrollTop } from '../hooks/useCustomHooks';

export default function BikeDetail() {
  useScrollTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const bike = bikes.find(b => b.id === Number(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!bike) return (
    <div style={{ paddingTop: 120, textAlign: 'center', minHeight: '60vh' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, textTransform: 'uppercase', marginBottom: 16 }}>Bike not found</h2>
      <Link to="/bikes" className="btn btn-red">Back to Bikes</Link>
    </div>
  );

  const inWishlist = state.wishlist.some(i => i.id === bike.id);
  const inCart = state.cart.some(i => i.id === bike.id);

  const specs = [
    ['Engine', `${bike.cc}cc`], ['Power', bike.power], ['Torque', bike.torque],
    ['Weight', bike.weight], ['Top Speed', bike.topSpeed], ['Fuel', bike.fuelType],
  ];

  const related = bikes.filter(b => b.category === bike.category && b.id !== bike.id).slice(0, 2);

  const tabs = ['overview', 'specs', 'features'];

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      {/* Breadcrumb */}
      <div style={{ background: '#f9f9f9', padding: '14px 0', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', gap: 8, fontSize: 13, color: '#999', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#999' }}>Home</Link> /
          <Link to="/bikes" style={{ color: '#999' }}>Bikes</Link> /
          <span style={{ color: '#000' }}>{bike.name}</span>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>
          {/* Image */}
          <div>
            <div style={{ borderRadius: 2, overflow: 'hidden', background: '#f9f9f9', position: 'relative' }}>
              {bike.new && <span className="badge badge-red" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>New</span>}
              <img src={bike.image} alt={bike.name} style={{ width: '100%', height: 340, objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', bike })}
                className={inWishlist ? 'btn btn-red' : 'btn btn-outline'}
                style={{ flex: 1, padding: '10px', fontSize: 13 }}>
                {inWishlist ? '♥ Wishlisted' : '♡ Add to Wishlist'}
              </button>
              <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '10px 16px', fontSize: 13 }}>← Back</button>
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="badge badge-outline" style={{ marginBottom: 12, display: 'inline-block' }}>{bike.category}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1, marginBottom: 8 }}>{bike.name}</h1>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>by {bike.brand}</p>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#d32f2f', marginBottom: 8 }}>
              ₹{bike.price.toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: 12, color: '#999', marginBottom: 28 }}>*Ex-showroom price. EMI from ₹{Math.round(bike.price / 60 / 100) * 100}/month</p>

            {!bike.inStock && (
              <div style={{ background: '#fff3e0', border: '1px solid #ffe0b2', borderRadius: 2, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#e65100' }}>
                ⚠️ Currently out of stock. You can still enquire.
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              <button onClick={() => dispatch({ type: 'ADD_TO_CART', bike })}
                className="btn btn-red" style={{ flex: 1, minWidth: 140 }} disabled={inCart}>
                {inCart ? '✓ Enquiry Added' : 'Add to Enquiry'}
              </button>
              <Link to="/services/test-ride" className="btn btn-outline" style={{ flex: 1, minWidth: 140, textAlign: 'center' }}>Book Test Ride</Link>
            </div>

            {/* Quick specs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 28 }}>
              {specs.map(([k, v]) => (
                <div key={k} style={{ background: '#f9f9f9', padding: '10px 12px', borderRadius: 2 }}>
                  <div style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #eee', display: 'flex', gap: 0, marginBottom: 20 }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  style={{
                    background: 'none', border: 'none', padding: '10px 18px',
                    fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
                    letterSpacing: 1, textTransform: 'uppercase',
                    color: activeTab === t ? '#000' : '#999',
                    borderBottom: activeTab === t ? '2px solid #d32f2f' : '2px solid transparent',
                    marginBottom: -1, transition: 'all 0.2s',
                  }}>{t}</button>
              ))}
            </div>

            {activeTab === 'overview' && <p style={{ fontSize: 14, lineHeight: 1.8, color: '#444' }}>{bike.description}</p>}
            {activeTab === 'specs' && (
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '9px 0', color: '#888', width: '40%' }}>{k}</td>
                      <td style={{ padding: '9px 0', fontWeight: 500 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'features' && (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {bike.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    <span style={{ color: '#d32f2f', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Related Bikes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {related.map(b => (
                <Link key={b.id} to={`/bikes/${b.id}`} style={{ display: 'flex', gap: 16, background: '#f9f9f9', borderRadius: 2, overflow: 'hidden', border: '1px solid #eee' }}>
                  <img src={b.image} alt={b.name} style={{ width: 120, height: 90, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ padding: '12px 12px 12px 0' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>{b.name}</div>
                    <div style={{ fontSize: 13, color: '#d32f2f', fontWeight: 600 }}>₹{(b.price / 1000).toFixed(0)}K</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
