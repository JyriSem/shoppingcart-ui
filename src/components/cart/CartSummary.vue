<template>
  <div class="p-3 bg-light rounded w-100">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Total</span>
      <h4 class="text-success">€ {{ cartTotal.toFixed(2) }}</h4>
    </div>
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Tax</span>
      <h4 class="text-warning">€ {{ cartTax.toFixed(2) }}</h4>
    </div>
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Total (Tax Included)</span>
      <h4 class="text-danger">€ {{ cartTotalTaxed.toFixed(2) }}</h4>
    </div>
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Total with Item Discounts</span>
      <h4 class="text-info">€ {{ cartDiscounted.toFixed(2) }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartTotal: { type: Number, required: true },
    cartTax: { type: Number, required: true },
    cartTotalTaxed: { type: Number, required: true },
    cartDiscounted: { type: Number, required: true },
  },
};
</script>