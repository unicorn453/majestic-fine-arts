import React from "react";
import { useNavigate } from "react-router-dom";

function ShoppingCart({ cart, setCart }) {
  const navigate = useNavigate();

  const removeFromCart = (variantId) => {
    setCart(cart.filter((item) => item.variantId !== variantId));
  };

  if (!cart || cart.length === 0) {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <p>Your cart is currently empty.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.variantId}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: "50px", marginRight: "10px" }}
            />
            {item.title} - {item.quantity} x ${item.price / 100}
            <button
              onClick={() => removeFromCart(item.variantId)}
              className="btn btn-danger btn-sm"
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/checkout")} className="btn btn-success">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default ShoppingCart;
