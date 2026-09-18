import UserControls from "./UserControls";
import ProductCard from "./ProductCard";

const BestSellers = ({ 
  topRef, 
  searchTerm, setSearchTerm, 
  selectBrand, setSelectBrand, 
  sortBy, setSortBy, 
  allBrandd, 
  filteredProducts, 
  wishlist, 
  onAddToCard, 
  toggleWishlist 
}) => {
  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <h2 ref={topRef}>Best Sellers </h2>
        <p>Our most popular products</p>
      </div>

      <UserControls 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectBrand={selectBrand} 
        setSelectBrand={setSelectBrand} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        allBrandd={allBrandd} 
      />

      <div className="products-container">
        {filteredProducts.map((data) => (
          <ProductCard
            key={data.id}
            id={data.id}
            image={data.image}
            name={data.name}
            price={data.price}
            originalPrice={data.originalPrice}
            discount={data.discount}
            rating={data.rating}
            bestSeller={data.bestSeller}
            brand={data.brand}
            isWishlisted={wishlist.includes(data.id)}
            onAddToCard={() => onAddToCard(data)}
            onToggleWishlist={() => toggleWishlist(data.id)}
          />
        ))}
      </div>
    </section>
  );
};
export default BestSellers;
