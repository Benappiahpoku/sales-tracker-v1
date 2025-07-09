<!--
  ProductForm.vue
  Stratonea/Sales Tracker - Modern product form for adding/editing products
  - Mobile-first, Ghana-optimized: Cedis currency, offline support, touch targets
  - Stock level validation and visual feedback
  - Enhanced UX with icons, validation, and loading states
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== Product Form Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <!-- ===== Form Header ===== -->
    <div class="flex items-center mb-6">
      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
        <font-awesome-icon :icon="isEditing ? 'box-open' : 'plus'" class="text-primary-600" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Product' : 'Add New Product' }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ isEditing ? 'Update product information' : 'Enter product details below' }}
        </p>
      </div>
    </div>

    <!-- ===== Product Form ===== -->
    <form @submit.prevent="onSubmit" class="space-y-4" autocomplete="off">
      <!-- Product Name -->
      <div>
        <label for="product-name" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="box" class="mr-2 text-gray-400 w-4" />
          Product Name *
        </label>
        <input
          id="product-name"
          type="text"
          v-model="form.name"
          required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
          placeholder="e.g., Palm Oil (5L)"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
      </div>

      <!-- SKU/Product Code -->
      <div>
        <label for="product-sku" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="barcode" class="mr-2 text-gray-400 w-4" />
          SKU / Product Code *
        </label>
        <input
          id="product-sku"
          type="text"
          v-model="form.sku"
          required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] font-mono transition-colors duration-200"
          placeholder="e.g., SKU001"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.sku }"
        />
        <p class="text-xs text-gray-500 mt-1">Unique identifier for this product</p>
        <p v-if="errors.sku" class="text-xs text-red-600 mt-1">{{ errors.sku }}</p>
      </div>

      <!-- Price in Ghana Cedis -->
      <div>
        <label for="product-price" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="tag" class="mr-2 text-gray-400 w-4" />
          Price (Ghana Cedis) *
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 font-medium">GHS</span>
          </div>
          <input
            id="product-price"
            type="number"
            v-model.number="form.price"
            min="0"
            step="0.01"
            required
            class="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
            placeholder="0.00"
            autocomplete="off"
            :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.price }"
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">Enter the selling price per unit</p>
        <p v-if="errors.price" class="text-xs text-red-600 mt-1">{{ errors.price }}</p>
        <p v-if="form.price > 0" class="text-xs text-green-600 mt-1">
          Price: {{ formatCurrency(form.price) }}
        </p>
      </div>

      <!-- Stock Quantity -->
      <div>
        <label for="product-stock" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="warehouse" class="mr-2 text-gray-400 w-4" />
          Current Stock *
        </label>
        <input
          id="product-stock"
          type="number"
          v-model.number="form.stock"
          min="0"
          step="1"
          required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
          placeholder="0"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.stock }"
        />
        <p class="text-xs text-gray-500 mt-1">Number of units available for sale</p>
        <p v-if="errors.stock" class="text-xs text-red-600 mt-1">{{ errors.stock }}</p>
        <!-- Stock Level Indicator -->
        <div v-if="form.stock >= 0" class="mt-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-600">Stock Level:</span>
            <span :class="stockLevelTextColor">{{ stockLevelText }}</span>
          </div>
          <div class="mt-1 w-full bg-gray-200 rounded-full h-2">
            <div
              :class="stockLevelBarColor"
              class="h-2 rounded-full transition-all duration-300"
              :style="{ width: `${Math.min(stockPercentage, 100)}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Category (Optional) -->
      <div>
        <label for="product-category" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="folder" class="mr-2 text-gray-400 w-4" />
          Category
          <span class="text-gray-400 ml-1">(optional)</span>
        </label>
        <select
          id="product-category"
          v-model="form.category"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
        >
          <option value="">Select category...</option>
          <option v-for="category in productCategories" :key="category" :value="category">{{ category }}</option>
        </select>
        <p class="text-xs text-gray-500 mt-1">Choose a category for better organization</p>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <!-- Save Button -->
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] transition-all duration-200 active:scale-98"
        >
          <font-awesome-icon
            :icon="isSubmitting ? 'spinner' : 'save'"
            :class="{ 'animate-spin': isSubmitting }"
            class="mr-2"
          />
          {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product') }}
        </button>
        <!-- Cancel Button -->
        <button
          type="button"
          @click="onCancel"
          :disabled="isSubmitting"
          class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] transition-all duration-200 active:scale-98"
        >
          <font-awesome-icon icon="times" class="mr-2" />
          Cancel
        </button>
      </div>

      <!-- Offline Status Indicator -->
      <div v-if="!isOnline" class="flex items-center justify-center p-3 bg-orange-50 border border-orange-200 rounded-lg mt-4">
        <font-awesome-icon icon="wifi" class="text-orange-600 mr-2" />
        <span class="text-sm text-orange-700">Working offline - changes will sync when connected</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * ProductForm.vue - Modern product form component
 * - Ghana-optimized: Cedis formatting, offline support, mobile-first
 * - Real-time validation, stock level indicators, category selection
 */

