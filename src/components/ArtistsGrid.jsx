import React from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

function ArtistsGrid({ products }) {
  return (
    <div>
      <div className="subHeading">
        <h3>Shop by Product</h3>
      </div>
      <section id="categoryGrid" className="dynamic">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="categoryGridArea"
              key={product.id}
              style={{
                backgroundImage: `url(${product.thumbnail})`,
              }}
            >
              <div className="heading">{product.title}</div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </section>
    </div>
  );
}

export default ArtistsGrid;
