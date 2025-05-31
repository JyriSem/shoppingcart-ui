<template>
  <form @submit.prevent="submit" class="row g-3 align-items-center">
    <div class="col-md-4">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-tag"></i> Item</span>
        <input v-model="newProduct.name" placeholder="Product Name" class="form-control" required />
      </div>
    </div>
    <div class="col-md-3">
      <div class="input-group">
        <span class="input-group-text">€</span>
        <input v-model.number="newProduct.price" placeholder="Price" class="form-control" type="number" step="0.01"
          required />
      </div>
    </div>
    <div class="col-md-3">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-box-seam"></i> Quantity</span>
        <input v-model.number="newProduct.quantity" type="number" placeholder="Quantity" class="form-control" min="1"
          required />
      </div>
    </div>
    <div class="col-md-2">
      <button class="btn btn-success w-100"><i class="bi bi-plus-circle"></i> Add</button>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    newProduct: { name: '', price: 0, quantity: 1 },
  }),
  methods: {
    submit() {
      // Sanitize name
      const sanitizedName = this.newProduct.name.replace(/[<>]/g, '');
      if (this.newProduct.price <= 0 || this.newProduct.quantity < 1 || !sanitizedName) {
        this.$emit('error', 'Invalid input: Ensure name is valid and price/quantity are positive');
        return;
      }
      this.$emit('addProduct', { ...this.newProduct, name: sanitizedName });
      this.newProduct = { name: '', price: 0, quantity: 1 };
    },
  },
};
</script>