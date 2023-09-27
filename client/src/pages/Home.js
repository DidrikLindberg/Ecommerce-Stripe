import React from 'react';
import { Link } from 'react-router-dom';
import RandomProductList from '../components/RandomProductList'; // Import the new component
import homeimage from '../assets/Smart-home.jpg';
import Cart from '../components/Cart';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const Home = () => {
  return (
    <div className="container">
       <Cart />
      
        <div className="gradient-card">
          <div className="text-card">
            <h2 className='elegant-font'>Welcome to GreenTech Solutions</h2>
            <p>Discover a wide range of sustainable smart home products.</p>
            <Link to="/shop" className="shop-link">
              Shop All Products
            </Link>
          </div>
          {/* insert homeimage */}
          <img src={homeimage} alt="Smart Home" />
        </div>
       
      <div className="home-content">
        <h2>Curated Products</h2>
        <RandomProductList /> {/* Add the RandomProductList component here */}
      </div>
    </div>
  );
};

export default Home;
