import React, { useState } from 'react';
import Medusa from '@medusajs/medusa-js'; // Corrected import

const medusa = new Medusa({ baseUrl: 'http://localhost:9000' });

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

      // 1. Update cart with email and shipping address
      await medusa.carts.update(cart.id, {
        email: checkoutDetails.email,
        shipping_address: {
          address_1: checkoutDetails.shippingAddress, // Simplified
          country_code: 'us', // Required by Medusa
        },
      });

      // 2. Create payment sessions
      await medusa.carts.createPaymentSessions(cart.id);

      // 3. Set payment method (e.g. stripe)
      await medusa.carts.setPaymentSession(cart.id, {
        provider_id: checkoutDetails.paymentMethod,
      });

      // 4. Complete the cart (turns it into an order)
      const { order } = await medusa.carts.complete(cart.id);

      alert('Checkout successful!');
      setCart(null);
      console.log('Order:', order);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isLoading ? <p>Loading...</p> : (
        <>
          {/* Render cart items if available */}
          {cart && cart.items && cart.items.length > 0 ? (
            <ul>
              {cart.items.map((item) => (
                <li key={item.id}>
                  {item.title} - {item.quantity} x ${(item.unit_price / 100).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in your cart.</p>
          )}

          <input 
            type="email" 
            placeholder="Email" 
            onChange={e => setCheckoutDetails({ ...checkoutDetails, email: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Shipping Address" 
            onChange={e => setCheckoutDetails({ ...checkoutDetails, shippingAddress: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Payment Method" 
            onChange={e => setCheckoutDetails({ ...checkoutDetails, paymentMethod: e.target.value })} 
          />
          <button onClick={handleCheckout}>Complete Checkout</button>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
