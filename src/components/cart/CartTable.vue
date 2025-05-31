<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover shadow-sm">
      <thead class="table-dark">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
          <th scope="col">Discount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.name">
          <td class="fw-bold">{{ item.name }}</td>
          <td class="text-center">{{ item.quantity }}</td>
          <td class="text-success">€ {{ item.price.toFixed(2) }}</td>
          <td>
            <button @click="$emit('removeItem', item.name)" class="btn btn-outline-danger btn-sm">
              <i class="bi bi-trash"></i> Remove
            </button>
          </td>
          <td>
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
  },
};
</script>