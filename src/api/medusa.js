import axios from "axios";

// Configure the base URL for the Admin API
const api = axios.create({
  baseURL: "http://localhost:9000/admin", // Medusa Admin API
});

// Admin API instance
const adminApi = axios.create({
  baseURL: "http://localhost:9000/admin",
});

// Store API instance
const storeApi = axios.create({
  baseURL: "http://localhost:9000/store",
});

export { adminApi, storeApi };