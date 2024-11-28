<template>
  <div>
    <h1>Shopping Cart</h1>

    <form @submit.prevent="addProduct" class="row mb-3">
      <div class="input-group-text col-auto">
        <input v-model="newProduct.name" placeholder="Product" class="form-control col" required/>
      </div>
      <div class="input-group-text col-auto">
        <span class="input-group-text" id="basic-addon1">€</span>
        <input v-model.number="newProduct.price" placeholder="Price" class="form-control col" required/>
      </div>
      <div class="input-group-text col-auto">
        <input v-model.number="newProduct.quantity" type="number" placeholder="Quantity" class="form-control col"
               required/>
      </div>
      <div class="input-group-text col-auto">
        <button class="btn btn-primary col">Add</button>
      </div>
    </form>

    <h2>Cart Items</h2>
    <table class="table">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cartItems" :key="item">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td class="input-group-text col-auto">€ {{ item.price }}</td>
        <td>
          <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="input-group-text col-auto">
      <span class="input-group-text" id="basic-addon1">Total €</span>
      <h4>{{ cartTotalx.toFixed(2) }}</h4>
    </div>
    <div class="input-group-text col-auto">
      <span class="input-group-text" id="basic-addon1">TAX €</span>
      <h4>{{ cartTax.toFixed(2) }}</h4>
    </div>
    <div class="input-group-text col-auto">
      <span class="input-group-text" id="basic-addon1">Total TAX included €</span>
      <h4>{{ cartTotal.toFixed(2) }}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8089/api/cart",
    newProduct: {name: "", price: 0, quality: 1},
    cartTotalx: 0,
    cartItems: [],
    cartTotal: 0,
    cartTax: 0,
  }),

  methods: {
    fetchCart() {
      axios.all([
        axios.get(`${this.api}/get-cart-items`).then(res => (this.cartItems = res.data)),
        axios.get(`${this.api}/cart-total`).then(res => (this.cartTotalx = res.data)),
        axios.get(`${this.api}/cart-total-taxed`).then(res => (this.cartTotal = res.data)),
        axios.get(`${this.api}/cart-tax`).then(res => (this.cartTax = res.data)),
      ]);
    },
    removeProduct(name) {
      axios.delete(`${this.api}/remove-product/${name}`).then(this.fetchCart());
    },
    addProduct() {
      axios.post(`${this.api}/add-product`, this.newProduct).then(this.fetchCart);
      this.newProduct = {name: "", price: 0, quantity: 1};
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style>


</style>