<template>
  <div class="table-container">
    <table class="table table-striped table-hover shadow-sm">
      <thead class="table-dark sticky-top">
        <tr>
          <th class="col-product sortable" @click="sort('name')">
            Product
            <span class="sort-icon">{{ getSortIcon('name') }}</span>
          </th>
          <th class="col-qty text-center sortable" @click="sort('quantity')">
            Quantity
            <span class="sort-icon">{{ getSortIcon('quantity') }}</span>
          </th>
          <th class="col-price text-end sortable" @click="sort('price')">
            Price
            <span class="sort-icon">{{ getSortIcon('price') }}</span>
          </th>
          <th class="col-action text-center">Action</th>
          <th class="col-discount">Discount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.name">
          <td class="col-product fw-bold">{{ item.name }}</td>
          <td class="col-qty text-center">
            <div class="quantity-control d-flex align-items-center justify-content-center">
              <button class="btn btn-outline-secondary btn-sm" @click="updateQuantity(item.name, item.quantity - 1)"
                :disabled="item.quantity <= 1">
                <i class="bi bi-dash"></i>
              </button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="btn btn-outline-secondary btn-sm" @click="updateQuantity(item.name, item.quantity + 1)">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </td>
          <td class="col-price text-end text-success price-cell">
            <span class="price-fixed">
              <span class="currency">€</span>
              <span class="amount">{{ formatPrice(item.price) }}</span>
            </span>
          </td>
          <td class="col-action text-center">
            <button @click="$emit('removeItem', item.name)" class="btn btn-outline-danger btn-sm">
              <i class="bi bi-trash"></i> Remove
            </button>
          </td>
          <td class="col-discount">
            <div class="btn-group" role="group">
              <input type="radio" class="btn-check" :id="`radio-${item.name}-none`" :name="`discount-${item.name}`"
                :value="0" v-model="item.selectedDiscount" @change="$emit('updateDiscounts')" />
              <label class="btn btn-outline-secondary btn-sm" :for="`radio-${item.name}-none`">
                None
              </label>
              <template v-for="discount in discounts" :key="discount.id">
                <input type="radio" class="btn-check" :id="`radio-${item.name}-${discount.percentage}`"
                  :name="`discount-${item.name}`" :value="discount.percentage" v-model="item.selectedDiscount"
                  @change="$emit('updateDiscounts')" />
                <label class="btn btn-outline-primary btn-sm" :for="`radio-${item.name}-${discount.percentage}`">
                  {{ discount.percentage }}%
                </label>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: { type: Array, required: true },
    discounts: { type: Array, required: true },
    sortBy: { type: String, default: 'id' },
    sortDirection: { type: String, default: 'asc' }
  },
  methods: {
    sort(field) {
      this.$emit('sort', field);
    },
    getSortIcon(field) {
      if (this.sortBy === field) {
        return this.sortDirection === 'asc' ? '↑' : '↓';
      }
      return '';
    },
    updateQuantity(name, quantity) {
      if (quantity >= 1) {
        this.$emit('updateQuantity', name, quantity);
      }
    },
      formatPrice(value) {
        return Number(value).toFixed(2);
      }
    
  }
};
</script>

<style scoped>
/* Component-specific styles removed; handled in global.css */
</style>
