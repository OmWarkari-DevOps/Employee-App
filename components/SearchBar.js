// TIER 1 — PRESENTATION LAYER (components/SearchBar.js)
// Search input component with debouncing

const { useState, useEffect, useRef } = React;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
      <input
        type="text"
        placeholder="🔍 Search by name, department, or position..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%' }}
      />
      {query && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};