import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card" style={{ width: "18rem", height: "27rem" }}>
      <Link to={`/products/${_id}`}>
        <img style={{ height: "15rem" }} alt={name} src={`${image}`} className="card-img-top" />
      </Link>
      <div className="card-body d-flex flex-column justify-content-between"> {/* Use flex utilities */}
        <div>
          <h5 className="card-title">{name}</h5>
          <span>${price}</span>
        </div>
        <button onClick={addToCart} className="btn btn-primary mt-2">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
