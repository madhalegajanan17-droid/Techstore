import Toggle from "./Toggle";
import SingButtons from "./SingButtons";

const NavLists = ({ isDarkMode, setIsDarkMode, setIsCartOpen, cartCount }) => {
  return (
    <ul className="nav-links">
      <li><a href="#products">Products</a></li>
      <li><a href="#deals">Deals</a></li>
      <li><a href="#support">Support</a></li>
      <li><a href="#about">About</a></li>
      <li className="cart-nav" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <SingButtons />
        <Toggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div onClick={() => setIsCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span className="cart-count" style={{ backgroundColor: '#e74c3c', color: 'white', borderRadius: '50%', padding: '0.1rem 0.5rem', fontSize: '0.9rem' }}>{cartCount}</span>
        </div>
      </li>
    </ul>
  );
};
export default NavLists;

