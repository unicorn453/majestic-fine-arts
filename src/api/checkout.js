import { cart } from "./medusa";
import React, { useState, useEffect } from 'react';


const testPage = () => {
    const [cartData, setCartData] = useState(null);
    const [error, setError] = useState(null);
    const [checkoutDetails, setCheckoutDetails] = useState({
        email: "",
        shippingAddress: "",
        paymentMethod: "",
      });
      
    useEffect(() => {
        const fetchCart = async () => {
        try {
            const response = await cart.get();
            setCartData(response.data);
        } catch (error) {
            setError(error);
        }
        };
    
        fetchCart();
    }, []);
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    if (!cartData) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
        <h1>Checkout</h1>
        <p>Total: {cartData.total}</p>
        {/* Add more cart details here */}
        </div>
    );
    }