<template>
  <div>
    <div class="input-group-text col-auto">
      <span>Total €</span>
      <h4>{{ cartTotal.toFixed(2) }}</h4>
    </div>
    <div class="input-group-text col-auto">
      <span>Tax €</span>
      <h4>{{ cartTax.toFixed(2) }}</h4>
    </div>
    <div class="input-group-text col-auto">
      <span>Total (Tax Included) €</span>
      <h4>{{ cartTotalTaxed.toFixed(2) }}</h4>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cartTotal: Number,
    cartTax: Number,
    cartTotalTaxed: Number,
  },
};
</script>