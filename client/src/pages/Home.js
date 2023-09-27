import React from 'react';
import { Link } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu';
import RandomProductList from '../components/RandomProductList'; // Import the new component

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <div className="home-content">
        <h2>Shop by Category</h2>
        <RandomProductList /> {/* Add the RandomProductList component here */}
        <div className="text-card">
          <h2>Welcome to Our Store</h2>
          <p>Discover a wide range of sustainable smart home products.</p>
          <Link to="/shop" className="shop-link">
            Shop All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
