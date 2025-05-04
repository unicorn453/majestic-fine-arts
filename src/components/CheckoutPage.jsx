import React, { useState, useEffect } from 'react';


function CheckoutPage({ cart, setCart }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ checkoutDetails, setCheckoutDetails ] = useState({
    email: '',
    shippingAddress: '',
    paymentMethod: '',
  });

  const fetchCart = async (cartId) => {
    const res = await fetch(`http://localhost:9000/store/carts/${cartId}`);
    if (!res.ok) throw new Error("Failed to fetch cart");
    return await res.json();
  };



  const updateCart = async (cartId, { email, shippingAddress }) => {
    const res = await fetch(`http://localhost:9000/store/carts/${cartId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        shipping_address: {
          address_1: shippingAddress,
          country_code: "eu"
        }
      }),
    });
    if (!res.ok) throw new Error("Failed to update cart");
    return await res.json();
  };


  const createPaymentSessions = async (cartId) => {
    const res = await fetch(`http://localhost:9000/store/carts/${cartId}/payment-sessions`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to create payment sessions");
    return await res.json();
  };

  const setPaymentSession = async (cartId, providerId) => {
    const res = await fetch(`http://localhost:9000/store/carts/${cartId}/payment-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider_id: providerId }),
    });
    if (!res.ok) throw new Error("Failed to set payment session");
    return await res.json();
  };

  const completeCart = async (cartId) => {
    const res = await fetch(`http://localhost:9000/store/carts/${cartId}/complete`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to complete cart");
    return await res.json();
  };

  const handleCheckout = async () => {
    try {
      if (!cart || !checkoutDetails.email || !checkoutDetails.shippingAddress || !checkoutDetails.paymentMethod) {
        alert("Missing info");
        return;
      }

      setIsLoading(true);

      await updateCart(cart.id, {
        email: checkoutDetails.email,
        shippingAddress: checkoutDetails.shippingAddress,
      });

      await createPaymentSessions(cart.id);

      await setPaymentSession(cart.id, checkoutDetails.paymentMethod);

      const result = await completeCart(cart.id);

      alert("Checkout successful!");

      setCart(null); // Optionally clear the cart after checkout
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={item.variantId || index}>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <img src={item.thumbnail} alt={item.title} style={{ width: '100px' }} />
                <p>Product ID: {item.productId}</p>
                <p>Variant ID: {item.variantId}</p>
                <p>
                  Price:{' '}
                  {item.price !== undefined
                    ? `$${(item.price / 100).toFixed(2)}`
                    : 'Price not available'}
                </p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </>
      )}
  
      <input
        type="email"
        placeholder="Email"
        onChange={e =>
          setCheckoutDetails({ ...checkoutDetails, email: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Shipping Address"
        onChange={e =>
          setCheckoutDetails({
            ...checkoutDetails,
            shippingAddress: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="Payment Method"
        onChange={e =>
          setCheckoutDetails({
            ...checkoutDetails,
            paymentMethod: e.target.value,
          })
        }
      />
      <button onClick={handleCheckout}>Complete Checkout</button>
    </div>
  );
}
export default CheckoutPage;
