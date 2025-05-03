import axios from "axios";

const PUBLISHABLE_API_KEY = import.meta.env.VITE_PUBLISHABLE_API_KEY;
const productsUrl = import.meta.env.VITE_PRODUCT_URL;

if (!PUBLISHABLE_API_KEY) {
  console.error("Publishable API key is missing. Please check your .env file.");
}

export const fetchProducts = async () => {
  try {
    const response = await axios.get(productsUrl, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProducts;
