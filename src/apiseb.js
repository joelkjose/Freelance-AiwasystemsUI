// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/sub_categories', 
  timeout: 5000, 
});

export const getSubcategories = async () => {
  try {
    const response = await api.get('/'); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSubcategory = async (formData) => {
  try {
    const response = await api.post('/', formData); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubcategory = async (subcategoryId, formData) => {
  try {
    const response = await api.put(`/${subcategoryId}`, formData); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubcategory = async (subcategoryId) => {
  try {
    const response = await api.delete(`/${subcategoryId}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
};
