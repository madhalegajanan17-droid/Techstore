const UserControls = ({ searchTerm, setSearchTerm, selectBrand, setSelectBrand, sortBy, setSortBy, allBrandd }) => {
  return (
    <div className="filters" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select value={selectBrand} onChange={(e) => setSelectBrand(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
        <option value="All">All Brands</option>
        {allBrandd.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
        <option value="">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
};
export default UserControls;
