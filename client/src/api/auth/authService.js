// src/api/auth/authService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const login = (email, password) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};
