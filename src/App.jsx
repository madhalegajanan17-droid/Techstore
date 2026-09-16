import { useState, useEffect, useRef } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard.jsx";
import products from "./components/arrya.js";

function App() {

// ALLBRANDS
  const allBrandd=[...new Set(products.map((p)=> p.brand))];
  //STATES
  //CART-ARRAY OF PRODUCTS IN CART
  const[cartItems, setCartItems]=useState(()=>
  {
    const saveCart=localStorage.getItem("techstore-cart");

    if(saveCart)
    {
      try{
        return JSON.parse(saveCart);
      }catch(error)
      {
        console.error("problem!!!", error);
        return[]
      }
    }
    return[];
  });

  useEffect(()=> {
    localStorage.setItem("techstore-cart", JSON.stringify(cartCount));
  }, [cartItems])
  //WISHLIS{T-ARRAY OF PRODUCT IDS THAT ARE WISHLISTED
  const[wishlist, setWishlist]=useState([]);
  //SEARCH-WHAT USER TYPE IN USER BOX
  const[searchTerm, setSearchTerm]=useState("");
  //BRAND FILTER-
  const[selectBrand, setSelectBrand]=useState("All");
  //SORT- HOW TO SORT PRODUCTS
  const[sortBy, setSortBy]=useState("");
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
//FUNCTION FOR ADD TO CART
  function onAddToCard(product)
  {
    //CJECK IF CART ITEMS IS EXISTS 
    const existingItem = cartItems.find((item)=> item.id ===product.id);

    if(existingItem)
    {
      //PRODUCTS ARE INTHE CART
      setCartItems(cartItems.map((item)=>item.id === product.id ? {...item,quantity: item.quantity+1}:item));
    }
    else
    {
      //PRODUCTS NOT THER
      setCartItems([...cartItems,{...product, quantity:1}])
    }
    
    // Show Toast Message
    setToastMessage(`${product.name} added to cart!`);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }

//CALCULATE THE TOTAL NUMBER OF CARD ITEMS
  const cartCount = cartItems.reduce((total,item)=> total+item.quantity,0);

//CALCULATE TOTAL PRICE
  const cartTotal=cartItems.reduce((total, item)=> total+item.price*item.quantity,1);





//WISH LISTED FUNCTION
function toggleWishlist(productID)
{
  if(wishlist.includes(productID))
  {
    //ALREDY EXIST REMOVE IT 
    setWishlist(wishlist.filter(id=> id!==productID));
  }
  else{
    //NOT IN THE WISHLIST -JUST ADD IT 
    setWishlist([...wishlist,productID])
  }
}





//FILTER BASED ON THE SEARCH
let filteredProducts = products.filter((product)=>{
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesBrand = selectBrand === "All" || product.brand === selectBrand;

  return matchesSearch && matchesBrand;
});

// SORTING LOGIC
if (sortBy === "price-low") {
  filteredProducts.sort((a, b) => a.price - b.price);
} else if (sortBy === "price-high") {
  filteredProducts.sort((a, b) => b.price - a.price);
} else if (sortBy === "rating") {
  filteredProducts.sort((a, b) => b.rating - a.rating);
}

  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">

        <div className="logo">
          <a href="/">Tech Store</a>
        </div>

        <ul className="nav-links">
          <li><a href="#products">Products</a></li>
          <li><a href="#deals">Deals</a></li>
          <li><a href="#support">Support</a></li>
          <li><a href="#about">About</a></li>
          <li className="cart-nav" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <div onClick={() => setIsCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span className="cart-count" style={{ backgroundColor: '#e74c3c', color: 'white', borderRadius: '50%', padding: '0.1rem 0.5rem', fontSize: '0.9rem' }}>{cartCount}</span>
            </div>
          </li>
        </ul>

      </nav>

      {/* Cart Sidebar */}
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


      {/* Hero Section */}
      <section className="hero">

        <div>
          <h1>Premium Products</h1>

          <p>
            Discover our best products at amazing prices.
          </p>

          <a href="#products"><button>Shop Now</button></a>
        </div>

      </section>


      {/* Statistics */}
      <section className="stats">

        <div>
          <h2>50K+</h2>
          <p>Happy Customers</p>
        </div>

        <div>
          <h2>200+</h2>
          <p>Products</p>
        </div>

        <div>
          <h2>Premium</h2>
          <p>Quality Products</p>
        </div>

      </section>


      {/* Product Section */}
      <section className="products-section" id="products">

        <div className="section-heading">

          <h2>Best Sellers</h2>

          <p>
            Our most popular products
          </p>

        </div>


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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          ✓ {toastMessage}
        </div>
      )}

    </div>
  );
}

export default App;