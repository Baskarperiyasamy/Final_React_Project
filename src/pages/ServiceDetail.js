import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/bikes';
import { useForm } from '../hooks/useCustomHooks';
import { useScrollTop } from '../hooks/useCustomHooks';

function validate(values) {
  const errs = {};
  if (!values.name.trim()) errs.name = 'Name is required';
  if (!values.phone.trim()) errs.phone = 'Phone is required';
  else if (!/^\d{10}$/.test(values.phone.replace(/\s/g, ''))) errs.phone = 'Enter valid 10-digit number';
  if (!values.date) errs.date = 'Please choose a date';
  return errs;
}

export default function ServiceDetail() {
  useScrollTop();
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const { values, errors, touched, submitted, handleChange, handleBlur, handleSubmit, reset } = useForm(
    { name: '', phone: '', date: '', note: '' }, validate
  );

  if (!service) return (
    <div style={{ padding: '40px 0' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, textTransform: 'uppercase', marginBottom: 12 }}>Service not found</h3>
      <Link to="/services" className="btn btn-outline" style={{ fontSize: 12 }}>← Back to Services</Link>
    </div>
  );

  const onSuccess = () => setTimeout(reset, 3000);

  return (
    <div>
      {/* Service Header */}
      <div style={{ background: '#0a0a0a', borderRadius: 2, padding: '32px', marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{service.icon}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginBottom: 8 }}>{service.title}</h2>
        <p style={{ color: '#aaa', fontSize: 14, lineHeight: 1.7 }}>{service.description}</p>
        <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
          <div><span style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>Duration</span><br /><span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{service.duration}</span></div>
          <div><span style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>Cost</span><br /><span style={{ color: '#d32f2f', fontSize: 14, fontWeight: 600 }}>{service.cost}</span></div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>How It Works</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {service.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, background: '#d32f2f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <p style={{ fontSize: 14, color: '#444', paddingTop: 4 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>Book Now</h3>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Booking Confirmed!</p>
            <p style={{ fontSize: 13, color: '#666' }}>We'll contact you on {values.phone} to confirm.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSuccess)} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Full Name *</label>
                <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Rahul Sharma" />
                {touched.name && errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Phone *</label>
                <input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="9876543210" />
                {touched.phone && errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Preferred Date *</label>
                <input type="date" name="date" value={values.date} onChange={handleChange} onBlur={handleBlur} min={new Date().toISOString().split('T')[0]} />
                {touched.date && errors.date && <p className="error-text">{errors.date}</p>}
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Message (Optional)</label>
              <textarea name="note" value={values.note} onChange={handleChange} rows={3} placeholder="Any specific request..." style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn btn-red" style={{ marginTop: 20 }}>Confirm Booking →</button>
          </form>
        )}
      </div>
    </div>
  );
}
