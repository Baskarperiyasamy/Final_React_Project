import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bikes, categories } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import { useScrollTop } from '../hooks/useCustomHooks';

export default function Bikes() {
  useScrollTop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const activeCategory = searchParams.get('category') || 'All';

  const setCategory = (cat) => {
    if (cat === 'All') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = [...bikes];
    if (activeCategory !== 'All') result = result.filter(b => b.category === activeCategory);
    if (search.trim()) result = result.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'power') result.sort((a, b) => parseInt(b.power) - parseInt(a.power));
    else if (sortBy === 'cc') result.sort((a, b) => b.cc - a.cc);
    return result;
  }, [activeCategory, search, sortBy]);

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '60px 0 50px' }}>
        <div className="container">
          <span className="badge badge-red" style={{ marginBottom: 12, display: 'inline-block' }}>Our Fleet</span>
          <h1 className="section-title" style={{ color: '#fff', marginBottom: 8 }}>All Bikes</h1>
          <p style={{ color: '#666', fontSize: 14 }}>Showing {filtered.length} of {bikes.length} bikes</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        {/* Filters row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text" placeholder="Search bikes..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 220, padding: '9px 14px' }}
          />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', padding: '9px 14px' }}>
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="power">Most Powerful</option>
            <option value="cc">Engine CC</option>
          </select>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={activeCategory === cat ? 'btn btn-black' : 'btn btn-outline'}
                style={{ padding: '8px 16px', fontSize: 12 }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map(bike => <BikeCard key={bike.id} bike={bike} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏍️</div>
            <p style={{ fontSize: 16, marginBottom: 8 }}>No bikes found.</p>
            <p style={{ fontSize: 13 }}>Try a different category or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
