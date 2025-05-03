import React from "react";

const ProductsGrid = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card">
                <img src={product.thumbnail} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <a href={`/product/${product.id}`} className="btn btn-primary">
                    View Product
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;
