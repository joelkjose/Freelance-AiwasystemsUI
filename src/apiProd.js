// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllProducts = () => {
  return api.get('/products');
};

export const createProduct = (productData) => {
  return api.post('/products', productData);
};

export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};

export const updateProduct = (productId, productData) => {
  return api.put(`/products/${productId}`, productData);
};

export const deleteProduct = (productId) => {
  return api.delete(`/products/${productId}`);
};