// ===== Imports =====
import { reactive, ref, computed, onMounted } from 'vue'

// ===== Types & Interfaces =====
interface ProductFormData {
  name: string
  sku: string
  price: number
  stock: number
  category: string
}
interface FormErrors {
  name?: string
  sku?: string
  price?: string
  stock?: string
}

// ===== Props =====
const props = withDefaults(defineProps<{
  initial?: Partial<ProductFormData>
  isEditing?: boolean
}>(), {
  initial: () => ({}),
  isEditing: false
})

// ===== Emits =====
const emit = defineEmits<{
  (e: 'save', data: ProductFormData): void
  (e: 'cancel'): void
}>()

// ===== Constants & Config =====
const productCategories = [
  'Food & Beverages', 'Household Items', 'Personal Care', 'Electronics',
  'Clothing', 'Health & Medicine', 'Stationery', 'Tools & Hardware', 'Other'
]
const LOW_STOCK_THRESHOLD = 10
const MAX_STOCK_FOR_PERCENTAGE = 100

// ===== State Management =====
const form = reactive<ProductFormData>({
  name: '',
  sku: '',
  price: 0,
  stock: 0,
  category: '',
  ...props.initial
})
const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const isOnline = ref(navigator.onLine)

// ===== Computed Properties =====
const isFormValid = computed(() =>
  form.name.trim() !== '' &&
  form.sku.trim() !== '' &&
  form.price > 0 &&
  form.stock >= 0 &&
  Object.keys(errors).length === 0
)
const stockPercentage = computed(() =>
  Math.min((form.stock / MAX_STOCK_FOR_PERCENTAGE) * 100, 100)
)
const stockLevelText = computed(() => {
  if (form.stock <= 0) return 'Out of Stock'
  if (form.stock <= LOW_STOCK_THRESHOLD) return 'Low Stock'
  return 'Good Stock Level'
})
const stockLevelTextColor = computed(() => {
  if (form.stock <= 0) return 'text-red-600 font-medium'
  if (form.stock <= LOW_STOCK_THRESHOLD) return 'text-orange-600 font-medium'
  return 'text-green-600 font-medium'
})
const stockLevelBarColor = computed(() => {
  if (form.stock <= 0) return 'bg-red-500'
  if (form.stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-500'
  return 'bg-green-500'
})

// ===== Helper Functions =====
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}
function validateForm(): boolean {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors])
  let isValid = true
  if (!form.name.trim()) {
    errors.name = 'Product name is required'
    isValid = false
  }
  if (!form.sku.trim()) {
    errors.sku = 'SKU/Product code is required'
    isValid = false
  }
  if (form.price <= 0) {
    errors.price = 'Price must be greater than 0'
    isValid = false
  }
  if (form.stock < 0) {
    errors.stock = 'Stock cannot be negative'
    isValid = false
  }
  return isValid
}

// ===== Event Handlers =====
async function onSubmit() {
  if (!validateForm()) return
  isSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const cleanedData: ProductFormData = {
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      price: Number(form.price.toFixed(2)),
      stock: Math.floor(form.stock),
      category: form.category.trim()
    }
    emit('save', cleanedData)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
function onCancel() {
  emit('cancel')
}

// ===== Lifecycle Hooks =====
onMounted(() => {
  window.addEventListener('online', () => { isOnline.value = true })
  window.addEventListener('offline', () => { isOnline.value = false })
  const nameInput = document.getElementById('product-name')
  if (nameInput) nameInput.focus()
})
</script>

<style scoped>
/* ===== Modern Form Styling ===== */
button:active { transform: scale(0.98); }
input:focus-visible, select:focus-visible, button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
input, select, button { transition: all 0.2s ease-in-out; }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (max-width: 640px) {
  .flex-col button { width: 100%; }
  .p-6 { padding: 1rem; }
}
</style>