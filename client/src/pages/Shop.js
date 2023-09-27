import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Shop = () => {
  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-3 "> {/* Category menu column */}
          <CategoryMenu />
        </div>
        <div className="col-md-9"> {/* Product list column */}
          <ProductList />
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default Shop;
