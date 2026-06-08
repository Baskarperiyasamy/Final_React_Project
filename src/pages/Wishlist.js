import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BikeCard from '../components/BikeCard';
import { useScrollTop } from '../hooks/useCustomHooks';

export default function Wishlist() {
  useScrollTop();
  const { state } = useApp();

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#0a0a0a', padding: '60px 0 50px' }}>
        <div className="container">
          <span className="badge badge-red" style={{ marginBottom: 12, display: 'inline-block' }}>Saved</span>
          <h1 className="section-title" style={{ color: '#fff' }}>My Wishlist</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {state.wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>♡</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Nothing Saved Yet</h3>
            <p style={{ color: '#666', marginBottom: 28, fontSize: 14 }}>Click the heart icon on any bike to save it here.</p>
            <Link to="/bikes" className="btn btn-red">Browse Bikes</Link>
          </div>
        ) : (
          <>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>{state.wishlist.length} bike{state.wishlist.length > 1 ? 's' : ''} saved</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {state.wishlist.map(bike => <BikeCard key={bike.id} bike={bike} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
