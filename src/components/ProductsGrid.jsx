import React, { useEffect } from "react";

const ProductsGrid = ({ products, cart, setCart }) => {
  const addToCart = (productId, variantId) => {
    if (!products || products.length === 0) {
      console.error("Products array is undefined or empty.");
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }

    const variant = product.variants?.find((v) => v.id === variantId);
    if (!variant) {
      console.error(`Variant with ID ${variantId} not found for product ${productId}.`);
      return;
    }

    const existingItem = cart.find((item) => item.variantId === variantId);

    if (existingItem) {
      // Update quantity if the item is already in the cart
      setCart(
        cart.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to the cart
      setCart([
        ...cart,
        {
          productId,
          variantId,
          title: product.title,
          thumbnail: product.thumbnail,
          price: variant.price,
          quantity: 1,
        },
      ]);
    }
  };

  // Log the updated cart whenever it changes
  useEffect(() => {
    console.log("Updated Cart:", cart);
  }, [cart]);

  return (
    <div className="container">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => {
            const firstVariant = product.variants?.[0];
            if (!firstVariant) return null;

            return (
              <div className="col-md-4" key={product.id}>
                <div className="card">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <a
                      href={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      View Product
                    </a>
                    <button
                      onClick={() => addToCart(product.id, firstVariant.id)}
                      className="btn btn-secondary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;