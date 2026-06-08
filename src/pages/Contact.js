import React, { useRef, useEffect, useState } from 'react';
import { useForm, useScrollTop, useFetch } from '../hooks/useCustomHooks';

function validate(values) {
  const errs = {};
  if (!values.name.trim()) errs.name = 'Name is required';
  if (!values.email.trim()) errs.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = 'Enter a valid email';
  if (!values.phone.trim()) errs.phone = 'Phone is required';
  else if (!/^\d{10}$/.test(values.phone.replace(/\s/g, ''))) errs.phone = '10-digit number required';
  if (!values.subject) errs.subject = 'Please select a subject';
  if (!values.message.trim()) errs.message = 'Message is required';
  else if (values.message.trim().length < 20) errs.message = 'Min 20 characters';
  return errs;
}

export default function Contact() {
  useScrollTop();
  const mapRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch live weather for Chennai (using open-meteo, no API key needed)
  const { data: weather } = useFetch('https://api.open-meteo.com/v1/forecast?latitude=13.08&longitude=80.27&current_weather=true');

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } = useForm(
    { name: '', email: '', phone: '', subject: '', message: '' }, validate
  );

  const onSuccess = () => {
    setSubmitted(true);
    setTimeout(() => { reset(); setSubmitted(false); }, 4000);
  };

  // useRef for scroll animation
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.style.opacity = '0';
      const t = setTimeout(() => { if (mapRef.current) mapRef.current.style.opacity = '1'; }, 300);
      return () => clearTimeout(t);
    }
  }, []);

  const Field = ({ name, label, children, required }) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
        {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
      </label>
      {children}
      {touched[name] && errors[name] && <p className="error-text">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      <div style={{ background: '#0a0a0a', padding: '60px 0 50px' }}>
        <div className="container">
          <span className="badge badge-red" style={{ marginBottom: 12, display: 'inline-block' }}>Reach Us</span>
          <h1 className="section-title" style={{ color: '#fff' }}>Contact Us</h1>
          {weather?.current_weather && (
            <p style={{ color: '#555', fontSize: 13, marginTop: 8 }}>
              📍 Salem now: {Math.round(weather.current_weather.temperature)}°C — Come visit us!
            </p>
          )}
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
          {/* Form */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Send a Message</h2>
            {submitted ? (
              <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 2, padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ fontSize: 13, color: '#388e3c' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSuccess)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field name="name" label="Full Name" required>
                    <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="BASKAR" />
                  </Field>
                  <Field name="phone" label="Phone" required>
                    <input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="9876543210" />
                  </Field>
                </div>
                <Field name="email" label="Email" required>
                  <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="rahul@example.com" />
                </Field>
                <Field name="subject" label="Subject" required>
                  <select name="subject" value={values.subject} onChange={handleChange} onBlur={handleBlur}>
                    <option value="">Select a topic</option>
                    <option>Bike Enquiry</option>
                    <option>Test Ride Booking</option>
                    <option>Service Appointment</option>
                    <option>Finance Query</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field name="message" label="Message" required>
                  <textarea name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} rows={4} placeholder="Tell us what you're looking for..." style={{ resize: 'vertical' }} />
                </Field>
                <button type="submit" className="btn btn-red">Send Message →</button>
              </form>
            )}
          </div>

          {/* Contact info + map */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Find Us</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
              {[
                ['📍', 'Address', 'No.12, Race Course Road, Attur, Salem – 636107'],
                ['📞', 'Phone', '+91 86104 36369 | +91 44 2812 3456'],
                ['✉️', 'Email', 'hello@motoverse.in'],
                ['🕐', 'Hours', 'Mon – Sat: 9:00 AM – 7:30 PM\nSunday: 10:00 AM – 5:00 PM'],
              ].map(([icon, label, value]) => (
                <div key={label} style={{ display: 'flex', gap: 14 }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#999', marginBottom: 3 }}>{label}</div>
                    <p style={{ fontSize: 14, color: '#333', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Embed map */}
            <div ref={mapRef} style={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', transition: 'opacity 0.5s' }}>
              <iframe
                title="MotoVerse Showroom Location"
                width="100%" height="260"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.58,11.58,78.68,11.68&layer=mapnik&marker=11.63,78.62"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
