import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8089',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  const response = await axiosInstance.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await axiosInstance.post('/auth/register', { username, password });
  return response.data;
};