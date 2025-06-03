<template>
  <div class="cart-summary p-3 bg-light rounded w-100">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Total</span>
      <h4 class="text-success amount">
        <span class="price-fixed">
          <span class="currency">€</span>
          <span class="amount">{{ cartTotal.toFixed(2) }}</span>
        </span>
      </h4>
    </div>
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Tax ({{ taxRate }}%)</span>
      <h4 class="text-warning amount">
        <span class="price-fixed">
          <span class="currency">€</span>
          <span class="amount">{{ cartTax.toFixed(2) }}</span>
        </span>
      </h4>
    </div>
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Total (Tax Included)</span>
      <h4 class="text-danger amount">
        <span class="price-fixed">
          <span class="currency">€</span>
          <span class="amount">{{ cartTotalTaxed.toFixed(2) }}</span>
        </span>
      </h4>
    </div>
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
      <span class="fw-bold">Total with Item Discounts</span>
      <h4 class="text-info amount">
        <span class="price-fixed">
          <span class="currency">€</span>
          <span class="amount">{{ cartDiscounted.toFixed(2) }}</span>
        </span>
      </h4>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    cartTotal: { type: Number, required: true },
    cartTax: { type: Number, required: true },
    cartTotalTaxed: { type: Number, required: true },
    cartDiscounted: { type: Number, required: true },
  },
  data() {
    return {
      taxRate: 22.0,
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8089/api/cart/tax-rate', {
        withCredentials: true,
      });
      this.taxRate = response.data;
    } catch (error) {
      console.error('Failed to fetch tax rate:', error);
    }
  },
  methods: {
    formatPrice(value) {
      return Number(value).toFixed(2);
    }
  }
};
</script>

<style scoped>
/* Component-specific styles removed; handled in global.css */
</style>
