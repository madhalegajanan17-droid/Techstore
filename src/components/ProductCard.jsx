import "./ProductCard.css";

export default function ProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  bestSeller,
  isWishlisted,
  onAddToCard,
  onToggleWishlist,
  brand
}) {
  return (
    <div className="product-card">

      {/* Discount Badge */}
      {discount && (
        <span className="discount-badge">
          {discount}% OFF
        </span>
      )}
      
      {/* Wishlist Button */}
      <button 
        className={`wishlisted ${isWishlisted ? "active" : ""}`}
        onClick={onToggleWishlist}
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* Product Image */}
      <div className="product-image">
        <img
          src={image}
          alt={name}
        />
      </div>

      {/* Product Content */}
      <div className="product-content">
        <h3>{name}</h3>

        {/* Rating */}
        <div className="rating">
          {"⭐".repeat(Math.floor(rating))}
          {"☆".repeat(5-Math.floor(rating))} {rating}
        </div>

        {/* Best Seller */}
        {bestSeller && (
          <span className="best-seller">
            Best Seller
          </span>
        )}

        {/* Price */}
        <div className="price-section">
          <span className="price">
            ₹{price}
          </span>
          {originalPrice && (
            <span className="original-price">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button className="cart-button" onClick={onAddToCard}>
          Add to Cart
        </button>

      </div>
    </div>
  );
}
