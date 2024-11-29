<template>
  <form @submit.prevent="submit" class="row mb-3">
    <div class="input-group-text col-auto">
      <input v-model="newProduct.name" placeholder="Product" class="form-control col" required/>
    </div>
    <div class="input-group-text col-auto">
      <span class="input-group-text">€</span>
      <input v-model.number="newProduct.price" placeholder="Price" class="form-control col" required/>
    </div>
    <div class="input-group-text col-auto">
      <input v-model.number="newProduct.quantity" type="number" placeholder="Quantity" class="form-control col" required/>
    </div>
    <div class="input-group-text col-auto">
      <button class="btn btn-primary col">Add</button>
    </div>
  </form>
</template>
<script>
export default {
  data: () => ({
    newProduct: { name: "", price: 0, quantity: 1 },
  }),
  methods: {
    submit() {
      this.$emit('addProduct', { ...this.newProduct });
      this.newProduct = { name: "", price: 0, quantity: 1 };
    },
  },
};
</script>