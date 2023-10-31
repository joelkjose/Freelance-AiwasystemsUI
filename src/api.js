import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const fetchCategories = () => {
  return axios.get(`${API_URL}/main_categories`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching categories:', error);
      throw error;
    });
};

export const createCategory = (name) => {
  return axios.post(`${API_URL}/main_categories`, { name })
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating category:', error);
      throw error;
    });
};

export const deleteCategory = (categoryId) => {
  const url = `${API_URL}/main_categories/${categoryId}`;
  return axios.delete(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting category:', error);
      throw error;
    });
};

export const updateCategory = (categoryId, name) => {
  const url = `${API_URL}/main_categories/${categoryId}`;
  debugger
  return axios.put(url, { name })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating category:', error);
      throw error;
    });
};
