import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';

function testtt() {
  const navigate = useNavigate();

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <p>Your cart is currently empty.</p>
      <button onClick={() => navigate('/')} className="btn btn-primary">
        Continue Shopping
      </button>
    </div>
  );
}

export default testtt;
