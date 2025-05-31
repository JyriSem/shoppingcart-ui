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

export const getCartItems = () => axiosInstance.get('/api/cart/get-cart-items');
export const addProduct = (product) => axiosInstance.post('/api/cart/add-product', product);
export const removeProduct = (name) => axiosInstance.delete(`/api/cart/remove-product/${name}`);
export const getCartTotal = () => axiosInstance.get('/api/cart/cart-total');
export const getCartTax = () => axiosInstance.get('/api/cart/cart-tax');
export const getCartTotalTaxed = () => axiosInstance.get('/api/cart/cart-total-taxed');
export const getCartTotalDiscountedItems = (discountSelections) =>
  axiosInstance.post('/api/cart/cart-total-discounted-items', discountSelections);
export const getAvailableDiscounts = () => axiosInstance.get('/api/discounts');
export const getDiscountCount = () => axiosInstance.get('/api/cart/discount-count');
export const assignDiscount = (productName, discountId) =>
  axiosInstance.put('/api/cart/assign-discount', null, {
    params: { productName, discountId },
  });