import React, { useState } from 'react';
import { cart as medusa } from '../api/medusa';

function CheckoutPage({ cart, setCart }) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: '',
    shippingAddress: '',
    paymentMethod: '',
  });

  const handleCheckout = async () => {
    if (!cart || !checkoutDetails.email || !checkoutDetails.shippingAddress || !checkoutDetails.paymentMethod) {
      alert('Please fill in all details!');
      return;
    }

    try {
      setIsLoading(true);

      const response = await medusa.checkout.create({
        cart_id: cart.id,
        email: checkoutDetails.email,
        shipping_address: checkoutDetails.shippingAddress,
        payment_method: checkoutDetails.paymentMethod,
      });

      alert('Checkout successful!');
      setCart(null); // Clear cart after checkout
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isLoading ? <p>Loading...</p> : (
        <>
          <ul>
            {cart?.items?.map((item) => (
              <li key={item.id}>
                {item.title} - {item.quantity} x ${item.unit_price / 100}
              </li>
            ))}
          </ul>

          <input type="email" placeholder="Email" onChange={e => setCheckoutDetails({ ...checkoutDetails, email: e.target.value })} />
          <input type="text" placeholder="Shipping Address" onChange={e => setCheckoutDetails({ ...checkoutDetails, shippingAddress: e.target.value })} />
          <input type="text" placeholder="Payment Method" onChange={e => setCheckoutDetails({ ...checkoutDetails, paymentMethod: e.target.value })} />
          <button onClick={handleCheckout}>Complete Checkout</button>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
