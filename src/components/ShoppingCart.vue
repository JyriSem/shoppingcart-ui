<template>
  <div>
    <h1>hahahah</h1>
    <p>Total</p>
    <p>${{cartTotal.toFixed(2)}}</p>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    apibase: "http://localhost:8089/api/cart",
    cartTotal: 0
  }),
  mounted() {
    axios
        .get(`${this.apibase}/cart-total`)
        .then((res) => (this.cartTotal = res.data))
        .catch(console.error)
  }
};
</script>

<style>

</style>