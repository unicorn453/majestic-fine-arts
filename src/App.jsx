import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ArtistPage from "./components/ArtistPage";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [cart, setCart] = useState([]); // Cart state

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home cart={cart} setCart={setCart} />}
          />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/shoppingCart"
            element={<ShoppingCart cart={cart} setCart={setCart} />}
          />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
