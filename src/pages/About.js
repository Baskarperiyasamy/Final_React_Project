import React from 'react';
import { teamMembers } from '../data/bikes';
import { useScrollTop, useInView } from '../hooks/useCustomHooks';

function TeamCard({ member }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      background: '#fff', border: '1px solid #eee', borderRadius: 2, padding: '24px',
      textAlign: 'center', transition: 'all 0.5s ease',
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
    }}>
      <img src={member.img} alt={member.name}
        style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px', objectFit: 'cover', border: '3px solid #eee' }} />
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>{member.name}</h4>
      <p style={{ fontSize: 13, color: '#d32f2f', fontWeight: 600, marginBottom: 4 }}>{member.role}</p>
      <p style={{ fontSize: 12, color: '#999' }}>{member.exp} experience</p>
    </div>
  );
}

export default function About() {
  useScrollTop();

  const milestones = [
    { year: '2010', text: 'MotoVerse founded in Chennai with 3 bikes in showroom' },
    { year: '2013', text: 'Expanded to 3 showrooms across Tamil Nadu' },
    { year: '2016', text: 'Launched in-house service centre with OEM certification' },
    { year: '2019', text: 'Crossed 200 bikes sold, partnered with 10 banks' },
    { year: '2022', text: 'Introduced digital booking and test ride system' },
    { year: '2025', text: 'Launched all-new 2025 collection with 6 models' },
  ];

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{ background: '#0a0a0a', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', backgroundImage: 'url(https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge badge-red" style={{ marginBottom: 12, display: 'inline-block' }}>Our Story</span>
          <h1 className="section-title" style={{ color: '#fff', maxWidth: 500 }}>Passionate About Two Wheels Since 2010</h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
        {/* Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, marginBottom: 80, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16, lineHeight: 1 }}>We Live and<br />Breathe Bikes</h2>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 16 }}>
              MotoVerse started in 2010 as a dream shared by four motorcycle enthusiasts. Today, we are Chennai's most trusted bike showroom — not just a store, but a community for riders.
            </p>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>
              Our mission is simple: match every rider with their perfect machine, at the best price, with the most honest advice. No upselling. No pressure. Just passion.
            </p>
          </div>
          <img src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" alt="Showroom" style={{ borderRadius: 2, width: '100%', height: 320, objectFit: 'cover' }} />
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 80 }}>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Our Journey</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ borderLeft: '3px solid #d32f2f', paddingLeft: 20 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#d32f2f', marginBottom: 4 }}>{m.year}</div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ background: '#f9f9f9', padding: '48px', borderRadius: 2, marginBottom: 80 }}>
          <h2 className="section-title" style={{ marginBottom: 32 }}>Why Choose Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
            {[
              ['🏆', 'Best Price', 'Price-match guarantee on every model.'],
              ['🔧', 'Expert Mechanics', 'Factory-trained technicians only.'],
              ['💰', 'Easy Finance', 'Loans from 10+ banks, instant approval.'],
              ['🏍️', 'Test Rides', 'Try before you buy, always.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 13, color: '#666' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <h2 className="section-title" style={{ marginBottom: 32 }}>Meet the Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {teamMembers.map(m => <TeamCard key={m.id} member={m} />)}
        </div>
      </div>
    </div>
  );
}
