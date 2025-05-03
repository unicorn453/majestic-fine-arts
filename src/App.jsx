import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ArtistPage from "./components/ArtistPage";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCartModal = () => {
    setIsCartModalOpen((prevState) => !prevState); // Toggle the modal
  };

  return (
    <>
      <Router>
        <Header toggleCartModal={toggleCartModal} /> {/* Pass toggleCartModal here */}
        <Routes>
          <Route exact path="/" element={<Home cart={cart} setCart={setCart} toggleCartModal={toggleCartModal} />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Routes>

        {/* Shopping Cart Modal */}
        {isCartModalOpen && (
          <div className="modal">
            <ShoppingCart cart={cart} setCart={setCart} />
            <button onClick={toggleCartModal}>Close Cart</button>
          </div>
        )}

        <Footer />
      </Router>
    </>
  );
}

export default App;
