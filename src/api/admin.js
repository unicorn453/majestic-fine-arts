import { adminApi } from "./medusa";

const ADMIN_TOKEN = import.meta.env.VITE_PUBLISHABLE_API_KEY;

if (!ADMIN_TOKEN) {
  console.error("Admin token is missing. Please check your .env file.");
}

export const createProduct = async () => {
  const productData = {
    title: "Sample Product",
    description: "This is a description for a sample product.",
    sku: "sample-product-123",
    prices: [{ amount: 2000, currency_code: "euro" }],
    inventory_quantity: 100,
  };

  try {
    const response = await adminApi.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    });
    console.log("Product created successfully:", response.data);
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
  }
};