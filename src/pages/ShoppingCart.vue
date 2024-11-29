<template>
  <div>
    <h1>Shopping Cart</h1>
    <AddProductForm @addProduct="handleAddProduct" />
    <h2>Cart Items</h2>
    <CartTable :cartItems="cartItems" @removeItem="handleRemoveProduct" />
    <CartSummary :cartTotal="cartTotal" :cartTax="cartTax" :cartTotalTaxed="cartTotalTaxed" />
  </div>
</template>

<script>
import { getCartItems, addProduct, removeProduct, getCartTotal, getCartTax, getCartTotalTaxed } from "@/api/cart";
import AddProductForm from "@/components/cart/AddProductForm.vue";
import CartTable from "@/components/cart/CartTable.vue";
import CartSummary from "@/components/cart/CartSummary.vue";

export default {
  components: { AddProductForm, CartTable, CartSummary },
  data: () => ({
    cartItems: [],
    cartTotal: 0,
    cartTax: 0,
    cartTotalTaxed: 0,
  }),
  methods: {
    fetchCart() {
      Promise.all([
        getCartItems().then(res => (this.cartItems = res.data)),
        getCartTotal().then(res => (this.cartTotal = res.data)),
        getCartTax().then(res => (this.cartTax = res.data)),
        getCartTotalTaxed().then(res => (this.cartTotalTaxed = res.data)),
      ]).catch(err => console.error("Error fetching cart data:", err));
    },
    handleAddProduct(product) {
      addProduct(product).then(this.fetchCart);
    },
    handleRemoveProduct(name) {
      removeProduct(name).then(this.fetchCart);
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>
