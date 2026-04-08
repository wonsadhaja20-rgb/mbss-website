'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category && category !== 'All') params.set('category', category);
    
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <input 
        type="text" 
        placeholder="Search articles..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, minWidth: '200px', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }}
      >
        <option value="All">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-secondary">Filter</button>
    </form>
  );
}
