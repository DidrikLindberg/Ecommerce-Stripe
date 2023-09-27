import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { Link } from 'react-router-dom';

function RandomProductList() {
  const { loading, error, data } = useQuery(QUERY_PRODUCTS);

  if (loading) {
    return <img src={spinner} alt="Loading" />;
  }

  if (error) {
    console.error(error);
    return <div>Error loading products.</div>;
  }

  // Get three random products from the data
  const randomProducts = getRandomProducts(data.products, 3);

  return (
    <div className="row" >
      {randomProducts.map((product) => (
        <div className="col mb-3" key={product._id}>
          <div className="card" style={{ width: "18rem", height: "22rem" }}>
          <Link to={`/products/${product._id}`}>
            <img 
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{ height: "15rem" }}  
            />
          </Link>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
            
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Function to get random products from the array
function getRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default RandomProductList;
