<!--
  ProductForm.vue
  Stratonea/Sales Tracker - Form for adding/editing a product.
  - Mobile-first, Ghana-optimized, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <form class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4 flex flex-col gap-4" @submit.prevent="onSubmit"
    aria-label="Product Form" autocomplete="off">
    <!-- Product Name -->
    <div>
      <label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">
        Product Name
      </label>
      <input id="product-name" type="text" v-model="form.name" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter product name" autocomplete="off" aria-label="Product Name" />
    </div>

    <!-- SKU -->
    <div>
      <label for="product-sku" class="block text-sm font-medium text-gray-700 mb-1">
        SKU / Code
      </label>
      <input id="product-sku" type="text" v-model="form.sku" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter SKU or code" autocomplete="off" aria-label="SKU" />
    </div>

    <!-- Price -->
    <div>
      <label for="product-price" class="block text-sm font-medium text-gray-700 mb-1">
        Price (GHS)
      </label>
      <input id="product-price" type="number" v-model.number="form.price" min="0" step="0.01" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter price" autocomplete="off" aria-label="Price" />
    </div>

    <!-- Stock -->
    <div>
      <label for="product-stock" class="block text-sm font-medium text-gray-700 mb-1">
        Stock
      </label>
      <input id="product-stock" type="number" v-model.number="form.stock" min="0" step="1" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter stock quantity" autocomplete="off" aria-label="Stock" />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>

    <!-- Action Buttons -->
    <div class="flex gap-3 mt-2">
      <button type="submit"
        class="flex-1 bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Save Product">
        Save
      </button>
      <button type="button"
        class="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-gray-300 transition-colors"
        @click="onCancel" aria-label="Cancel">
        Cancel
      </button>
    </div>
  </form>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// ===== Types & Interfaces =====
/**
 * Props for ProductForm
 * - initial: ProductFormData (optional, for editing)
 * - error: string (optional error message)
 */
interface ProductFormData {
  name: string
  sku: string
  price: number
  stock: number
}

const props = withDefaults(
  defineProps<{
    initial?: ProductFormData
    error?: string
  }>(),
  {
    initial: () => ({
      name: '',
      sku: '',
      price: 0,
      stock: 0
    }),
    error: ''
  }
)

// ===== Emits =====
/**
 * Emits events to parent for save/cancel actions.
 */
const emit = defineEmits<{
  (e: 'save', data: ProductFormData): void
  (e: 'cancel'): void
}>()

// ===== Main Logic =====
/**
 * Local reactive form state, initialized from props.initial.
 */
const form = reactive<ProductFormData>({ ...props.initial })

/**
 * Handles form submission and emits save event.
 */
function onSubmit() {
  emit('save', { ...form })
}

/**
 * Handles cancel action.
 */
function onCancel() {
  emit('cancel')
}
</script>

<!--
  ===== Styling Notes =====
  - All inputs are touch-optimized (min-h-[48px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: label, aria-label, error feedback.
-->