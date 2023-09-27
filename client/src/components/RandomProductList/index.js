import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries'; // Import your GraphQL query
import spinner from '../../assets/spinner.gif';

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
    <div className="row">
      {randomProducts.map((product) => (
        <div className="col-md-4 mb-4" key={product._id}>
          <div className="card h-400">
            <img
              src={product.image} // Assuming your GraphQL query includes the 'image' field
              alt={product.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
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
