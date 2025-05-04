import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/ameglio.css";
import fetchProducts from "../api/store"; // Importing the API to fetch products

function ProductPage({ cart, setCart }) {
  const { id } = useParams(); // product ID from URL
  const [products, setProducts] = useState([]); // Store fetched products
  const [product, setProduct] = useState(null); // Store the matched product
  const [isPoppedOut, setIsPoppedOut] = useState(false);
  const [error, setError] = useState(null); // Store any errors

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products || []); // Set fetched products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      }
    };
    getProducts();
  }, []);

  // Effect to find the product that matches the id from the URL after products are fetched
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item.id.toString() === id);
      if (foundProduct) {
        setProduct(foundProduct); // Set the matched product
      } else {
        console.error(`Product with ID ${id} not found`);
        setError("Product not found.");
      }
    }
  }, [id, products]);

  const addToCart = (productId, variantId) => {
    const productToAdd = products.find((p) => p.id === productId);
    const variant = productToAdd?.variants?.find((v) => v.id === variantId);

    if (!productToAdd || !variant) {
      console.error("Product or variant not found.");
      return;
    }

    const exists = cart.some((item) => item.variantId === variantId);
    if (exists) {
      alert("This item is already in your cart.");
      return;
    }

    setCart([
      ...cart,
      {
        productId,
        variantId,
        title: productToAdd.title,
        thumbnail: productToAdd.thumbnail,
        price: variant.price,
        quantity: 1,
      },
    ]);
  };

  const togglePopOut = () => setIsPoppedOut(!isPoppedOut);

  if (error) return <div>{error}</div>; // Display error if there is one
  if (!product) return <div>Loading...</div>; // Show loading state until product is found

  const firstVariant = product.variants?.[0]; // Use the first variant as default

  return (
    <div>
      <h2>Product: {product.title}</h2>
      <section className="heroArtist">
        <div className="artistInfo">
          <h2>{product.title}</h2>
          <p>{product.subtitle}</p>
          <p>{product.description}</p>
        </div>
      </section>

      <div className="container text-center">
        <div className="row g-2">
          <div className="col-6">
            <div
              className={`p-3 ${isPoppedOut ? "pop-out" : ""}`}
              onClick={togglePopOut}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            {firstVariant && (
              <button
                onClick={() => addToCart(product.id, firstVariant.id)}
                className="btn btn-secondary"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
