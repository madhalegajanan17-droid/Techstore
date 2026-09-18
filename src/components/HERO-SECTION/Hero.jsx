const Hero = () => {
  return (
    <>
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
    </>
  );
};

export default Hero;
