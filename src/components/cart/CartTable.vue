<template>
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
    <tr v-for="item in cartItems" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ item.quantity }}</td>
      <td>€ {{ item.price }}</td>
      <td>
        <button @click="$emit('removeItem', item.name)" class="btn btn-danger btn-sm">Remove</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    cartItems: Array,
  },
};
</script>