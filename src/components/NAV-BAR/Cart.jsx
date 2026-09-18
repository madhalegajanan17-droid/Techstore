const Cart = ({ isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal }) => {
  return (
    <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={() => setIsCartOpen(false)} className="close-cart">✕</button>
      </div>
      
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-item" title="Remove">🗑️</button>
            </div>
          ))
        )}
      </div>
      
      <div className="cart-footer">
        <h3>Total: ₹{cartTotal}</h3>
        <button className="checkout-btn" disabled={cartItems.length === 0}>Proceed to Checkout</button>
      </div>
    </div>
  );
};
export default Cart;
