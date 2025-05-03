import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/modal.css"; // Import your modal CSS here

function ShoppingCart({ cart, setCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const removeFromCart = (variantId) => {
    const updatedCart = cart.filter((item) => item.variantId !== variantId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (!cart || cart.length === 0) {
    return (
      <div>
        <button onClick={openModal} className="btn btn-primary">
          Open Shopping Cart
        </button>
        {/* Modal */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Shopping Cart</h2>
              <p>Your cart is currently empty.</p>
              <button onClick={closeModal} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary">
        Open Shopping Cart
      </button>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
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
            <button
              onClick={() => {
                navigate("/checkout");
                closeModal();
              }}
              className="btn btn-success"
            >
              Proceed to Checkout
            </button>
            <button onClick={closeModal} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
