<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div class="card p-4 w-75">
      <h1 class="text-primary text-center">Shopping Cart 🛒</h1>
      <AddProductForm class="mb-4 w-100" @addProduct="handleAddProduct" @error="error = $event" />
      <h2 class="text-secondary text-center">Cart Items</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div class="table-responsive w-100">
        <CartTable :cartItems="cartItems" :discounts="availableDiscounts" @removeItem="handleRemoveProduct"
          @updateDiscounts="handleUpdateDiscounts" />
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
import { ref, onMounted } from 'vue';
import {
  getCartItems,
  addProduct,
  removeProduct,
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
          getCartItems(),
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
      if (discountSelections.length > 0) {
        try {
          const res = await getCartTotalDiscountedItems(discountSelections);
          cartDiscounted.value = res.data;
        } catch (err) {
          error.value = 'Failed to calculate discounted total.';
        }
      } else {
        cartDiscounted.value = cartTotalTaxed.value;
      }
    };

    const handleAddProduct = async (product) => {
      try {
        await addProduct(product);
        await fetchCart();
      } catch (err) {
        error.value = 'Failed to add product. Please try again.';
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
            const discount = availableDiscounts.value.find(
              (d) => d.percentage === item.selectedDiscount
            );
            const discountId = discount ? discount.id : null;
            await assignDiscount(item.name, discountId);
          }
        }
        await fetchDiscountedTotal();
        await fetchDiscountCount();
      } catch (err) {
        error.value = 'Failed to update discounts.';
      }
    };

    const fetchDiscountCount = async () => {
      try {
        const res = await getDiscountCount();
        discountCount.value = res.data;
      } catch (err) {
        error.value = 'Failed to fetch discount count.';
      }
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
      handleAddProduct,
      handleRemoveProduct,
      handleUpdateDiscounts,
    };
  },
};
</script>