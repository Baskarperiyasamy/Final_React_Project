import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useForm, useScrollTop } from '../hooks/useCustomHooks';

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Required';
  if (!v.email.trim()) e.email = 'Required';
  else if (!/\S+@\S+\.\S+/.test(v.email)) e.email = 'Invalid email';
  if (!v.phone.trim()) e.phone = 'Required';
  else if (!/^\d{10}$/.test(v.phone.replace(/\s/g,''))) e.phone = '10 digits required';
  return e;
}

export default function Enquiry() {
  useScrollTop();
  const { state, dispatch } = useApp();
  const [done, setDone] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { name: '', email: '', phone: '', finance: 'no' }, validate
  );

  const onSuccess = () => { dispatch({ type: 'CLEAR_CART' }); setDone(true); };

  if (done) return (
    <div style={{ paddingTop: 120, minHeight: '70vh', textAlign: 'center' }} className="page-enter">
      <div style={{ fontSize: 56, marginBottom: 20 }}>🏍️</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>Enquiry Submitted!</h2>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 28 }}>Our team will call you within 2 hours.</p>
      <Link to="/bikes" className="btn btn-red">Browse More Bikes</Link>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#0a0a0a', padding: '60px 0 50px' }}>
        <div className="container">
          <span className="badge badge-red" style={{ marginBottom: 12, display: 'inline-block' }}>My Enquiry</span>
          <h1 className="section-title" style={{ color: '#fff' }}>Enquiry List</h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {state.cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🏍️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>No Bikes Added</h3>
            <p style={{ color: '#666', marginBottom: 28, fontSize: 14 }}>Browse our collection and add bikes you're interested in.</p>
            <Link to="/bikes" className="btn btn-red">Explore Bikes</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
            {/* Bike List */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
                Selected Bikes ({state.cart.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {state.cart.map(bike => (
                  <div key={bike.id} style={{ display: 'flex', gap: 16, background: '#f9f9f9', border: '1px solid #eee', borderRadius: 2, padding: 14, alignItems: 'center' }}>
                    <img src={bike.image} alt={bike.name} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase' }}>{bike.name}</div>
                      <div style={{ fontSize: 13, color: '#d32f2f', fontWeight: 600 }}>₹{bike.price.toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: 11, color: '#999' }}>{bike.cc}cc · {bike.category}</div>
                    </div>
                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: bike.id })}
                      style={{ background: 'none', border: 'none', color: '#d32f2f', fontSize: 18, cursor: 'pointer', padding: '4px 8px' }}>✕</button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800 }}>
                  <span>Total (est.)</span>
                  <span style={{ color: '#d32f2f' }}>₹{state.cart.reduce((s, b) => s + b.price, 0).toLocaleString('en-IN')}</span>
                </div>
                <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>*Ex-showroom. Finance available on all models.</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>Your Details</h3>
              <form onSubmit={handleSubmit(onSuccess)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Rahul Sharma" />
                  {touched.name && errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Email *</label>
                  <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="rahul@example.com" />
                  {touched.email && errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Phone *</label>
                  <input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="9876543210" />
                  {touched.phone && errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Interested in Finance?</label>
                  <select name="finance" value={values.finance} onChange={handleChange}>
                    <option value="no">No, I'll pay cash</option>
                    <option value="yes">Yes, I need EMI</option>
                    <option value="maybe">Not sure yet</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-red" style={{ marginTop: 8 }}>Submit Enquiry →</button>
                <button type="button" onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  style={{ background: 'none', border: 'none', color: '#999', fontSize: 12, cursor: 'pointer', textAlign: 'left' }}>
                  Clear all bikes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
