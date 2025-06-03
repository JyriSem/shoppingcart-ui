<template>
  <div class="container d-flex flex-column justify-content-center align-items-center">
    <div class="card p-4 w-100">
      <h1 class="text-primary text-center mb-4">Shopping Cart 🛒</h1>
      <div class="sticky-form">
        <AddProductForm class="mb-4 w-100" @addProduct="handleAddProduct" @error="error = $event" />
      </div>
      <h2 class="text-secondary text-center mb-3">Cart Items</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="cartItems.length > 10" class="d-flex justify-content-end mb-2">
        <button @click="toggleShowAll" class="btn btn-outline-primary btn-sm">
          {{ showAll ? 'Show Less' : 'Show All' }} ({{ cartItems.length }} items)
        </button>
      </div>
      <div class="cart-items-container" :style="{ maxHeight: cartItemsContainerHeight }">
        <CartTable :cartItems="cartItems" :discounts="availableDiscounts" :sortBy="sortBy" :sortDirection="sortDirection"
          @removeItem="handleRemoveProduct" @updateDiscounts="handleUpdateDiscounts" @sort="handleSort" @updateQuantity="handleUpdateQuantity" />
      </div>
      <div class="mt-3 d-flex justify-content-between align-items-center border-top pt-3">
        <span class="fw-bold">Number of Discounted Items:</span>
        <span class="text-info fw-bold">{{ discountCount }}</span>
      </div>
      <CartSummary class="mt-4" :cartTotal="cartTotal" :cartTax="cartTax" :cartTotalTaxed="cartTotalTaxed"
        :cartDiscounted="cartDiscounted" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import {
  getCartItems,
  addProduct,
  removeProduct,
  updateProductQuantity,
  getCartTotal,
  getCartTax,
  getCartTotalTaxed,
  getCartTotalDiscountedItems,
  getAvailableDiscounts,
  getDiscountCount,
  assignDiscount,
} from '@/services/cart';
import AddProductForm from '@/components/cart/AddProductForm.vue';
import CartTable from '@/components/cart/CartTable.vue';
import CartSummary from '@/components/cart/CartSummary.vue';

export default {
  components: { AddProductForm, CartTable, CartSummary },
  setup() {
    const cartItems = ref([]);
    const cartTotal = ref(0);
    const cartTax = ref(0);
    const cartTotalTaxed = ref(0);
    const cartDiscounted = ref(0);
    const availableDiscounts = ref([]);
    const discountCount = ref(0);
    const error = ref(null);
    const sortBy = ref('id');
    const sortDirection = ref('asc');
    const showAll = ref(false);

    const cartItemsContainerHeight = computed(() => {
      if (showAll.value) {
        const rowHeight = 50;
        const headerHeight = 50;
        return `${cartItems.value.length * rowHeight + headerHeight}px`;
      }
      return '550px';
    });

    const fetchCart = async () => {
      try {
        const [
          itemsRes,
          totalRes,
          taxRes,
          taxedRes,
          discountsRes,
          countRes,
        ] = await Promise.all([
          getCartItems(sortBy.value, sortDirection.value),
          getCartTotal(),
          getCartTax(),
          getCartTotalTaxed(),
          getAvailableDiscounts(),
          getDiscountCount(),
        ]);
        cartItems.value = itemsRes.data.map((item) => ({
          ...item,
          selectedDiscount: item.discount ? item.discount.percentage : 0,
        }));
        cartTotal.value = totalRes.data;
        cartTax.value = taxRes.data;
        cartTotalTaxed.value = taxedRes.data;
        availableDiscounts.value = discountsRes.data;
        discountCount.value = countRes.data;
        await fetchDiscountedTotal();
      } catch (err) {
        error.value = 'Failed to load cart data. Please try again.';
      }
    };

    const fetchDiscountedTotal = async () => {
      const discountSelections = cartItems.value
        .filter((item) => item.selectedDiscount > 0)
        .map((item) => ({
          name: item.name,
          discountPercent: Number(item.selectedDiscount),
        }));
      try {
        const res = await getCartTotalDiscountedItems(discountSelections);
        cartDiscounted.value = res.data;
      } catch (err) {
        error.value = 'Failed to calculate discounted total.';
      }
    };

    const handleAddProduct = async (product) => {
      try {
        if (cartItems.value.some((item) => item.name === product.name)) {
          error.value = 'Product with this name already exists in the cart.';
          return;
        }
        await addProduct(product);
        await fetchCart();
      } catch (err) {
        error.value = err.response?.data?.error || 'Failed to add product. Please try again.';
      }
    };

    const handleRemoveProduct = async (name) => {
      try {
        await removeProduct(name);
        await fetchCart();
      } catch (err) {
        error.value = 'Failed to remove product. Please try again.';
      }
    };

    const handleUpdateDiscounts = async () => {
      try {
        for (const item of cartItems.value) {
          const currentDiscount = item.discount ? item.discount.percentage : 0;
          if (item.selectedDiscount !== currentDiscount) {
            const discount = item.selectedDiscount > 0
              ? availableDiscounts.value.find((d) => d.percentage === item.selectedDiscount)
              : availableDiscounts.value.find((d) => d.percentage === 0);
            const discountId = discount ? discount.id : 1;
            await assignDiscount(item.name, discountId);
          }
        }
        await fetchCart();
      } catch (err) {
        error.value = 'Failed to update discounts.';
      }
    };

    const handleSort = (field) => {
      if (sortBy.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy.value = field;
        sortDirection.value = 'asc';
      }
      fetchCart();
    };

    const handleUpdateQuantity = async (name, quantity) => {
      try {
        await updateProductQuantity(name, quantity);
        await fetchCart();
      } catch (err) {
        error.value = err.response?.data?.error || 'Failed to update quantity. Please try again.';
      }
    };

    const toggleShowAll = () => {
      showAll.value = !showAll.value;
    };

    onMounted(fetchCart);

    return {
      cartItems,
      cartTotal,
      cartTax,
      cartTotalTaxed,
      cartDiscounted,
      availableDiscounts,
      discountCount,
      error,
      sortBy,
      sortDirection,
      showAll,
      cartItemsContainerHeight,
      handleAddProduct,
      handleRemoveProduct,
      handleUpdateDiscounts,
      handleSort,
      handleUpdateQuantity,
      toggleShowAll,
    };
  },
};
</script>

<style scoped>
/* Component-specific style for dynamic height */
.cart-items-container {
  max-height: 550px; /* Default height */
}
</style>