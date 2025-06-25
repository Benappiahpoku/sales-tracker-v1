<!--
  POSView.vue
  Stratonea/BizPoint - Main view for Point of Sale (POS) operations.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses mock/static data for now (replace with real data later)
  - Follows Stratonea guidelines and file structure
-->

<template>
  

  <!-- ===== Main Content ===== -->
  <div class="max-w-md mx-auto">
    <!-- POS Cart Section -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 class="text-lg font-bold text-primary mb-2">POS Cart</h2>
      <div v-if="cart.length > 0">
        <table class="w-full text-sm mb-2">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2">Product</th>
              <th class="text-right py-2">Qty</th>
              <th class="text-right py-2">Price</th>
              <th class="text-right py-2">Total</th>
              <th class="text-center py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.sku" class="border-b border-gray-100">
              <td class="py-2 text-gray-900">{{ item.name }}</td>
              <td class="py-2 text-right">{{ item.qty }}</td>
              <td class="py-2 text-right">{{ formatCurrency(item.price) }}</td>
              <td class="py-2 text-right">{{ formatCurrency(item.price * item.qty) }}</td>
              <td class="py-2 text-center">
                <button class="text-red-600 font-bold px-2" @click="removeFromCart(item)" aria-label="Remove">
                  ×
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>{{ formatCurrency(cartTotal) }}</span>
        </div>
      </div>
      <div v-else class="text-gray-400 text-center py-4">Cart is empty.</div>
    </div>

    <!-- Product Quick Add Section -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 class="text-lg font-bold text-primary mb-2">Add Product</h2>
      <select v-model="selectedSku"
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm mb-2"
        aria-label="Select Product">
        <option value="" disabled>Select product</option>
        <option v-for="product in products" :key="product.sku" :value="product.sku">
          {{ product.name }} (GHS {{ product.price }})
        </option>
      </select>
      <div class="flex gap-2">
        <input type="number" v-model.number="selectedQty" min="1"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm"
          placeholder="Qty" aria-label="Quantity" />
        <button
          class="bg-primary text-white font-bold px-4 py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
          @click="addToCart" :disabled="!selectedSku || selectedQty < 1" aria-label="Add to Cart">
          Add
        </button>
      </div>
    </div>

    <!-- Checkout Section -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 class="text-lg font-bold text-primary mb-2">Checkout</h2>
      <button
        class="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-green-700 transition-colors"
        @click="checkout" :disabled="cart.length === 0" aria-label="Checkout">
        Complete Sale
      </button>
      <p v-if="checkoutMessage" class="text-green-700 mt-2">{{ checkoutMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed } from 'vue'


// ===== Types & Interfaces =====
/**
 * Product type for POS.
 */
interface Product {
  name: string
  sku: string
  price: number
}

/**
 * Cart item type for POS.
 */
interface CartItem extends Product {
  qty: number
}

// ===== Mock Data =====
/**
 * Mock product list (replace with real data from store or API).
 */
const products = ref<Product[]>([
  { name: 'Sample Product', sku: 'SKU-001', price: 10 },
  { name: 'Another Product', sku: 'SKU-002', price: 20 }
])

// ===== Main Logic =====
// POS cart state
const cart = ref<CartItem[]>([])

// Product selection state
const selectedSku = ref('')
const selectedQty = ref(1)

// Checkout messages
const checkoutMessage = ref('')
const errorMessage = ref('')

/**
 * Computed total for the cart.
 */
const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

/**
 * Adds the selected product and quantity to the cart.
 */
function addToCart() {
  errorMessage.value = ''
  checkoutMessage.value = ''
  const product = products.value.find(p => p.sku === selectedSku.value)
  if (!product) {
    errorMessage.value = 'Please select a product.'
    return
  }
  if (selectedQty.value < 1) {
    errorMessage.value = 'Quantity must be at least 1.'
    return
  }
  // Check if already in cart
  const existing = cart.value.find(item => item.sku === product.sku)
  if (existing) {
    existing.qty += selectedQty.value
  } else {
    cart.value.push({ ...product, qty: selectedQty.value })
  }
  // Reset selection
  selectedSku.value = ''
  selectedQty.value = 1
}

/**
 * Removes an item from the cart.
 * @param item - The cart item to remove
 */
function removeFromCart(item: CartItem) {
  cart.value = cart.value.filter(i => i.sku !== item.sku)
}

/**
 * Formats a number as Ghanaian currency (GHS).
 * @param amount - The amount to format
 * @returns string (e.g., GHS 10.00)
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Handles checkout (mock logic).
 */
function checkout() {
  errorMessage.value = ''
  checkoutMessage.value = ''
  if (cart.value.length === 0) {
    errorMessage.value = 'Cart is empty.'
    return
  }
  // Simulate checkout success
  checkoutMessage.value = 'Sale completed! (mock)'
  cart.value = []
}
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, max-w-md for mobile, centered content.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
  - Touch targets are min 48px for Ghanaian mobile users.
-->