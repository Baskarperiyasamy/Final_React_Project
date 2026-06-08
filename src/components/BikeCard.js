import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function BikeCard({ bike }) {
  const { state, dispatch } = useApp();
  const inWishlist = state.wishlist.some(i => i.id === bike.id);
  const inCart = state.cart.some(i => i.id === bike.id);

  return (
    <div style={{
      background: '#fff', border: '1px solid #f0f0f0', borderRadius: 2,
      overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s',
      position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, zIndex: 2 }}>
        {bike.new && <span className="badge badge-red">New</span>}
        {!bike.inStock && <span className="badge" style={{ background: '#555', color: '#fff' }}>Sold Out</span>}
      </div>

      {/* Wishlist btn */}
      <button onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', bike })}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          background: inWishlist ? '#d32f2f' : 'rgba(255,255,255,0.9)',
          border: 'none', borderRadius: '50%', width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, cursor: 'pointer', transition: 'all 0.2s',
          color: inWishlist ? '#fff' : '#999',
        }}>♥</button>

      {/* Image */}
      <div style={{ height: 200, overflow: 'hidden', background: '#f9f9f9' }}>
        <img src={bike.image} alt={bike.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <span className="badge badge-outline">{bike.category}</span>
          <span style={{ fontSize: 11, color: '#999' }}>{bike.cc}cc</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, textTransform: 'uppercase', margin: '8px 0 4px' }}>{bike.name}</h3>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 1.5 }}>{bike.description.slice(0, 70)}...</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
          {[['Power', bike.power], ['Top Speed', bike.topSpeed]].map(([k, v]) => (
            <div key={k} style={{ background: '#f9f9f9', padding: '6px 10px', borderRadius: 2 }}>
              <div style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>
            ₹{(bike.price / 1000).toFixed(0)}K
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/bikes/${bike.id}`} className="btn btn-outline" style={{ padding: '7px 14px', fontSize: 11 }}>View</Link>
            {bike.inStock && (
              <button onClick={() => dispatch({ type: 'ADD_TO_CART', bike })}
                className="btn btn-red" style={{ padding: '7px 14px', fontSize: 11 }}
                disabled={inCart}
              >{inCart ? '✓ Added' : 'Enquire'}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
