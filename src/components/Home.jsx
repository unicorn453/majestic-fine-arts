import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Hero from "./Hero";
import ArtistsGrid from "./ArtistsGrid";
import fetchProducts from "../api/store";



function Home({ cart, setCart }) {

  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products); // Store fetched products in state
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later."); // Handle errors
      }
    };

    getProducts();
  }, []);

  if (error) {
    return <p>{error}</p>; // Display error message if there is an issue
  }

  return (
    <div className="overview-wrapper">
      <div className="overview-content">
        <div className="components-wrapper">
          <Hero />
          <ArtistsGrid products={products} />
          <div className="graphs-wrapper">{/* <Transactions /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
