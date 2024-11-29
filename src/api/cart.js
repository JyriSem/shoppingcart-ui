import axios from 'axios';

const apiBase = "http://localhost:8089/api/cart";

export const getCartItems = () => axios.get(`${apiBase}/get-cart-items`);
export const addProduct = (product) => axios.post(`${apiBase}/add-product`, product);
export const removeProduct = (name) => axios.delete(`${apiBase}/remove-product/${name}`);
export const getCartTotal = () => axios.get(`${apiBase}/cart-total`);
export const getCartTax = () => axios.get(`${apiBase}/cart-tax`);
export const getCartTotalTaxed = () => axios.get(`${apiBase}/cart-total-taxed`);