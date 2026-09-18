import { useState, useEffect, useRef } from "react";
import "./App.css";
import products from "./components/arrya.js";

import NavLogo from "./components/NAV-BAR/NavLogo.jsx";
import NavLists from "./components/NAV-BAR/NavLists.jsx";
import User from "./components/NAV-BAR/User.jsx";
import Cart from "./components/NAV-BAR/Cart.jsx";
import Hero from "./components/HERO-SECTION/Hero.jsx";
import BestSellers from "./components/SECTIONS/BestSellers.jsx";
import Footer from "./components/SECTIONS/Footer.jsx";

function App() {

// ALLBRANDS
  const allBrandd=[...new Set(products.map((p)=> p.brand))];


  const topRef=useRef(null);
  function scrollonTop()
  {
    topRef.current.scrollIntoView();
  }
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
    localStorage.setItem("techstore-cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
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
    <div className="app" >

      {/* Navigation Bar */}
      <nav className="navbar">
        <NavLogo />
       
        <NavLists 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          setIsCartOpen={setIsCartOpen} 
          cartCount={cartCount} 
        />
         <User />
      </nav>

      {/* Cart Sidebar */}
      <Cart 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
        cartItems={cartItems} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        cartTotal={cartTotal} 
      />


      {/* Hero Section */}
      <Hero />


      {/* Product Section */}
      <BestSellers 
        topRef={topRef}
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectBrand={selectBrand} 
        setSelectBrand={setSelectBrand}
        sortBy={sortBy} 
        setSortBy={setSortBy}
        allBrandd={allBrandd}
        filteredProducts={filteredProducts}
        wishlist={wishlist}
        onAddToCard={onAddToCard}
        toggleWishlist={toggleWishlist}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          ✓ {toastMessage}
        </div>
      )}

      <Footer scrollonTop={scrollonTop} />
    </div>
    
  );
}

export default App;